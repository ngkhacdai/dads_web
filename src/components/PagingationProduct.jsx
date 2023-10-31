import React, { useState } from 'react'
import '../styles/Pagnigation.css'
import axios from 'axios';
import EditProduct from './EditProduct';
const PagingationProduct = ({ data, columns, url, del }) => {
    const [edit, setEdit] = useState(false);
    const [saveData, setSaveData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; // Change this as needed
    // const [selectedPage, setSelectedPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);

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
    const truncateText = (text, maxLength) => {
        if (typeof text !== 'string') {
            return text; // If the value is not a string, return it as is
        }

        if (text.length <= maxLength) {
            return text;
        }

        return text.slice(0, maxLength) + '...';
    };
    const showConfirm = async (_id, name) => {
        const result = window.confirm('Do you want to delete ' + name + '?');
        if (result) {
            await axios.post('https://foodapp-7o77.onrender.com/v1/api/admin/deleteproduct', { _id }, {
                headers: {
                    'token': localStorage.getItem('token')
                }
            })
            del();
        }
    }
    const changeEdit = (data) => {
        setSaveData(data);
        setEdit(!edit)
    }
    const editproduct = () => {
        setEdit(!edit)
    }
    return (
        <div>
            {!edit ? (
                <div>
                    <table>
                        <thead>
                            <tr style={{ backgroundColor: 'gray' }} className='collumn' >
                                {columns.map((column) => (
                                    <th
                                        key={column.key}
                                    >
                                        {column.label}
                                    </th>
                                ))}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemToShow.map((row) => (
                                <tr className='collumn' key={row._id}>
                                    {columns.map((column) => (
                                        <td key={column.key} className={column.className}>
                                            {column.key === 'image' ? (
                                                <img
                                                    src={`data:${row.image.contentType};base64,${row.image.data}`}
                                                    alt="Product"
                                                    style={{ width: "150px", height: "100px" }}
                                                />
                                            ) : (
                                                truncateText(row[column.key], 100)
                                            )}
                                        </td>
                                    ))}
                                    <td>
                                        <button onClick={() => changeEdit(row)} className='btn-edit'>Sửa</button>
                                        <button onClick={() => showConfirm(row._id, row.name)} className='btn-delete'>Xóa</button>
                                    </td>
                                </tr>
                            ))}
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
            ) : (
                <EditProduct data={saveData} updateList={del} onChange={editproduct} />
            )
            }
        </div>


    )
}

export default PagingationProduct