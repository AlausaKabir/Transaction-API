



HI DEV, `A QUICK WALK THROUGH`:

```markdown
# Transaction API

This API provides endpoints for handling user transactions, including sign-in and retrieving paginated transaction history. Built using NestJS, it uses JWT for user authentication.

## API Base URL

All endpoints are accessible under the following base URL:

```plaintext
https://transaction-api-zk0r.onrender.com
```

## API Documentation

You can view detailed API documentation with Swagger at:
[Swagger Documentation](https://transaction-api-zk0r.onrender.com/api-docs)

## Endpoints

### 1. Authentication

**Note**: Users will not be consuming the sign-up endpoint; only the **sign-in** endpoint is needed for the Android developer.

- **Sign In**
  - **Endpoint**: `/auth/login`
  - **Method**: `POST`
  - **Description**: Logs in the user with an email and password, returning a JWT access token upon successful authentication.
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "yourPassword"
    }
    ```
  - **Response**:
    ```json
    {
      "accessToken": "your.jwt.token",
      "user": {
        "id": "user_id",
        "email": "user@example.com",
        "role": "user_role"
      }
    }
    ```

### 2. Transactions

- **Get Transaction History**
  - **Endpoint**: `/transactions/history`
  - **Method**: `GET`
  - **Description**: Retrieves a paginated list of transactions for the authenticated user.
  - **Headers**: Requires `Authorization: Bearer <access_token>` in the headers.
  - **Query Parameters**:
    - `page` (optional): Page number (default: `1`)
    - `limit` (optional): Number of records per page (default: `50`)
    - `startDate` (optional): Start date for filtering transactions
    - `endDate` (optional): End date for filtering transactions
    - `status` (optional): Transaction status (`SUCCESS`, `PENDING`, `FAILED`)
  - **Response**:
    ```json
    {
      "pagination": {
        "currentPage": 1,
        "totalPages": 5,
        "totalTransactions": 200,
        "limit": 50
      },
      "transactions": [
        {
          "reference": "REF123-abcdef",
          "amount": 5000,
          "date": "2024-01-01T12:00:00Z",
          "type": "CREDIT",
          "status": "SUCCESS",
          "remark": "Transaction successful"
        }
        // additional transaction entries...
      ]
    }
    ```

## Figma Design for Frontend

For the frontend design layout and component reference, please see the following Figma link:
[Figma Design](https://www.figma.com/design/SDBDTnGz70q7A8EL71kAfL/Frontend-test?node-id=0-1&t=3r0JdI8yqHIEe3Ql-1)

## Setup and Installation

### Prerequisites

- Node.js and Yarn
- MongoDB database instance

### Steps

1. **Install dependencies**:
   ```bash
   yarn install
   ```

2. **Run database migrations** (if needed for MongoDB schema setup).

3. **Start the server**:
   ```bash
   yarn start
   ```

The API should now be running and accessible at `http://localhost:3000` or the deployed URL on Render.

## Notes for Android Developers

The Android developer should use the `/auth/login` endpoint for user authentication and `/transactions/history` to fetch transaction lists with pagination support.
```