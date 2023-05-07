import React from 'react';
// import { useNavigate } from 'react-router-dom';
import '../App.css';
import tbhlogo from './resources/TBH LOGO.png';
import NavBar from './NavBar';
import  { useState } from 'react';


function Dashboard() {

    const [totalDonors, settotalDonors] = useState("");
    const [totalRiders, settotaRiders] = useState("");
    const [totalBanks, settotalBanks] = useState("");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/getAllBloodBanks", requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result)
            // console.log('banks', result.data.Total)
            settotalBanks(result.data.Total)
        })
        .catch(error => console.log('error', error));
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/getAllVolunteers", requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result)
            settotaRiders(result.data.Total)
        })
        .catch(error => console.log('error', error));
    // const navigate = useNavigate();


    // var name = localStorage.getItem("name")

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/getAllDonors", requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result)
            const Total = result.data.Total
            settotalDonors(Total)
        })
        .catch(error => console.log('error', error));

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
                            <h2>{totalDonors}</h2>
                        </div>
                        <div className="dashboard-boxes">
                            <h3>Cases</h3>
                            <h2>301</h2>
                        </div>
                        <div className="dashboard-boxes">
                            <h3>Volunteers</h3>
                            <h2>{totalRiders}</h2>
                        </div>

                    </div>
                    <div style={{ justifyContent: "center", display: "flex", marginTop: 30 }}>

                        <div className="dashboard-boxes">
                            <h3>NGOs</h3>
                            <h2>{totalBanks}</h2>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
}

export default Dashboard;