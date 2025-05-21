import { Router } from "express";
import cartController from "../controllers/cart.controller.js";

const router = Router();

router.get("/", cartController.get);
router.get("/:cid", cartController.getOne);
router.post("/", cartController.create);
router.put("/:cid", cartController.updateProductsToCart);
router.delete("/:cid", cartController.delete);
router.put("/:cid/product/:pid", cartController.updateQuantityProductToCart);
router.delete("/:cid/product/:pid", cartController.removeProductFromCart);

export default router;
