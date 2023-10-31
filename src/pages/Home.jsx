import React, { useEffect, useState } from 'react'
import '../styles/Home.css'
import axios from 'axios';
import DataTable from 'react-data-table-component';

// import ItemHome from '../items/ItemHome.js'
// import PagingationProduct from '../components/PagingationProduct'
const Home = () => {
    const [data, setData] = useState([])
    const [account, setAccount] = useState(0)
    const [products, setProducts] = useState(0)
    const [bills, setBills] = useState(0)
    const getData = () => {
        axios.get('https://foodapp-7o77.onrender.com/v1/api/admin/home', {
            headers: {
                'token': localStorage.getItem('token')
            }
        }).then((res) => {
            setData(res.data.product)
            setAccount(res.data.countUser)
            setProducts(res.data.countProduct)
            setBills(res.data.countOrder)
        })
    }
    useEffect(() => {
        getData();
    }, [])
    const columns = [
        { name: 'Image', selector: (row) => <img alt='' style={{ width: "100px", height: "70px" }} src={`data:${row.image.contentType};base64,${row.image.data}`} /> },
        { name: 'Tên sản phẩm', selector: (row) => row.name },
        { name: 'Mô tả', selector: (row) => row.description },
        { name: 'Giá', selector: (row) => row.price },
        { name: 'Số lượng ', selector: (row) => row.stockQuantity },
        { name: 'Loại sản phẩm', selector: (row) => row.category },
        { name: 'Số lượng bán', selector: (row) => row.soldQuantity },
    ];
    const itemStatistical = [
        {
            background: '#FFCC99',
            icon: 'assets/people.png',
            title: 'Accounts',
            statistical: account
        },
        {
            background: '#97FFFF',
            icon: 'assets/products.png',
            title: 'Products',
            statistical: products
        },

        {
            background: '#D2B48C',
            icon: 'assets/bill.png',
            title: 'Bills',
            statistical: bills
        },
    ]

    return (
        <>
            <p className='title-home'>Trang chủ</p>
            <div className="statistical">
                <p className="title-block">Statistical</p>
                <div className="item-statistical">
                    {
                        itemStatistical.map((item, index) => (
                            <div className='contaner-statistical'>
                                <div className="statistical-icon" style={{ backgroundColor: `${item.background}` }}>
                                    <img src={require(`../${item.icon}`)} alt={item.name} />
                                </div>
                                <div>
                                    <div className="statistical-number">{item.statistical}</div>
                                    <div className="statistical-title">{item.title}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="selling">
                <p className="title-block">Top selling</p>
                <DataTable
                    data={data}
                    columns={columns}
                />
            </div>

        </>
    )
}

export default Home