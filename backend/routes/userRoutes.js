import express from 'express'
import { signup,signIn } from '../controllers/userContollers.js';
const router=express.Router();
router.post('/signup',signup)
router.post('/signin',signIn)
export default router