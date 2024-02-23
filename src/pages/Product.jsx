import '../styles/Product.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PagingationProduct from '../components/PagingationProduct';
import AddProduct from '../components/AddProduct';
import { localAPI } from '../api';


const Product = () => {
    const [data, setData] = useState([]);
    const [checkAddProduct, setCheckAddProduct] = useState(false);
    const [loading, setLoading] = useState(true);
    const urlDelete = localAPI + '/product/deleteproduct';
    useEffect(() => {
        setDataProduct();

    }, [])

    const setDataProduct = async () => {
        axios.get(localAPI + '/product/getallproduct', {
            headers: {
                'token': localStorage.getItem('token')
            }
        }).then(res => {
            setData(res.data)
        }
        )

        setLoading(false);
    }
    const columns = [
        { key: 'image', label: 'Image', className: 'image_product' },
        { key: 'name', label: 'Name', className: 'name_product' },
        { key: 'description', label: 'Description', className: 'des_product' },
        { key: 'price', label: 'Price', className: 'price_product' },
        { key: 'stockQuantity', label: 'StockQuantity', className: 'stockQuantity_product' },
        { key: 'category', label: 'Category', className: 'category_product' },
    ];
    const addproduct = () => {
        setCheckAddProduct(!checkAddProduct);
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div className="title">
                Product
            </div>

            {checkAddProduct ? (
                <>
                    <AddProduct onChange={addproduct} updateList={setDataProduct} />
                </>

            ) : (
                <>
                    <button onClick={() => addproduct()} className='btn_addproduct'>Thêm sản phẩm</button>
                    <PagingationProduct data={data} columns={columns} url={urlDelete} del={setDataProduct} />
                </>
            )}


        </div>
    )
}

export default Product