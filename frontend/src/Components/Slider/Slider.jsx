import './Slider.scss'
import { products } from '../../data'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRef } from 'react';
function Slider() {
    const box = useRef()
    const prevButton = () => {
        let width = box.current.clientWidth
        box.current.scrollLeft -= (width + 50);
    }
    const nextButton = () => {
        let width = box.current.clientWidth;
        box.current.scrollLeft += width + 50;
    }
    return (
        <div className='slider' >
            <ChevronLeftIcon className='left' sx={{ fontSize: 40 }} onClick={prevButton} />
            <ChevronRightIcon className='right' sx={{ fontSize: 40 }} onClick={nextButton} />
            <div className="container" ref={box}>
                {products.map((product) => (
                    <div className="product" key={product.id}>
                        <span><img src={product.image} className='img' alt="" /></span>
                        <h2>{product.name}</h2>
                        <h2>{product.description}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Slider
