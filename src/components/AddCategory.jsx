import { useState } from "react"
import "../styles/AddCategory.css"
import axios from "axios";
import { localAPI } from "../api";

const AddCategory = ({ onShow, getData }) => {
    const [namecategory, setNameCategory] = useState('');
    const postAddCategory = () => {
        const form = {
            name: namecategory
        }
        axios.post(localAPI + '/category/addcategory', form, {
            headers: {
                'token': localStorage.getItem('token')
            }
        }).then(() => {
            onShow()
            getData()
        })
    }
    return (
        <div className="container">
            <input type="text" className="form-control inputAddproduct" placeholder="Tên danh mục" value={namecategory} onChange={(e) => setNameCategory(e.target.value)} />
            <button onClick={() => postAddCategory()} className="btn btn-success">Thêm mới</button>
        </div>
    )
}

export default AddCategory