import { Router } from "express";
import cartController from "../controllers/cart.controller.js";

const router = Router();

router.get("/", cartController.get);
router.get("/:cid", cartController.getOne);
router.post("/", cartController.create);
router.delete("/:cid", cartController.delete);
router.post("/:cid/product/:pid", cartController.addProductToCart);
router.delete("/:cid/product/:pid", cartController.removeProductFromCart);

export default router;
