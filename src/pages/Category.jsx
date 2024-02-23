import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AddCategory from "../components/AddCategory";
import { localAPI } from "../api";

const Category = () => {
    const [data, setData] = useState([]);
    const [showAddCategory, setShowCategory] = useState(false);
    useEffect(() => {
        getCategoryData()
    }, [])
    const getCategoryData = () => {
        axios.get(localAPI + '/category/getcategory', {
            headers: {
                'token': localStorage.getItem('token')
            }
        }).then(res => setData(res.data))
    }
    const deleteCategory = async (row) => {
        const formData = {
            "_id": row
        }
        const result = window.confirm('Are you sure you want to delete')
        if (result) {
            await axios.post(localAPI + '/category/removecategory', formData, {
                headers: {
                    'token': localStorage.getItem('token')
                }
            })
            getCategoryData()
        }
    }
    const onclickAddCategory = () => {
        setShowCategory(!showAddCategory)
    }
    const columns = [
        { name: '#', selector: (row, index) => index + 1 },
        { name: 'Tên danh mục', selector: (row) => row.name },
        {
            name: 'Action', cell: (row) => (
                <button onClick={() => {
                    deleteCategory(row._id)
                }} className="btn btn-danger">Delete</button>
            )
        }
    ]

    return (
        <>
            <div className="title">Category</div>
            {showAddCategory ? (
                <AddCategory onShow={onclickAddCategory} getData={getCategoryData} />
            ) : null}
            <DataTable
                data={data}
                columns={columns}
                pagination
                actions={
                    <button onClick={() => onclickAddCategory()} className="btn btn-primary">Thêm mới</button>
                }
            />
        </>
    )
}

export default Category