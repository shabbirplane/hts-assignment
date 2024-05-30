HTS-Assignment

This application is a Node.js REST API built with Express.js and PostgreSQL, using Sequelize ORM. It features user authentication with JWT tokens, and includes request validation and error handling.

Set up environment variables:
Create a .env file in the root directory of your project and add the following variables:

.env
PORT
DB_HOST
DB_PORT
DB_USER
DB_PASS
DB_NAME
JWT_SECRET
JWT_EXPIRES_IN

Installation:

npm install

npx sequelize db:create

npx sequelize db:migrate

npm run start:dev for development

npm run start:prod for prod

API Endpoints:
User Signup
Endpoint: apis/v1/signup
Method: POST
Request Body:
{
"firstName": "John",
"lastName": "Doe",
"email": "johndoe@example.com",
"password": "password123"
}
Response:
201 Created if successful
400 If the user already exists or other errors occur

User Login
Endpoint: apis/v1/login
Method: POST
Request Body:
{
"email": "johndoe@example.com",
"password": "password123"
}

Response:
200 Created if login is successful, with a JWT token
404 Not Found if the user is not found
400 Bad Request if the password is incorrect

Error Handling
Errors are handled using a global error handler. Custom errors are thrown using the AppError class, which extends the built-in Error class.

Request Validation
Request validation is handled using middleware. The middleware validates incoming requests to ensure all required fields are present and correct.
