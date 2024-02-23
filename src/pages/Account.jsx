import React, { useEffect } from 'react'
import '../styles/Account.css'
import { useState } from 'react'
import axios from 'axios';
import { localAPI } from '../api';
const Account = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Change this as needed
    // const [selectedPage, setSelectedPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    useEffect(() => {
        setDataAccount();

    }, [])
    const setDataAccount = async () => {
        axios.get(localAPI + '/admin/getalluser', {
            headers: {
                'token': localStorage.getItem('token')
            }
        }).then(res => setData(res.data))

        setLoading(false);
    }
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            // setSelectedPage(newPage); // Cập nhật trang đã chọn
        }
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemToShow = data.slice(startIndex, endIndex);
    const generatePageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const pageNumbers = generatePageNumbers();
    const renderPageNumbers = () => {
        const pageList = [];
        if (totalPages <= 7) {
            // Hiển thị tất cả các số trang nếu tổng số trang ít hơn hoặc bằng 7
            pageList.push(...pageNumbers);
        } else {
            if (currentPage < 4) {
                // Trường hợp trang hiện tại là 4 trở về sau
                pageList.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 3) {
                // Trường hợp trang hiện tại là 3 trở ra trước cuối
                pageList.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                // Trường hợp trang hiện tại nằm ở giữa
                pageList.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pageList.map((pageNumber, index) => (
            <button
                key={index}
                onClick={() => handlePageChange(pageNumber)}
                className={`page-number ${pageNumber === currentPage ? 'active' : ''}`}
            >
                {pageNumber}
            </button>
        ));
    };
    // Slice the data array to get the current page's items
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div >
            <div className='title'>Account</div>
            <table className='table-account'>
                <thead >
                    <tr style={{ backgroundColor: 'gray' }} className='collumn'>
                        <th style={{ width: '100px' }}>Index</th>
                        <th style={{ width: '150px' }}>Name</th>
                        <th style={{ width: '300px' }}>Email</th>
                        <th style={{ width: '150px' }}>Phone</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {itemToShow.map((item, index) => {
                        return (
                            <>
                                <tr className='collumn'>
                                    <td>{startIndex + index + 1}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.address}</td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
            <div className='pagination'>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    &lt;Preveous
                </button>
                {renderPageNumbers()}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next&gt;
                </button>
            </div>
        </div>
    )
}

export default Account
