import User from "../model/userModel.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils.js";
export const signup=async(req,res)=>{
    const newUser=new User({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password)
    })
    const user=await newUser.save()
    res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        token:generateToken(user)
    })
}
export const signIn=async(req,res)=>{
    const user=await User.findOne({email:req.body.email})
    if(user)
    {
        if(bcrypt.compareSync(req.body.password,user.password))
        {
            res.status(200).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user)
            })
            return;
        }
        res.status(401).json({message:'Invalid Email or Password'})
    }
    else{
        res.status(401).json({message:'User does not exist'})
    }
}