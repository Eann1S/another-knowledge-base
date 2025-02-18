# Another Knowledge Base

Another Knowledge Base is a web application that allows users to create, manage, and share knowledge articles. Built with NestJS and TypeORM, it provides a robust API for managing posts with authentication, tagging capabilities, and public/private visibility controls.

## Features

- Authentication: User registration and login with JWT tokens
- Post Management: Create, update, and delete posts
- Tagging: Add and manage tags for posts
- Visibility: Public and private post visibility options
- Search: Search posts by title or content

## Technologies

- NestJS
- TypeORM
- PostgreSQL
- Docker
- Docker Compose

## Prerequisites
- Docker (20.10.0+)
- Docker Compose (v2.0.0+)
- Node.js (v18.17.1+)
- npm (v10.9.0+)

## Getting Started

### 1. Clone the repository

```
git clone [https://github.com/Eann1S/another-knowledge-base]
cd another-knowledge-base
```

### 2. Install dependencies

```
npm install
```

### 3. Set up environment variables
Create a `.env` file using the example template:

```
cp .env.example .env
```

### 4. Build and start containers

```
docker compose up -d --build
```

### 5. Access the API

The API will be available at `http://localhost:5000/api`

### 6. Run the tests

```
npx nx run another-knowledge-base-e2e:e2e
```

