const { upsertStudentProfileSchema } = require('../src/validators/studentProfile.validator');

describe('Student Profile Validator (Task 2.7)', () => {
    const validBase = {
        fullName: 'John Doe',
        university: 'Test University',
        course: 'Test Course'
    };

    it('should reject skills if it is {}', () => {
        const result = upsertStudentProfileSchema.safeParse({
            body: { ...validBase, skills: {} }
        });
        expect(result.success).toBe(false);
    });

    it('should accept skills if it is ["React"]', () => {
        const result = upsertStudentProfileSchema.safeParse({
            body: { ...validBase, skills: ["React"] }
        });
        expect(result.success).toBe(true);
        expect(result.data.body.skills).toEqual(["React"]);
    });

    it('should accept skills if it is "React,Node" and store as ["React", "Node"]', () => {
        const result = upsertStudentProfileSchema.safeParse({
            body: { ...validBase, skills: "React,Node" }
        });
        expect(result.success).toBe(true);
        expect(result.data.body.skills).toEqual(["React", "Node"]);
    });
});
