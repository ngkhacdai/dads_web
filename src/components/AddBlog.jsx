import axios from "axios"
import React, { useState } from "react"

const AddBlog = ({ onChange }) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const changeToBlog = () => {
        onChange()
    }
    const Add = () => {
        const form = {
            title, content
        }
        axios.post('https://foodapp-7o77.onrender.com/v1/api/admin/createblog', form, {
            headers: {
                'token': localStorage.getItem('token')
            }
        }).then(() => {
            onChange()
        })
    }
    return (
        <>
            <div className="tiltle_input_addproduct">
                Tên tiêu đề
            </div>
            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
            <div className="tiltle_input_addproduct">
                Nội dung
            </div>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            <div>
                <button className='btnadd_product' onClick={() => Add()}  >Tạo blog</button>
                <button className='btnhuyadd_product' onClick={() => changeToBlog()} >Hủy</button>
            </div>
        </>
    )
}

export default AddBlog