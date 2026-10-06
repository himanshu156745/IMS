# API Contract

## Enums
### User Roles
- `admin`
- `company`
- `faculty`
- `student`

### Internship Status
- `open`
- `closed`

### Application Status
- `pending`
- `accepted`
- `rejected`
- `completed`

## Endpoints

### Auth
- `POST /api/v1/users/register`: Registers a new user.
- `POST /api/v1/users/login`: Authenticates user and sets HTTP-only cookie.
- `POST /api/v1/users/logout`: Clears auth cookie.
- `GET /api/v1/users/me`: Gets the current authenticated user's profile.

### Internships
- `GET /api/v1/internships`: List internships.
- `POST /api/v1/internships`: Create internship (Company only).
- `GET /api/v1/internships/:id`: Get internship details.
- `PATCH /api/v1/internships/:id`: Update internship (Company owner or Admin).
- `DELETE /api/v1/internships/:id`: Delete internship (Company owner or Admin).

### Applications
- `POST /api/v1/applications/:internshipId`: Apply for an internship (Student).
- `GET /api/v1/applications/me`: Get my applications (Student).
- `GET /api/v1/applications/internship/:internshipId`: Get applications for an internship (Company owner, Faculty).
- `PATCH /api/v1/applications/:id/status`: Update application status (Company owner).

### Certificates
- `POST /api/v1/certificates/:internshipId/issue`: Issue certificate (Company owner, Admin).
- `GET /api/v1/certificates/me`: Get my certificates (Student).
- `GET /api/v1/certificates/verify/:certificateId`: Public verification.

### Companies (Admin)
- `GET /api/v1/admin/companies`: Get all companies.
- `POST /api/v1/admin/companies`: Add a company.
- `PATCH /api/v1/admin/companies/:id/verification`: Update verification status.
- `PATCH /api/v1/admin/users/:id/status`: Update user active status.
- `DELETE /api/v1/admin/companies/:id`: Delete company.

## Mismatches & Technical Debt
1. Zod schemas must explicitly mirror these enums (e.g. role validation).
2. Frontend needs to strictly use these strings.
3. Dummy hashes vs generated passwords: we shouldn't create dummy hashes or dummy passwords; instead we should implement a proper invite/reset flow (as per new rules).

