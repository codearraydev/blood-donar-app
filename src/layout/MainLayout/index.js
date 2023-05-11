import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Cases, Ngos, Donors, Volunteer, Notification, messages, search, logout } from '../../svgs';
function MainLayout(props) {
    const { children } = props
    return (
        <div className='main-layout'>
            <div className="sidebar">
                <h2 style={{fontWeight:"800", fontSize:"30px"}}>T B H</h2>
                <ul>
                    <li><img src={Home} alt="" /> Home</li>
                    <li><img src={Ngos} alt="" />NGOs</li>
                    <li><img src={Donors} alt="" />Donors</li>
                    <li><img src={Cases} alt="" />Blood Cases</li>
                    <li><img src={Volunteer} alt="" />Volunteer</li>
                </ul>
            </div>
            <div className="page-content">
                <div className="header">
                    <div className='d-flex'>
                        <div className="profile"></div>
                        Iqra Hashmi
                    </div>
                    <div className='header-icons'>
                        <img src={search} alt="" />
                        <img src={messages} alt="" />
                        <img src={Notification} alt="" />
                        <img src={logout} alt="" />
                    </div>
                </div>
                <div className="body">
                    {children}
                </div>
            </div>
        </div >
    )
}

export default MainLayout