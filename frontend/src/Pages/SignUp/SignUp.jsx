import React, { useContext,useState } from 'react'
import './SignUp.scss'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios'
import { Store } from '../../Store'
import { getError } from '../../utils'
function SignUp() {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmpassword,setConfirmPassword]=useState('')
    const {dispatch:ctxDispatch}=useContext(Store)
    const navigate=useNavigate()
    const submitHandler=async(e)=>{
        e.preventDefault();
        if(password!==confirmpassword)
        {
            toast.error('Passwords do not match',{toastId:'error4'})
            return;
        }
        try{
            const {data}=await axios.post('/api/users/signup',{
                name,
                email,
                password
            })
            ctxDispatch({type:'USER_SIGNIN',payload:data})
            localStorage.setItem('userInfo',JSON.stringify(data))
            navigate('/')
        }
        catch(error)
        {
            toast.error(getError(error),{
                toastId:'rer'
            })
        }
    }
    return (
            <form action="">
        <div className='signup'>
            <h1>Sign Up</h1>
            <div className="sign">
                <h2>Enter Name</h2>
                <input type="text" className='mb-3' placeholder='Enter Name' onChange={(e)=>{setName(e.target.value)}} />
                <h2>Email</h2>
                <input type="text" className='mb-3' placeholder='Enter Email' onChange={(e)=>{setEmail(e.target.value)}} />
                <h2>Password</h2>
                <input type="password" className='mb-3' placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)} />
                <h2>Confirm Password</h2>
                <input type="password" className='mb-3' placeholder='Confirm Password' onChange={(e)=>setConfirmPassword(e.target.value)} />
                <button onClick={submitHandler} >SignUp</button>
                <div className='new'>
                    Already registered ? <Link className='link1' to='/signin'>SignIn</Link> 
                </div>
            </div>
        </div>
            </form>
    )
}

export default SignUp