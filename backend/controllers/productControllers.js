import Product from "../model/productModel.js"
import createError from "../middleware/errorMiddleware.js"
export const getAllProducts=async(req,res)=>{
    const products=await Product.find({})
    res.status(200).json(products)
    if(!products)
    {
        next(createError(400,"Unable to load products please try later"))
    }
}
export const featured=async(req,res,next)=>{
   try{
    const products=await Product.find().sort({rating:-1}).limit(4);
    res.status(200).json(products)
   }
   catch(error)
   {
    next(error)
   }
}
export const getSingleProduct=async(req,res,next)=>{
    try{
        const product=await Product.findById(req.params.id)
        res.status(200).json(product)
    }
    catch(error)
    {
        next(createError(400,"Item does not exist"))
    }
}

export const getSearch=async(req,res)=>{
    const {query}=req
    const category=query.category
    const searchQuery=query.query || ''
    const categoryFilter=category && category!='all'?{category}:{}
    const queryFilter= searchQuery && searchQuery!='all'?{
        name:{
            $regex:searchQuery,
            $options:'i'
        }
    }:{}
    const perPage=3;
    const page=query.page || 1
    const skip=(page-1) * perPage
    const count=await Product.find({
        ...categoryFilter,
        ...queryFilter
    }).countDocuments()
    const products=await Product.find({
        ...categoryFilter,
        ...queryFilter
    }).skip(skip).limit(perPage)
    res.status(200).json({products,count})
}

export const getCategories=async(req,res)=>{
    const categories=await Product.find().distinct('category')
    res.send(categories)
}