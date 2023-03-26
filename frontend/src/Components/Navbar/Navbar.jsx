import React, { useContext, useState } from 'react'
import './Navbar.scss'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Categories from '../Categories/Categories';
import { Store } from '../../Store';
import { useRef } from 'react';
import { Link} from 'react-router-dom';
function Navbar() {
  const [open, setOpen] = useState(false)
  // const [open1,setOpen1]=useState(false)
  const [dropdown, setDropdown] = useState(false)
  const ref = useRef(null)
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const close = (e) => {
    if (ref.current  && open && !ref.current.contains(e.target) ) {
      setOpen(false)
    }
  }
  const close1 = (e) => {
    if (ref1.current && !ref1.current.contains(e.target) && dropdown) {
      setDropdown(false)
    }
  }
  document.addEventListener('mousedown', close)
  document.addEventListener('mousedown', close1) 
  const { state,dispatch:ctxDispatch } = useContext(Store)
  const { cart } = state
  const signOut=(e)=>{
    e.preventDefault()
    localStorage.removeItem('userInfo')
    ctxDispatch({type:'USER_SIGNOUT'})
  }
  return (
    <div className='navbar'>
      <div className="wrapper">
        {open && <Categories />}
        <div className="left" ref={ref} onClick={() => setOpen(!open)}>
          <h3>Categories</h3>
          <ArrowDropDownOutlinedIcon sx={{ fontSize: 35 }} />
        </div>
        <div className="center">
          <Link to='/' className='link'> <h3>Home</h3> </Link>
        </div>
        <div className="right">
          <h3 className='search'><Link className='link' to='/search'><SearchOutlinedIcon sx={{ fontSize: 30 }} /></Link></h3>
          <div className="cart"><h3><Link to='/cart' className='link'><AddShoppingCartIcon sx={{ fontSize: 30 }} /></Link></h3> <span>{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</span></div>
          <div className="dropdown" ref={ref1}>
            <h3 className='dropbtn'  onClick={() => setDropdown(!dropdown)}><AccountCircleIcon sx={{ fontSize: 30 }} /></h3>
            {dropdown &&
              <div className="dropdown-content" ref={ref2}>
                {state.userInfo?<button onClick={signOut}>Sign Out</button>:<Link to='/signin' className='link'>Sign In</Link>}
                <Link to='/signin' className='link'>Your Account</Link>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
