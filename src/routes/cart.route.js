import { Router } from "express";
import cartController from "../controllers/cart.controller.js";

const router = Router();

router.get("/", cartController.get);
router.get("/:cid", cartController.getOne); // GET trae todo el carrito
router.post("/", cartController.create); // POST para crear el carrito
router.post("/:cid/product/:pid", cartController.postProductToCart); // POST para agregar un producto
router.put("/:cid", cartController.updateProductsToCart); // PUT para actualizar todos los productos del carrito
router.delete("/:cid", cartController.delete); // DELETE para borrar los productos de un carrito
router.put("/:cid/product/:pid", cartController.updateQuantityProductToCart); // PUT para actualizar la cantidad de un producto
router.delete("/:cid/product/:pid", cartController.removeProductFromCart); // DELETE producto de un carrito determinado

export default router;
