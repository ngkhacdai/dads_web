import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import DialogOrder from '../components/DialogOrder';
import { localAPI } from '../api';

const Order = () => {
    const [data, setData] = useState([]);
    const [record, setRecord] = useState([]);
    const [statusSearch, setStatusSearch] = useState('');
    const [checkOrder, setCheckOrder] = useState('false');
    const [saveOrder, setSaveOrder] = useState(null);
    useEffect(() => {
        getOrderData()
    }, [])

    const getOrderData = () => {
        axios.get(localAPI + '/order/getallorder', {
            headers: {
                'token': localStorage.getItem('token')
            }
        }).then(res => {
            setData(res.data);
        })
    }
    useEffect(() => {
        const newData = data.filter(row => {
            return row.status.toLowerCase().includes(statusSearch.toLowerCase())
        })
        setRecord(newData);
    }, [data, statusSearch])
    const columns = [
        { name: 'Tên người mua', selector: (row) => row.user.username, sortable: true },
        { name: 'Địa chỉ', selector: (row) => row.user.address },
        { name: 'SĐT', selector: (row) => "0" + row.user.phone },
        { name: 'Tổng tiền', selector: (row) => row.totalPrice },
        { name: 'Trạng thái', selector: (row) => row.status },
        { name: 'Ngày mua', selector: (row) => row.orderDate, sortable: true },
        {
            name: 'Action', cell: (row) => (
                <button onClick={() => orderDetail(row._id)} className='btn btn-primary' >Xem chi tiết</button>
            )
        }
    ];
    const orderDetail = (_id) => {
        setCheckOrder(!checkOrder)
        setSaveOrder(_id)
    }
    const backToOrder = async () => {
        await getOrderData()
        setCheckOrder(!checkOrder)
    }
    const handleFilter = (event) => {
        setStatusSearch(event.target.value)
        const newData = data.filter(row => {
            return row.status.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecord(newData)
    }
    const customStyle = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "14px",
                backgroundColor: "#ccc"
            }
        },
        cells: {
            style: {
                fontSize: "14px",
            }
        }
    }

    return (
        <>
            <div className='title'>Order</div>
            {!checkOrder ?
                (<>
                    <DialogOrder _id={saveOrder} onChange={backToOrder} />
                </>) :
                (
                    <DataTable
                        subHeader
                        subHeaderComponent={
                            <input className='form-control' type='text' value={statusSearch} onChange={handleFilter} />
                        }
                        columns={columns} data={record} fixedHeader pagination
                        customStyles={customStyle}
                    />
                )}

        </>
    )
}

export default Order