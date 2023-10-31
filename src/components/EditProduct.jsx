import axios from "axios";
import React, { useEffect, useState } from "react";

const EditProduct = ({ data, onChange, updateList }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [checkSlectedImage, setCheckSelectedImage] = useState(false);
    const imageData = data.image;
    const [name, setName] = useState(data.name);
    const [image, setImage] = useState();
    const [description, setDescription] = useState(data.description);
    const [price, setPrice] = useState(data.price);
    const [categoryData, setCategoryData] = useState([]);
    const [category, setCategory] = useState(data.category);
    const [stockQuantity, setStockQuantity] = useState(data.stockQuantity);
    useEffect(() => {
        getCategoryData()
    }, [])


    useEffect(() => {
        // When the component mounts, set the selectedImage based on the imageData.
        if (imageData.contentType.startsWith('image/') && imageData.data) {
            setSelectedImage(`data:${imageData.contentType};base64, ${imageData.data}`);
        }
    }, [imageData]);

    const getCategoryData = async () => {
        axios.get('https://foodapp-7o77.onrender.com/v1/api/admin/getcategory', {
            headers: {
                'token': localStorage.getItem('token')
            }
        }).then(res => {
            setCategoryData(res.data)

        })
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
            setCheckSelectedImage(true)
        } else {
            setSelectedImage(null);
        }
    };
    const handleSelectChange = (item) => {
        const selectedName = categoryData.find(option => option._id === item.target.value).name;
        if (selectedName) {
            setCategory(selectedName)
        }
    }
    function base64toFile(fileName) {
        const byteCharacters = atob(imageData.data);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray]);

        // Chuyển blob thành đối tượng File
        const file = new File([blob], fileName, { type: 'image/jpeg' }); // Thay đổi 'image/jpeg' nếu định dạng khác

        return file;
    }
    const addProductApi = async () => {
        const formData = new FormData();
        formData.append('_id', data._id)
        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('category', category)

        if (!checkSlectedImage) {
            formData.append('image', base64toFile('image.jpeg'))

        } else {
            formData.append('image', image)
        }
        formData.append('stockQuantity', stockQuantity)
        await axios.put('https://foodapp-7o77.onrender.com/v1/api/admin/updateproduct', formData, {
            headers: {
                "content-type": "multipart/form-data",
                'token': localStorage.getItem('token')
            }
        })
        updateList();
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
            <select onChange={handleSelectChange}>
                {categoryData.map((item) => (
                    <option key={item._id} value={item._id} selected={item.name === data.category}>
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
                <button className='btnadd_product' onClick={() => { addProductApi() }} >Sửa sản phẩm</button>
                <button className='btnhuyadd_product' onClick={() => onChange()} >Hủy</button>
            </div>
        </>

    )
}

export default EditProduct