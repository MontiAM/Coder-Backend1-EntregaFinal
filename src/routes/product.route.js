import { Router } from "express";
import productController from "../controllers/product.controller.js";

const router = Router();

router.get("/", productController.get);
router.get("/:pid", productController.getOne);
router.post("/", productController.create);
router.put("/:pid", productController.update);
router.delete("/:pid", productController.delete);

export default router;

// Para metodo GET de productos

// - opcional LIMIT default 10
// - opcional PAGE default page 1
// - opcional QUERY por disponibilidad y por categoria
// - opcional SORT asc o desc por precio

// Cambio estructura metodo GET productos
// {
//     status: success/error
//     payload: "Resultado de los productos solicitados"
//     totalPages: Total paginas
//     prevPage: Pagina anterior
//     nextPage: Pagina siguiente
//     page: Pagina actual
//     hasPrevPage: Indicador para saber si la pagina previa existe
//     hasNextPage: Indicador para saber si la pagina siguiente existe
//     prevLing: Link directo a la pagina previa (null si hasPrevPage=false) --> Hay que generarlo
//     nextLink: Link directo a la pagina siguiente (null si hasNextPage=false) --> Hay que generarlo
// }
