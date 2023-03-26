import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './CategoryPage.scss'
import { useReducer } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getError } from '../../utils'
import Card from '../../Components/Card/Card'
import Pagination from '../../Components/Pagination/Pagination'
import SearchIcon from '@mui/icons-material/Search';
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true }
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false }
        case 'FETCH_FAILURE':
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}
function CategoryPage() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search)
    const category = sp.get('category') || 'all'
    const query=sp.get('query') || 'all'
    const [{ loading, error, products }, dispatch] = useReducer((reducer), {
        products: [],
        loading: true,
        error: ''
    })
    const [currentPage, setCurrentPage] = useState(1)
    // const [itemsPerPage,setItemsPerPage]=useState(3)
    const itemsPerPage = 3
    const [totalItems, setTotalItems] = useState(0)
    useEffect(() => {
        const getProduct = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                const result = await axios.get(`/api/products/search?category=${category}&page=${currentPage}&query=${query}`)
                setTotalItems(result.data.count)
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data.products })
            }
            catch (error) {
                dispatch({
                    type: 'FETCH_FAILURE',
                    payload: getError(error)
                })
            }
        }
        getProduct()
    }, [category, error, currentPage])
    useEffect(() => {
        setCurrentPage(1)
    }, [category])
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(`/api/products/categories`);
                setCategories(data)
            }
            catch (error) {
                toast.error(getError(error), { toastId: 7 })
            }
        }
        fetchCategories()
    }, [dispatch])
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const getFilterUrl=(filter,skipPathName)=>{
        const filterCategory=filter.category || category
        const filterQuery=filter.query || query
        return `${skipPathName?'':'/search?'}category=${filterCategory}&query=${filterQuery}`

    }
    return (
        <div className='cat'>
            <div className="left">
                <h1>Categories</h1>
                <ul>
                    <li><Link className='link1' to={getFilterUrl({ category: 'all' })}>All</Link></li>
                    {categories.map((c) => (
                        <li key={c}><Link className='link1' to={getFilterUrl({ category: c })}>{c}</Link></li>
                    ))}
                </ul>
                <h1>Price</h1>
                <ul>
                    <li><Link to='/' className='link1'>Low to High</Link></li>
                    <li><Link to='/' className='link1'>High to Low</Link></li>
                </ul>
            </div>
            <div className="right">
                <div className="search">
                    <input type="text" placeholder='Search' className='i' />
                    <div className="s">
                        <SearchIcon />
                    </div>
                </div>
                <div className="r">
                    {products.map((product) => (
                        <Card product={product} />
                    ))}
                    <div className="pagination">
                        <Pagination
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            totalItems={totalItems}
                            paginate={paginate}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryPage