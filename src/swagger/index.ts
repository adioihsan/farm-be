import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const IS_PROD = process.env.NODE_ENV === "production";

const swaggerDir = IS_PROD
  ? path.resolve(__dirname, "../swagger") 
  : path.resolve(process.cwd(), "src", "swagger"); 

const fileExt = IS_PROD ? ".js" : ".ts";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Express API",
      version: "1.0.0",
      description: "API documentation for Japfa fullstack test",
    },
    servers: [
      IS_PROD
        ? {} 
        : {
            url: `http://localhost:${process.env.PORT || 7000}`,
            description: "Local Development Server",
          },
    ].filter(Boolean),
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },

  apis: [
    path.join(swaggerDir, `*${fileExt}`),
    path.join(swaggerDir, "schemas", `*${fileExt}`),
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
