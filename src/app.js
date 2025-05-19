import express from "express";
import mongoDB from "../db/connection.js";
import { error404Route, error500Route } from "./routes/error.route.js";
import productRouter from "./routes/product.route.js";

const app = express();

// DB Connection
await mongoDB.connect();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/products", productRouter);
app.use(error404Route);
app.use(error500Route);

// Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});
