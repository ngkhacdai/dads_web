import React, { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import axios from "axios"
import AddBlog from "../components/AddBlog"
import { localAPI } from "../api"
const Blog = () => {
    const [data, setData] = useState([])
    const [checkAddBlog, setCheckAddBlog] = useState(false)

    useEffect(() => {
        getData()
    }, [])
    const getData = () => {
        axios.get(localAPI + '/blog/getallblog', {
            headers: {
                'token': localStorage.getItem('token')
            }
        }).then((res) => {
            setData(res.data.blog)
        })
    }
    const columns = [
        { name: 'title', selector: (row) => row.title },
        { name: 'content', selector: (row) => row.content },
        { name: 'author', selector: (row) => row.author },
        { name: 'createdAt', selector: (row) => row.createdAt },
    ]
    const changeToAdd = () => {
        setCheckAddBlog(!checkAddBlog);
    }
    const changeCheckAdd = () => {
        setCheckAddBlog(!checkAddBlog);
        getData();
    }
    return (
        <div>
            <div className="title">
                Blog
            </div>
            {checkAddBlog ? (
                <AddBlog onChange={changeCheckAdd} />
            ) : (
                <>
                    <button onClick={() => { changeToAdd() }}>Tạo blog</button>
                    <DataTable columns={columns} data={data} />
                </>
            )}
        </div>
    )
}

export default Blog