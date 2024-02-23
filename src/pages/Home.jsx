import React, { useEffect, useState } from 'react'
import '../styles/Home.css'
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { imageAPI, localAPI } from '../api';

const Home = () => {
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [account, setAccount] = useState(0)
    const [products, setProducts] = useState(0)
    const [bills, setBills] = useState(0)
    const currentYear = new Date().getFullYear();
    const startYear = 2020;
    const years = [0];
    const [selectedYear, setSelectedYear] = useState(0);
    const [totalYear, setTotalYear] = useState(0);
    for (let year = currentYear; year >= startYear; year--) {
        years.push(year);
    }

    const handleChange = (event) => {
        const Year = parseInt(event.target.value, 10);
        setSelectedYear(Year);
        if (Year === 0) {
            getData()
        } else {
            getThongKe(Year)
        }
    };
    const getThongKe = (Year) => {
        setLoading(true)
        const form = {
            year: Year
        }
        axios.post(localAPI + '/admin/thongke', form, {
            headers: {
                'token': localStorage.getItem('token')
            }
        }).then((res) => {
            setBills(res.data.orderCount)
            setTotalYear(res.data.total)
            setLoading(false)
        })
    }
    const getData = () => {
        setLoading(true)
        axios.get(localAPI + '/admin/home', {
            headers: {
                'token': localStorage.getItem('token')
            }
        }).then((res) => {
            setData(res.data.product)
            setAccount(res.data.countUser)
            setProducts(res.data.countProduct)
            setBills(res.data.countOrder)
            setTotalYear(res.data.total)
            setLoading(false)
        })
    }
    useEffect(() => {
        getData();
    }, [])
    const columns = [
        { name: 'Image', selector: (row) => <img alt='' style={{ width: "100px", height: "70px" }} crossorigin="anonymous" src={`${imageAPI}/${row.image}`} /> },
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
        {
            background: '#D2B48C',
            icon: 'assets/total.png',
            title: 'Tổng doanh thu',
            statistical: totalYear
        },
    ]
    if (isLoading) {
        return <div>...Loading</div>
    }
    return (
        <>
            <p className='title-home'>Trang chủ</p>
            <div>
                <select value={selectedYear} onChange={handleChange}>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year === 0 ? "Select All" : year}
                        </option>
                    ))}
                </select>
            </div>
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