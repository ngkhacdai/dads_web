import { useState } from "react"
import "../styles/AddCategory.css"
import axios from "axios";

const AddCategory = ({ onShow, getData }) => {
    const [namecategory, setNameCategory] = useState('');
    const postAddCategory = () => {
        const form = {
            name: namecategory
        }
        axios.post('https://foodapp-7o77.onrender.com/v1/api/admin/addcategory', form, {
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