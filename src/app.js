import express from "express";
import mongoDB from "../db/connection.js";
import configureHandlebars from "../configuration/handlebars.config.js";
import __dirname from "../configuration/__dirname.js";
import path from "path";
import handleJsonError from "./middlewares/handleJsonError.middleware.js";

import { error404Route, error500Route } from "./routes/error.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import viewsRouter from "./routes/vews.route.js";

const app = express();

// DB Connection
await mongoDB.connect();

// Handlebars
configureHandlebars(app);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(handleJsonError);
app.use(express.static(path.join(__dirname, "./public")));

// Routes
app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use(error404Route);
app.use(error500Route);

// Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});
