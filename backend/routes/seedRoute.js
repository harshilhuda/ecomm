import express from 'express'
const router=express.Router()
import { products } from '../data.js'
import Product from '../model/productModel.js'
router.post('/',async(req,res)=>{
    await Product.remove({})
    const createdProducts=await Product.insertMany(products)
    res.status(200).json(createdProducts)
})
export default router