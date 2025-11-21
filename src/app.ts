import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import authRoutes from "./routes/auth.routes";
import farmRoutes from "./routes/farm.routes";
import dashboardRoutes from "./routes/dashboard.routes"


const app = express();

app.use(helmet());

const allowedOrigins = process.env.ALLOWED_ORIGINS
    ?.split(",")
    .map(o => o.trim());

app.use(
    cors({
        origin: (origin, callback) => {
            // allowed non client url, eg:postman
            if (!origin) return callback(null, true);

            if (allowedOrigins?.includes(origin)) {
                return callback(null, true);
            } else {
                return callback(new Error("Not allowed by CORS"), false);
            }
        },
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
);

app.use(express.json({ limit: "2mb" }));
app.use(cookieParser())


export const globalLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
});

app.use(globalLimiter)
app.use("/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/v1/auth", authLimiter, authRoutes);
app.use("/v1/farm", farmRoutes)
app.use("/v1/dashboard", dashboardRoutes)

export default app;
