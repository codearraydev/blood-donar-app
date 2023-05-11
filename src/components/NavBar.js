import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import tbhlogo from './resources/TBH LOGO1.png';

function NavBar() {

    const navigate = useNavigate();

    var role = localStorage.getItem("role");
    var name = localStorage.getItem("name")

    function Logout() {
        console.log('Clicked Logout');
        navigate('/');
    }

    return (
        <nav className="sidebar">

            <div className="profile">
                <div className="profile-icon">
                    <img src={tbhlogo} alt="Profile Icon" />
                </div>
                <div className="profile-name">
                    <a className="profile-name" href="/Dashboard" >{name}</a>
                </div>
                <div className="profile-role">
                    <p className="profile-role">{role}</p>
                </div>
            </div>

            <ul>


                <li>
                    <a href="/Dashboard">Dashboard</a>
                </li>

                {(role === 'superadmin' || role === 'nationaladmin' || role === 'districtadmin') ? (

                    <>
                        <li>
                            <a href="/NGOs">NGOs</a>
                        </li>
                        <li>
                            <a href="/Donors">Donors</a>
                        </li>
                        <li>
                            <a href="/BloodCases">Blood Cases</a>
                        </li>
                        <li>
                            <a href="/Volunteers" >Volunteers</a>
                        </li>
                    </>
                ) :
                    <>

                        <li>
                            <a href="/Donors">Donors</a>
                        </li>
                        <li>
                            <a href="/BloodCases">Blood Cases</a>
                        </li>
                        <li>
                            <a href="/Volunteers" >Volunteers</a>
                        </li>
                    </>
                }


            </ul>


            <p className="sidebar-logout" href="#" onClick={Logout}>Logout</p>
        </nav>
    );
}

export default NavBar;
