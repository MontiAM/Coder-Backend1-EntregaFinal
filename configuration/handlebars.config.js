import { engine } from "express-handlebars";
import path from "path";
import __dirname from "./__dirname.js";

const configureHandlebars = (app) => {
    app.engine("handlebars", engine());
    app.set("view engine", "handlebars");
    app.set("views", path.join(__dirname, "./views"));
};

export default configureHandlebars;
