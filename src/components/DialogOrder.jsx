import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "../styles/OrderDetail.css"
import { imageAPI, localAPI } from "../api";

const DialogOrder = ({ _id, onChange }) => {
    const [orderDetail, setOrderDetail] = useState([])
    const [load, setLoad] = useState(false)
    const form = {
        '_id': _id
    }
    useEffect(() => {
        const getOrderDetail = () => {
            axios.post(localAPI + '/order/getorderdetail', form, {
                headers: {
                    'token': localStorage.getItem('token')
                }
            }).then((res) => {
                setOrderDetail(res.data)
                setLoad(true)
                console.log(res.data);
            })
        }
        getOrderDetail()
    }, [])


    const columns = [
        { name: '#', selector: (row, index) => index + 1 },
        {
            name: 'Image', selector: (row) => <img alt='' style={{ width: "100px", height: "70px" }} crossorigin="anonymous" src={`${imageAPI}/${row.product.image}`} />
        },
        { name: 'Tên sản phẩm', selector: (row) => row.product.name },
        { name: 'Giá sản phẩm', selector: (row) => row.product.price },
        { name: 'Số lượng mua', selector: (row) => row.quantity },
        { name: 'Tổng tiền sản phẩm', selector: (row) => row.price },
    ]
    const giaohang = async () => {
        await axios.post(localAPI + '/order/giaohang', form, {
            headers: {
                'token': localStorage.getItem('token')
            }
        })
        onChange();
    }
    const huydonhang = async () => {
        await axios.post(localAPI + '/order/huydonhang', form, {
            headers: {
                'token': localStorage.getItem('token')
            }
        })
        onChange();
    }
    const checkStatusOrder = () => {
        if (orderDetail.order.status === 'Chờ xác nhận') {
            return (
                <>
                    <button onClick={() => giaohang()} className="btn btn-primary mt-2 w-100">
                        <div>Giao hàng</div>
                    </button>
                    <button onClick={() => huydonhang()} className="btn btn-danger mt-2 w-100">
                        <div>Hủy đơn hàng</div>
                    </button>
                </>
            )
        } else {
            return null
        }
    }
    if (!load) {
        return <>...Loading</>
    }
    return (
        <>
            <button onClick={onChange} className="btnBack">
                <img src={require('../assets/back.jpg')} alt="" style={{ width: "40px", height: "30px" }} />
            </button>
            <div className="user-order">
                <p>Tên người mua: {orderDetail.order.user.username}</p>
                <p>Địa chỉ: {orderDetail.order.user.address}</p>
                <p>Số điện thoại: 0{orderDetail.order.user.phone}</p>
            </div>
            <div className="product-order">
                <DataTable
                    data={orderDetail.order.products}
                    columns={columns}
                />
            </div>
            <div className="d-flex flex-row-reverse mt-4 fw-bold total">Tổng tiền: {orderDetail.order.totalPrice}đ</div>
            {checkStatusOrder()}

        </>
    )
}

export default DialogOrder