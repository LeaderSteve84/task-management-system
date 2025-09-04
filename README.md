# Task Management System API
A RESTful API for managing user authentication and tasks, built with Node.js, Express, and MongoDB Atlas. It supports user registration, login with JWT authentication, and CRUD operations for tasks, with secure password hashing and input validation.

## Features

- User registration and login with JSON Web Tokens (JWT).
- Create, read, update, and delete tasks for authenticated users.
- Secure with bcryptjs for passwords and express-validator for input validation.
- CORS support for frontend integration.
- Request logging with morgan in development.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Postman for API testing
- Git for version control

## Setup

- Clone the Repository:
- git clone https://github.com/<your-username>/task-management-system.git
- cd task-management-system


## Install Dependencies:
npm install


## Configure Environment Variables:

Create a .env file in the root directory:touch .env


Add:MONGO_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/task-management?retryWrites=true&w=majority
JWT_SECRET=your-secure-secret-key
PORT=3000
DEV_URL=http://localhost:3000
NODE_ENV=development


Replace <username>, <password>, and <cluster-name> with your MongoDB Atlas credentials. Encode special characters in the password (e.g., @ → %40).


## Set Up MongoDB Atlas:

- Log in to MongoDB Atlas.
- Create a cluster and ensure it’s running.
- Add a database user with readWrite permissions for the task-management database.
- Allow network access: Add 0.0.0.0/0 (for testing) in Network Access > IP Access List.


## Run the API:

- Development mode (with nodemon):npm run dev

- Production mode:npm start


Expected output:MongoDB connected successfully
Server is running on http://localhost:3000

## API Documentation
- Full API documentation is available on Postman:Task Management System API Documentation
- Testing with Postman

- Import Collection:
- Import task-management-api.postman_collection.json into Postman.
- Or via https://documenter.getpostman.com/view/47095943/2sB3HjPMu9


## Project Structure
task-management-system/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── db/
├── .env
├── .gitignore
├── app.js
├── server.js
├── nodemon.json
├── package.json
├── task-management-api.postman_collection.json
└── README.md

## Troubleshooting

#### MongoDB Connection Issues:
- Verify MONGO_URI in .env.
- Ensure the Atlas cluster is running and the database user has correct permissions.
- Check network access in Atlas.

## Timeout Errors:
The connectDB function uses a 30-second timeout with retries for reliability.

### Debugging:
Enable Mongoose debug logging in src/db/dbConnection.js:mongoose.set('debug', process.env.NODE_ENV === 'development');

## Contributing

- Fork the repository.
- Create a feature branch (git checkout -b feature/your-feature).
- Commit changes (git commit -m "Add your feature").
- Push to the branch (git push origin feature/your-feature).
- Open a pull request.

## License
MIT License
