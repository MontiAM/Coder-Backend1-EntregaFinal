import { Router } from "express";
import cartController from "../controllers/cart.controller.js";

const router = Router();

router.get("/", cartController.get); // Este ya estaba
router.get("/:cid", cartController.getOne); // Este ya estaba pero no era requerido
router.post("/", cartController.create); // Este ya estaba
router.put("/:cid", cartController.updateProductsToCart); // LISTO NUEVO REQ
router.delete("/:cid", cartController.delete); // LISTO NUEVO REQ
router.post("/:cid/product/:pid", cartController.addProductToCart); // Este ya estaba
router.delete("/:cid/product/:pid", cartController.removeProductFromCart); // LISTO NUEVO REQ

export default router;

// Agregar metodo PUT
// api/carts/:cid/products/:pid
// Debera poder actualizar SOLO la cantidad de ejemplares del producto
// por cualquier cantidad pasada desde req.body

// PARA TODOS AGREGAR EL POPULATE
