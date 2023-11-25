# University Management System Authentication Service

This is the documentation for the Authentication Service component of the University Management System. The Authentication Service provides authentication and authorization functionalities for the three main roles in the system: Admin, Student, and Faculty. It is built using TypeScript, Express.js, Zod validation, Mongoose, and MongoDB.

## Functional Requirements

### Student

- Student can login and log out.
- Student can manage and update their profiles.
- Student can update certain fields.

### Admin

- Admin can log in and log out.
- Admin can manage and update their profiles.
- Admin can only update certain fields.
- Admin can manage user accounts:
- Change Password

### Faculty

- Faculty can log in and log out.
- Faculty can manage and update their profiles.
- Faculty can only update certain fields.

## API Endpoints

### User

- `POST /users/create-student`
- `POST /users/create-faculty`
- `POST /users/create-admin`

### Student

- `GET /students`
- `GET /students?search=fr797`
- `GET /students?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET /students/:id`
- `PATCH /students/:id`
- `DELETE /students/:id`

### Faculty

- `GET /faculties`
- `GET /faculties?search=john`
- `GET /faculties?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET /faculties/:id`
- `PATCH /faculties/:id`
- `DELETE /faculties/:id`

### Admin

- `GET /admins`
- `GET /admins?search=us88`
- `GET /admins?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET /admins/:id`
- `PATCH /admins/:id`
- `DELETE /admins/:id`

### Academic Semester

- `POST /acs/create`
- `GET /acs`
- `GET /acs?searchTerm=fal`
- `GET /acs?page=1&limit=10&sortBy=year&sortOrder=asc`
- `GET /acs/:id`
- `PATCH /acs/:id`
- `DELETE /acs/:id`

### Academic Department

- `POST /acd/create`
- `GET /acd`
- `GET acd?search=math`
- `GET acd?page=1&limit=10&sortBy=title&sortOrder=asc`
- `GET acd/:id`
- `PATCH acd/:id`
- `DELETE /acd/:id`

### Academic Faculty

- `POST /acf/create`
- `GET /acf`
- `GET /acf?search=com`
- `GET /acf?page=1&limit=10&sortBy=title&sortOrder=asc`
- `GET /acf/:id`
- `PATCH /acf/:id`
- `DELETE /acf/:id`

### Authentication

- `POST /auth/login`
- `POST /auth/change-password`
- `POST /auth/refresh-token`

<!-- Postman Documentation: [Click Here](https://documenter.getpostman.com/view/26682150/2s93zB72V9#acc25f08-de78-478b-809d-837ce239d2b3) -->
