import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const IS_PROD = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 7000;

// path swagger (sudah kita bahas sebelumnya)
const swaggerDir = IS_PROD
  ? path.resolve(__dirname, "../swagger")     // dist/swagger
  : path.resolve(process.cwd(), "src", "swagger"); // src/swagger

const fileExt = IS_PROD ? ".js" : ".ts";

// hanya definisikan servers di DEV
const servers = !IS_PROD
  ? [
      {
        url: `http://localhost:${PORT}`,
        description: "Local development server",
      },
    ]
  : [];

const definition: swaggerJsdoc.Options["definition"] = {
  openapi: "3.0.3",
  info: {
    title: "Express API",
    version: "1.0.0",
    description: "API documentation for Japfa fullstack test",
  },
  // kalau ada servers, tambahkan ke objek; kalau tidak, jangan bikin field servers
  ...(servers.length ? { servers } : {}),
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
};

export const swaggerSpec = swaggerJsdoc({
  definition,
  apis: [
    path.join(swaggerDir, `*${fileExt}`),
    path.join(swaggerDir, "schemas", `*${fileExt}`),
  ],
});
