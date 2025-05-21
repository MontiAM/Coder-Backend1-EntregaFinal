import { Router } from "express";
import productController from "../controllers/product.controller.js";

const router = Router();

router.get("/", productController.get);
router.get("/:pid", productController.getOne);
router.post("/", productController.create);
router.put("/:pid", productController.update);
router.delete("/:pid", productController.delete);

export default router;
