import express from "express";
import { createProduct, deleteProduct, getProductbyId, getProducts, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router()

productRouter.get("/",getProducts)
productRouter.post("/",createProduct)
productRouter.delete("/:productId",deleteProduct)
productRouter.put("/:productId",updateProduct)
productRouter.get("/:productId",getProductbyId)


export default productRouter