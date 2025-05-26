import Router from "express";
import viewsController from "../controllers/views.controller.js";

const router = Router();

router.get("/addProduct", viewsController.getAddProduct);
router.get("/products", viewsController.getProducts);
router.get("/products/:pid", viewsController.getProductId);
router.get("/cart/:cid", viewsController.getCartId);

export default router;
