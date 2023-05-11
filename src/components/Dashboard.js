import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import '../App.css';
import tbhlogo from './resources/TBH LOGO.png';
import NavBar from './NavBar';
import { useState } from 'react';


function Dashboard() {

    // const [totalDonors, settotalDonors] = useState("");
    // const [totalRiders, settotaRiders] = useState("");
    // const [totalBanks, settotalBanks] = useState("");
    const [bpList, setBpList] = useState([])


    const [totalActivieCase, settotalActivieCase] = useState('')
    const [totalClosedCases, settotalClosedCases] = useState('')
    const [totalDonors, settotalDonors] = useState('')      //totalBloodBottles
    const [totalBloodBottles, settotalBloodBottles] = useState('')

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
                settotalActivieCase(result.data.totalActiveCases)
                settotalClosedCases(result.data.totalClosedCases)
                settotalDonors(result.data.totalDonors)
                settotalBloodBottles(result.data.totalBloodBottles)


                const bloodTypeArray = Object.entries(result.data.bloodTypes);
                setBpList(bloodTypeArray)
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
                            <h2>{totalActivieCase}</h2>
                        </div>
                        <div className="dashboard-boxes">
                            <h3>Closed Cases</h3>
                            <h2>{totalClosedCases}</h2>
                        </div>
                        <div className="dashboard-boxes">
                            <h3>Donars</h3>
                            <h2>{totalDonors}</h2>
                        </div>
                        <div className="dashboard-boxes">
                            <h3>Bottels</h3>
                            <h2>{totalBloodBottles}</h2>
                        </div>

                    </div>

                    <div style={{ justifyContent: "center", display: "flex", marginTop: 30 }}>
                        {/* List of Blood Groups */}

                        {bpList.map(([bloodType, count]) => (
                            <div className="dashboard-boxes">
                                <h3>{bloodType}</h3>
                                <h2>{count}</h2>
                            </div>

                        ))}
                        {/* <div className="dashboard-boxes">
                            <h3>Donars</h3>
                            <h2>{totalBanks}</h2>
                        </div> */}

                    </div>
                </div>

            </main>
        </div>
    );
}

export default Dashboard;