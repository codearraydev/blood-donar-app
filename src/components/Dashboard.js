import React from 'react';
// import { useNavigate } from 'react-router-dom';
import '../App.css';
import tbhlogo from './resources/TBH LOGO.png';
import NavBar from './NavBar';



function Dashboard() {


    // const navigate = useNavigate();


    // var name = localStorage.getItem("name")


    return (
        <div className="main-box">
            <NavBar />
            <main className="main-content">
                <div className="topbar">
                    <img src={tbhlogo} style={{ width: 70 }} alt="Logo" />
                </div>

                <div className="title-box">
                    <h1 className="title">DASHBOARD</h1>
                </div>

                <div style={{ justifyContent: "center", display: "flex", flexDirection: "column", marginTop: 50 }} >
                    <div style={{ justifyContent: "center", display: "flex" }}>

                        <div className="dashboard-boxes">
                            <h3>Donors</h3>
                            <h2>122</h2>
                        </div>
                        <div className="dashboard-boxes">
                            <h3>Cases</h3>
                            <h2>301</h2>
                        </div>
                        <div className="dashboard-boxes">
                            <h3>Volunteers</h3>
                            <h2>240</h2>
                        </div>

                    </div>
                    <div style={{ justifyContent: "center", display: "flex", marginTop: 30 }}>

                        <div className="dashboard-boxes">
                            <h3>NGOs</h3>
                            <h2>20</h2>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
}

export default Dashboard;