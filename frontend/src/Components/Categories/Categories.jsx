import React,{useEffect,useState} from 'react'
import './Categories.scss'
import { getError } from '../../utils'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
function Categories() {
    const [categories,setCategories]=useState([])
    useEffect(()=>{
        const fetchCategories=async()=>{
            try{
                const {data}=await axios.get(`/api/products/categories`);
                setCategories(data)
            }
            catch(error)
            {
                toast.error(getError(error),{toastId:7})
            }
        }
        fetchCategories()
    })
    return (
        <div className='category'>
            <div className="container">
                {/* <div className="link1">All</div>
                <div className="link1">Shirts</div>
                <div className="link1">Shoes</div>
                <div className="link1">Mobiles</div> */}
                <Link className='link1' to={`/search?category=all`}>All</Link>
                {/* {categories.map((c)=>(
                    <div>
                        <Link key={c} className='link1' to={`/search?category=${c}`}>{c}</Link>
                    </div>
                    ))} */}
            </div>
        </div>
    )
}

export default Categories
