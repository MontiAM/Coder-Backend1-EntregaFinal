import Router from "express";

const router = Router();

router.get("/addProduct", (req, res) => res.render("addProduct"));
router.get("/products", (req, res) => res.render("products"));

export default router;
