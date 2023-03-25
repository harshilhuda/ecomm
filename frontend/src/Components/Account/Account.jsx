import React from 'react'
import { Link } from 'react-router-dom'
import './account.scss'
function Account() {
  return (
    <div className='account'>
        <div className="container">
            <Link className='link' to='/signin'>Sign In</Link>
            <Link className='link' to='/signin'>Your Account</Link>
        </div>
    </div>
  )
}

export default Account