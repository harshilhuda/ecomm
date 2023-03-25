import express from "express";
const router=express.Router()
import { featured, getAllProducts, getCategories, getSearch, getSingleProduct } from "../controllers/productControllers.js";
router.get('/',getAllProducts)
router.get('/featured',featured)
router.get('/search',getSearch)
router.get('/categories',getCategories)
router.get('/:id',getSingleProduct)
export default router