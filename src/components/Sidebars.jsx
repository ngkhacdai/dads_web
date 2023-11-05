import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/SideBar.css'
import { useNavigate } from "react-router-dom";

const SideBar = ({ children }) => {
    const navigate = useNavigate();
    const menuItem = [
        {
            path: '/',
            name: "Trang chủ",
            icon: 'assets/home.png'
        },
        {
            path: '/accounts',
            name: "Tài khoản",
            icon: 'assets/group.png'
        },
        {
            path: '/products',
            name: "Sản phẩm",
            icon: 'assets/skin-care.png'
        },
        {
            path: '/orders',
            name: "Hóa đơn",
            icon: 'assets/invoice.png'
        },
        {
            path: '/categorys',
            name: "Loại sản phẩm",
            icon: 'assets/category.png'
        },
        {
            path: '/blogs',
            name: "Blog",
            icon: 'assets/blogging.png'
        },
    ]
    const logout = () => {
        localStorage.setItem('token', '')
        navigate('/login')
    }

    return (
        <div className="main-container">
            <div className='sidebar-container'>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="sidebar-item" activeclassName="active">
                            <div className="sidebar-icon">
                                <img src={require(`../${item.icon}`)} alt={item.name} />
                            </div>
                            <div className="sidebar-label">{item.name}</div>
                        </NavLink>
                    ))
                }
                <button onClick={() => logout()} className="sidebar-account">
                    <div>
                        <p className='sidebar-account-name'>Đăng xuất</p>
                    </div>
                </button>
            </div>
            <main >{children}</main>
        </div>
    )
}

export default SideBar