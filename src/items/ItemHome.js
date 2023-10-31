import React from 'react'
import '../styles/ItemHome.css'
const ItemHome = ({ product }) => {
    return (
        <div className='product-container'>
            <p className='product-index'>#{product.index}</p>
            <>
                <img className='product-image' src={product.image} />
                <p>{product.name}</p></>
            <p className='product-price'>{product.price}</p>
            <p className='product-order'>{product.totalOrder}</p>
            <a href="" className='view-detail'>View detail</a>
        </div>
    )
}

export default ItemHome