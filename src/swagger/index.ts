import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const srcSwaggerPath = path.resolve(process.cwd(), "src", "swagger");

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Express API",
      version: "1.0.0",
      description: "API documentation for Japfa fullstack test",
    },
    servers: [
      {
        url: process.env.API_BASE_URL || "http://localhost:7000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    path.join(srcSwaggerPath, "*.swagger.ts"),
    path.join(srcSwaggerPath, "schemas", "*.ts"),
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
