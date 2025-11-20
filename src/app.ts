import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(helmet());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true,
}));

app.use(express.json({ limit: "2mb" }));
app.use(cookieParser())

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
});

app.use("/v1/auth", authLimiter, authRoutes);

export default app;
