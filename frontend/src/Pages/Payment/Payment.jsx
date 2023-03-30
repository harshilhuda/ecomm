import {useState} from 'react'
import './Payment.scss'
function Payment() {
    const [paymentMethodName,setPaymentMethod]=useState('')
  return (
    <div className='payment'>
        <h1>Payment</h1>
        <div>
            <label htmlFor="Paypal">Paypal</label><input type="radio" name="payment" value="Paypal" id="Paypal" />
        </div>
        <div>
        <label htmlFor="Paypal">Stripe</label><input type="radio" name="payment" value="Stripe" id="" />
        </div>
        <div>
        <button className='btn' >Continue</button>
        </div>
    </div>
  )
}

export default Payment