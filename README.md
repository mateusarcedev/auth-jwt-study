# Express Authentication API

This project is a simple Node.js API using Express to demonstrate user authentication and token-based authorization. It was developed as a learning exercise to understand JWT (JSON Web Token) authentication, following the tutorial: [NodeJS: Autenticação com JWT](https://medium.com/@filipefilpe/nodejs-autentica%C3%A7%C3%A3o-com-jwt-6e274fb205dc) by Filipe Filpe.

---

## Features

- **Public and Private Routes**: Provides public and private endpoints with authentication.
- **JSON Web Tokens (JWT)**: Uses JWT for secure authentication and authorization.
- **Base64 Authorization Header**: Supports login via Base64 encoded credentials.

---

## Technologies

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Fast, unopinionated, minimalist web framework.
- **jsonwebtoken**: For generating and validating JWT tokens.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/username/repository.git
   ```

2. Navigate to the project folder:

   ```bash
   cd repository
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

---

## Endpoints

### Public Route

- **GET /**
  - Description: Public endpoint accessible without authentication.
  - Response:
    ```json
    {
      "message": "This is a PUBLIC router"
    }
    ```

### Login Route

- **GET /login**
  - Description: Authenticate user and generate JWT token.
  - Header:
    ```
    Authorization: Basic base64(email:password)
    ```
  - Response (Success):
    ```json
    {
      "data": {
        "user": {
          "name": "Mateus Arce",
          "email": "mateus@teste.com"
        },
        "token": "<JWT_TOKEN>"
      }
    }
    ```
  - Response (Error):
    ```json
    "Email ou senha incorretos"
    ```

### Private Route

- **GET /private**
  - Description: Accessible only with a valid JWT token.
  - Header:
    ```
    Authorization: Bearer <JWT_TOKEN>
    ```
  - Response:
    ```json
    {
      "message": "This is a PRIVATE router",
      "data": {
        "userLogged": {
          "name": "Mateus Arce",
          "email": "mateus@teste.com"
        }
      }
    }
    ```

---

## Environment Variables

- `PRIVATE_KEY`: Used as the secret key for JWT signing and validation.

---

## Error Handling

- **401 Unauthorized**: Returned when a token is invalid, expired, or missing.
- **500 Internal Server Error**: Returned for unexpected errors during processing.

---

## Security Notes

- Replace the hardcoded `PRIVATE_KEY` with a more secure, environment-based approach.
- Implement HTTPS for production environments to secure data in transit.
- Add password hashing before storing credentials.

---

## License

This project is licensed under the MIT License.

---

## Author

- **Mateus Arce**
- Email: [mateus@teste.com](mailto:mateus@teste.com)

