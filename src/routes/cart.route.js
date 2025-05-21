import { Router } from "express";
import cartController from "../controllers/cart.controller.js";

const router = Router();

router.get("/", cartController.get); // Este ya estaba
router.get("/:cid", cartController.getOne);
router.post("/", cartController.create); // Este ya estaba
router.delete("/:cid", cartController.delete); // Modificar para que solo elimine los productos del carrito
router.post("/:cid/product/:pid", cartController.addProductToCart); // Este ya estaba
router.delete("/:cid/product/:pid", cartController.removeProductFromCart);

export default router;

// Agregar metodo PUT
// api/carts/:cid
// Debera actualizar todos los productos del carrito con un arreglo de productos

// Agregar metodo PUT
// api/carts/:cid/products/:pid
// Debera poder actualizar SOLO la cantidad de ejemplares del producto
// por cualquier cantidad pasada desde req.body

// Agregar metodo DELETE
// api/carts/:cid
// Debera eliminar todos los productos del carrito

// PARA TODOS AGREGAR EL POPULATE
