import React from 'react'
import './Home.scss'
import Slider from '../../Components/Slider/Slider'
import FeaturedProducts from '../../Components/FeaturedProducts/FeaturedProducts'
function Home() {
  return (
    <div className='home'>
      <FeaturedProducts />
      <div className="trending">
                <h1>Trending Products</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Molestias dolore, ad aut veritatis voluptatibus sapiente excepturi et 
                    possimus vero esse, enim rem unde corrupti. Quaerat dolorum explicabo 
                    doloremque ipsa ipsam?</p>
            </div>
      <Slider />
    </div>
  )
}

export default Home
