import express from "express";
import {
  addProducts,
  getProductById,
  getproducts,
} from "../controllers/Product.js";

const router = express.Router();

router.post("/add", addProducts);
router.get("/", getproducts);
router.get("/:id", getProductById);

export default router;