import axios from "axios";
import React, { useEffect, useState } from "react";
import { localAPI, imageAPI } from "../api";

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
        setSelectedImage(`${imageAPI}/${imageData}`);
    }, [imageData]);

    const getCategoryData = async () => {
        axios.get(localAPI + '/category/getcategory', {
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
    // function base64toFile(fileName) {
    //     const byteCharacters = atob(imageData.data);
    //     const byteNumbers = new Array(byteCharacters.length);

    //     for (let i = 0; i < byteCharacters.length; i++) {
    //         byteNumbers[i] = byteCharacters.charCodeAt(i);
    //     }

    //     const byteArray = new Uint8Array(byteNumbers);
    //     const blob = new Blob([byteArray]);

    //     // Chuyển blob thành đối tượng File
    //     const file = new File([blob], fileName, { type: 'image/jpeg' });

    //     return file;
    // }
    const convertLinkToFile = async (imageUrl) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
            const file = new File([blob], fileName, { type: blob.type });
            return file;
        } catch (error) {
            console.error('Error converting image to file:', error);
        }
    };
    const addProductApi = async () => {
        const formData = new FormData();
        formData.append('_id', data._id)
        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('category', category)

        if (!checkSlectedImage) {
            try {
                const defaultImageFile = await convertLinkToFile('image.jpg');
                formData.append('image', defaultImageFile);
            } catch (error) {
                console.error('Error adding default image:', error);
                return; // Abort if there's an error with the default image
            }
        } else {
            formData.append('image', image);
        }
        formData.append('stockQuantity', stockQuantity)
        try {
            await axios.put(localAPI + '/product/updateproduct', formData, {
                headers: {
                    "content-type": "multipart/form-data",
                    'token': localStorage.getItem('token')
                }
            });
            updateList();
            onChange();
        } catch (error) {
            console.error('Error updating product:', error);
        }
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
                        crossorigin="anonymous"
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