import React from 'react'
import './Pagination.scss'
function Pagination({ currentPage, itemsPerPage, totalItems, paginate }) {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div>
            <nav>
                <ul className='pagination'>
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </button>
                    </li>
                    {pageNumbers.map((pageNumber) => (
                        <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                            <button className='page-link' onClick={() => paginate(pageNumber)}>{pageNumber}</button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Pagination