import React,{useContext, useState} from 'react'
import './SignIn.scss'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Store } from '../../Store'
import {toast} from 'react-toastify'
import { getError } from '../../utils'
function SignIn() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()
    const{dispatch:ctxDispatch}=useContext(Store)
    const signIn=async(e)=>{
        e.preventDefault();
        if(!email || !password)
        {
            toast.error('Enter the details properly',{
                toastId:'kjdsf'
            })
            return
        }
        try{
            const {data}=await axios.post('/api/users/signin',{
                email,
                password
            })
            ctxDispatch({type:'USER_SIGNIN',payload:data})
            navigate('/')
        }
        catch(error)
        {
            toast.error(getError(error),{
                toastId:'fg'
            })
            return
        }
    }
  return (
        <form action="">
    <div className='signin'>
            <h1>Sign In</h1>
            <div className="sign">
                <h2>Email</h2>
                <input type="text" className='mb-3' placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} />
                <h2>Password</h2>
                <input type="password" className='mb-3' placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)} />
                <button onClick={signIn}>Sign In</button>
                <div className='new'>
                    <h4>New User?</h4> <Link className='link1' to='/signup'>Sign up</Link>
                </div>
        </div>
    </div>
        </form>
  )
}

export default SignIn