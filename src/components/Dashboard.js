import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import '../App.css';
import tbhlogo from './resources/TBH LOGO.png';
import NavBar from './NavBar';
import { useState } from 'react';


function Dashboard() {

    const [totalDonors, settotalDonors] = useState("");
    const [totalRiders, settotaRiders] = useState("");
    const [totalBanks, settotalBanks] = useState("");


    useEffect(() => {

        const values = localStorage.getItem('userData')
        const item = JSON.parse(values)


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        //alert(item.token)
        var raw = JSON.stringify({
            "organizationid": item.id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/getStatsBloodBank", requestOptions)
            .then(response => response.json())
            .then(result => {
                settotalDonors(result.data.totalActiveCases)
                settotaRiders(result.data.totalClosedCases)
                settotalBanks(result.data.totalDonors)
            })
            .catch(error => console.log('error', error));
    }, [])

    // var requestOptions = {
    //     method: 'GET',
    //     redirect: 'follow'
    //   };

    //   fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/getAllBloodBanks", requestOptions)
    //     .then(response => response.json())
    //     .then(result => {console.log(result)
    //         // console.log('banks', result.data.Total)
    //         settotalBanks(result.data.Total)
    //     })
    //     .catch(error => console.log('error', error));
    // var requestOptions = {
    //     method: 'GET',
    //     redirect: 'follow'
    //   };

    //   fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/getAllVolunteers", requestOptions)
    //     .then(response => response.json())
    //     .then(result => {console.log(result)
    //         settotaRiders(result.data.Total)
    //     })
    //     .catch(error => console.log('error', error));
    // // const navigate = useNavigate();


    // // var name = localStorage.getItem("name")

    // var requestOptions = {
    //     method: 'GET',
    //     redirect: 'follow'
    // };

    // fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/getAllDonors", requestOptions)
    //     .then(response => response.json())
    //     .then(result => {console.log(result)
    //         const Total = result.data.Total
    //         settotalDonors(Total)
    //     })
    //     .catch(error => console.log('error', error));




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
                            <h3>Active Cases</h3>
                            <h2>{totalDonors}</h2>
                        </div>
                        <div className="dashboard-boxes">
                            <h3></h3>
                            <h2>301</h2>
                        </div>
                        <div className="dashboard-boxes">
                            <h3>Closed Cases</h3>
                            <h2>{totalRiders}</h2>
                        </div>
                        <div className="dashboard-boxes">
                            <h3>Donars</h3>
                            <h2>{totalBanks}</h2>
                        </div>

                    </div>

                    <div style={{ justifyContent: "center", display: "flex", marginTop: 30 }}>
                        {/* List of Blood Groups */}
                        <div className="dashboard-boxes">
                            <h3>Donars</h3>
                            <h2>{totalBanks}</h2>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
}

export default Dashboard;