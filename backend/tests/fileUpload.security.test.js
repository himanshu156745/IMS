const fs = require('fs');
const path = require('path');
const { verifyMagicBytes, validateFileMagicBytes } = require('../src/middlewares/multer.middleware');
const ApiError = require('../src/utils/ApiError');

describe('CRIT-06: Insecure File Type Validation via Spoofable Header MIME Types', () => {
    const testTempDir = path.join(__dirname, '../temp');

    beforeAll(() => {
        if (!fs.existsSync(testTempDir)) {
            fs.mkdirSync(testTempDir, { recursive: true });
        }
    });

    // Helper to generate temporary file with arbitrary content
    const createTempFile = (filename, content) => {
        const filePath = path.join(testTempDir, `test-${Date.now()}-${filename}`);
        fs.writeFileSync(filePath, content);
        return filePath;
    };

    describe('verifyMagicBytes()', () => {
        it('should validate and accept genuine PNG file buffer', async () => {
            // PNG signature: 89 50 4E 47 0D 0A 1A 0A
            const pngHeader = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
            const pngPayload = Buffer.concat([pngHeader, Buffer.alloc(100)]);
            const filePath = createTempFile('valid.png', pngPayload);

            try {
                const result = await verifyMagicBytes(filePath);
                expect(result).toBeDefined();
                expect(result.mime).toBe('image/png');
                expect(fs.existsSync(filePath)).toBe(true);
            } finally {
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
        });

        it('should validate and accept genuine JPEG file buffer', async () => {
            // JPEG signature: FF D8 FF E0
            const jpegHeader = Buffer.from([0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46]);
            const jpegPayload = Buffer.concat([jpegHeader, Buffer.alloc(100)]);
            const filePath = createTempFile('valid.jpg', jpegPayload);

            try {
                const result = await verifyMagicBytes(filePath);
                expect(result).toBeDefined();
                expect(result.mime).toBe('image/jpeg');
                expect(fs.existsSync(filePath)).toBe(true);
            } finally {
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
        });

        it('should validate and accept genuine PDF file buffer', async () => {
            // PDF signature: %PDF- (25 50 44 46 2D)
            const pdfPayload = Buffer.from('%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF');
            const filePath = createTempFile('valid.pdf', pdfPayload);

            try {
                const result = await verifyMagicBytes(filePath);
                expect(result).toBeDefined();
                expect(result.mime).toBe('application/pdf');
                expect(fs.existsSync(filePath)).toBe(true);
            } finally {
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
        });

        it('should reject spoofed HTML file disguised as .jpg and immediately unlink it', async () => {
            const htmlContent = '<html><head><script>alert("XSS")</script></head><body>Fake image</body></html>';
            const filePath = createTempFile('spoofed.jpg', htmlContent);

            await expect(verifyMagicBytes(filePath)).rejects.toThrow(
                "Malicious or invalid file payload detected via magic-byte inspection."
            );
            // Verify file was unlinked from disk
            expect(fs.existsSync(filePath)).toBe(false);
        });

        it('should reject spoofed SVG containing malicious script disguised as .png and unlink it', async () => {
            const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(document.cookie)</script></svg>';
            const filePath = createTempFile('malicious.png', svgContent);

            await expect(verifyMagicBytes(filePath)).rejects.toThrow(
                "Malicious or invalid file payload detected via magic-byte inspection."
            );
            // Verify file was deleted immediately
            expect(fs.existsSync(filePath)).toBe(false);
        });

        it('should reject executable or binary script disguised as .pdf and unlink it', async () => {
            const exeHeader = Buffer.from([0x4D, 0x5A, 0x90, 0x00]); // MZ executable signature
            const exePayload = Buffer.concat([exeHeader, Buffer.alloc(100)]);
            const filePath = createTempFile('malware.pdf', exePayload);

            await expect(verifyMagicBytes(filePath)).rejects.toThrow(
                "Malicious or invalid file payload detected via magic-byte inspection."
            );
            expect(fs.existsSync(filePath)).toBe(false);
        });
    });

    describe('validateFileMagicBytes middleware', () => {
        it('should invoke next() without error when all files have genuine magic bytes', async () => {
            const pngHeader = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
            const pngPayload = Buffer.concat([pngHeader, Buffer.alloc(100)]);
            const filePath = createTempFile('middleware_valid.png', pngPayload);

            const req = {
                file: { path: filePath }
            };
            const res = {};
            const next = jest.fn();

            try {
                await validateFileMagicBytes(req, res, next);
                expect(next).toHaveBeenCalledWith();
            } finally {
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
        });

        it('should clean up all multipart files and call next with ApiError when spoofed file is detected', async () => {
            // One valid avatar file, but one spoofed resume file
            const pngHeader = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
            const validAvatarPath = createTempFile('avatar.png', Buffer.concat([pngHeader, Buffer.alloc(100)]));
            const spoofedResumePath = createTempFile('resume.pdf', '<script>alert("pwned")</script>');

            const req = {
                files: {
                    avatar: [{ path: validAvatarPath }],
                    resume: [{ path: spoofedResumePath }]
                }
            };
            const res = {};
            const next = jest.fn();

            await validateFileMagicBytes(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
            const errorArg = next.mock.calls[0][0];
            expect(errorArg).toBeInstanceOf(ApiError);
            expect(errorArg.statusCode).toBe(400);
            expect(errorArg.message).toContain("Malicious or invalid file payload detected via magic-byte inspection.");

            // Both files must be purged from disk
            expect(fs.existsSync(validAvatarPath)).toBe(false);
            expect(fs.existsSync(spoofedResumePath)).toBe(false);
        });
    });
});
