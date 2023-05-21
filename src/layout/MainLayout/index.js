import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Home, Cases, Ngos, Donors, Volunteer, Notification, messages, search, logout } from '../../svgs';
function MainLayout(props) {

    const [name, setName] = useState('')
    useEffect(() => {
        const values = localStorage.getItem('userData')
        const item = JSON.parse(values)

        setName(item.organizationName)
    }, [])


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const { children } = props
    return (
        <div className='main-layout'>
            <div className="sidebar">
                <h2 style={{ fontWeight: "800", fontSize: "30px" }}>T B H</h2>
                <ul>
                    <li><img src={Home} alt="" /> <NavLink activeClassName='is-active' to={'/home'} className='link-style'>Home</NavLink></li>
                    {/* <li><img src={Ngos} alt="" /><NavLink activeClassName='is-active' to={'/home'} className='link-style'>NGOs</NavLink></li> */}
                    <li> <img src={Donors} alt="" /><NavLink activeClassName='is-active' to={'/donors'} className='link-style'>Donors</NavLink></li>
                    <li><img src={Cases} alt="" /><NavLink activeClassName='is-active' to={'/cases'} className='link-style'>Blood Cases</NavLink></li>
                    <li><img src={Volunteer} alt="" /><NavLink activeClassName='is-active' className='link-style'>Volunteer</NavLink></li>
                    <li><img src={Volunteer} alt="" /><NavLink activeClassName='is-active' to={'/events'} className='link-style'>Events</NavLink></li>
                    <li><img src={Volunteer} alt="" /><NavLink activeClassName='is-active' to={'/donations'} className='link-style'>Donation</NavLink></li>
                </ul>
            </div>
            <div className="page-content">
                <div className="header">
                    <div className='d-flex'>
                        <div className="profile"></div>
                        {capitalizeFirstLetter(name)}
                    </div>
                    <div className='header-icons'>
                        <img style={{ cursor: 'pointer' }} src={search} alt="" />
                        <img style={{ cursor: 'pointer' }} src={messages} alt="" />
                        <img style={{ cursor: 'pointer' }} src={Notification} alt="" />
                        <img style={{ cursor: 'pointer' }} src={logout} alt="" />
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