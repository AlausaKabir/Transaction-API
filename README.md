

```markdown
# Transaction API

This API provides endpoints for handling user transactions, including sign-in and retrieving paginated transaction history. It is built using NestJS and uses JWT for user authentication.

## API Base URL

All endpoints are accessible under the following base URL:

```plaintext
https://transaction-api-zk0r.onrender.com
```

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

- Node.js and npm/yarn
- PostgreSQL database instance (configured in `src/prisma/schema.prisma`)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/transaction-api.git
   cd transaction-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**: Create a `.env` file with the following:
   ```plaintext
   DATABASE_URL="your_database_url"
   JWT_SECRET="your_jwt_secret"
   ```

4. **Run database migrations**:
   ```bash
   npx prisma migrate deploy
   ```

5. **Start the server**:
   ```bash
   npm run start
   ```

The API should now be running and accessible at `http://localhost:3000` or the deployed URL on Render.

## Notes for Android Developers

The Android developer should use the `/auth/login` endpoint for user authentication and `/transactions/history` to fetch transaction lists with pagination support.

```






<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
