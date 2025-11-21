
# Backend API — Express, TypeScript, Prisma, Docker

This repository contains the backend service for the Farm Management System.  
The backend is built with Express.js, TypeScript, Prisma ORM, and includes full Docker and CI/CD support for both development and production environments.

---

## Overview

The backend provides a REST API with:

- Express.js server implemented in TypeScript  
- Prisma ORM connected to PostgreSQL  
- Authentication using JSON Web Tokens  
- Request validation  
- Centralized error handling  
- Swagger (OpenAPI 3.0) documentation  
- Production-ready Docker image  
- CI/CD using GitHub Actions + GitHub Container Registry  
- Development environment using Docker with hot reload  

---

## API Documentation (Swagger)

Swagger UI is available at:

```
/docs
```

Local development:

```
http://localhost:7000/docs
```

Production example:

```
https://api.ms27.my.id/docs
```

Swagger is generated using:

- swagger-jsdoc  
- swagger-ui-express  

The OpenAPI specification is loaded from compiled JavaScript files inside `dist/routes` and `dist/controllers`.

---

## Project Structure

```
backend/
│── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── utils/
│   ├── server.ts
│── prisma/
│   ├── schema.prisma
│── dist/
│── Dockerfile
│── Dockerfile.dev
│── docker-compose.dev.yml
│── package.json
│── tsconfig.json
│── README.md
```

---

## Local Development

### Installation

```
npm install
```

### Environment Variables

Create a `.env` file:

```
NODE_ENV=development
PORT=7000
DATABASE_URL="postgresql://user:password@localhost:5432/db"
JWT_SECRET=change-with-your-secret
```

### Run the Development Server

```
npm run dev
```

This uses `ts-node-dev` with automatic reload on file changes.

---

## Development Using Docker

A dedicated development environment is available using Docker:

```
docker compose -f docker-compose.dev.yml up --build
```

To stop:

```
docker compose -f docker-compose.dev.yml down
```

The project directory is mounted into the container, enabling live reload without rebuilding the image.

---

## Production Build

Compile the TypeScript project:

```
npm run build
```

Start the compiled server:

```
npm start
```

---

## Production Deployment With Docker and CI/CD

Production deployment uses:

- Dockerfile (for building production image)
- docker-compose.yml (on the VPS)
- GitHub Actions (build, push, deploy)

Deployment pipeline:

1. GitHub Actions builds the Docker image  
2. The image is pushed to GitHub Container Registry (GHCR)  
3. GitHub Actions connects to the VPS over SSH  
4. The VPS pulls the latest image  
5. The container is recreated with updated code  

Example deployment folder on the VPS:

```
/opt/backend/
│── docker-compose.yml
│── .env
```

Manual redeploy:

```
docker compose pull
docker compose up -d --force-recreate
```

---

## Production Environment Variables

```
NODE_ENV=production
PORT=7000
DATABASE_URL="postgresql://user:password@db:5432/db"
JWT_SECRET=change-with-your-secret
DOMAIN= https://your-hosted-domain.con

```

---

## Useful Commands

| Command | Description |
|--------|-------------|
| npm run dev | Run development server |
| npm run build | Compile TypeScript |
| npm start | Start production server |
| prisma migrate dev | Apply development migrations |
| prisma generate | Generate Prisma client |

