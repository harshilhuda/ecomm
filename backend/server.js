import express from 'express'
import dotenv from 'dotenv'
import seedRoutes from './routes/seedRoute.js'
import connectDB from './db/connectDB.js'
import createError from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import mongoose from 'mongoose'
mongoose.set('strictQuery', true)
dotenv.config()
const app=express()
app.use(express.json())
app.use('/api/seed',seedRoutes)
app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use((err,req,res,next)=>{
    const status=err.status || 500;
    const message=err.message || "Something went wrong";
    return res.status(status).json({
        success:false,
        status:status,
        message:message
    })
})
app.listen(process.env.PORT,()=>{
    console.log("Server Listening On Port "+process.env.PORT)
})
connectDB()