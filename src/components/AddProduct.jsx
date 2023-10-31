import axios from "axios";
import React, { useEffect, useState } from "react";

const AddProduct = ({ onChange, updateList }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setName] = useState('');
    const [image, setImage] = useState();
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [categoryData, setCategoryData] = useState([]);
    const [category, setCategory] = useState('');
    const [stockQuantity, setStockQuantity] = useState(0);
    useEffect(() => {
        getCategoryData()
    }, [])
    const getCategoryData = async () => {
        axios.get('https://foodapp-7o77.onrender.com/v1/api/admin/getcategory', {
            headers: {
                'token': localStorage.getItem('token')
            }
        }).then(res => setCategoryData(res.data))
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedImage(null);
        }
    };
    const handleSelectChange = (item) => {
        const selectedName = categoryData.find(option => option._id === item.target.value).name;
        setCategory(selectedName)
    }
    const addProductApi = async () => {
        const formData = new FormData();
        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('category', category)
        formData.append('image', image)
        formData.append('stockQuantity', stockQuantity)
        await axios.post('https://foodapp-7o77.onrender.com/v1/api/admin/addproduct', formData, {
            headers: {
                'token': localStorage.getItem('token')
            }
        })
        updateList()
        onChange();
    }
    return (
        <>
            <div className="tiltle_input_addproduct">
                Tên sản phẩm
            </div>
            <input type='text' value={name} onChange={e => setName(e.target.value)} />
            <div className="tiltle_input_addproduct">
                Giá sản phẩm
            </div>
            <input type='number' value={price} onChange={(text) => setPrice(text.target.value)} />
            <div className="tiltle_input_addproduct">
                Loại sản phẩm
            </div>
            <select value={this} onChange={handleSelectChange} >
                {categoryData.map((item) => (
                    <option key={item._id} value={item._id}>
                        {item.name}
                    </option>
                ))}
            </select>
            <div className="tiltle_input_addproduct">
                Số lượng sản phẩm
            </div>
            <input type='number' value={stockQuantity} onChange={(text) => setStockQuantity(text.target.value)} />
            <div className="dimage">
                <div className="tiltle_input_addproduct">
                    Ảnh sản phẩm
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {selectedImage && (
                    <img
                        src={selectedImage}
                        alt="SelectedImage"
                        style={{ maxWidth: "150px", maxHeight: "100px" }}
                    />
                )}
            </div>
            <div className="tiltle_input_addproduct">
                Mô tả sản phẩm
            </div>
            <textarea value={description} onChange={(text) => setDescription(text.target.value)} />
            <div>
                <button className='btnadd_product' onClick={() => { addProductApi() }} >Thêm sản phẩm</button>
                <button className='btnhuyadd_product' onClick={() => onChange()} >Hủy</button>
            </div>
        </>

    )
}

export default AddProduct