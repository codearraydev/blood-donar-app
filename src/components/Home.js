import React, { useState, useEffect } from 'react'
import BloodBagCard from './BloodBagCard'
import MeasurementCard from './MeasurementCard'
import { Table } from 'antd'

function Home() {

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
    return (
        <div className='dashboard'>
            <div className="cards-container">
                <MeasurementCard name={"Active Cases"} count={totalActivieCase} />
                <MeasurementCard name={"Closed Cases"} count={totalClosedCases} />
                <MeasurementCard name={"Donars"} count={totalDonors} />
                <MeasurementCard name={"Available Bottles"} count={totalBloodBottles} />
            </div>
            <div className='flex-col'>
                <h3 style={{ color: "#4a4a4a", fontWeight: 'bold' }}>Blood Stock</h3>
                <div className="blood-stock">
                    {bpList.map(([bloodType, count]) => (
                        <BloodBagCard name={bloodType} count={count} />
                    ))}
                    {/* <BloodBagCard name={"A Positive"} />
                    <BloodBagCard name={"A Negative"} />
                    <BloodBagCard name={"B Positive"} />
                    <BloodBagCard name={"B Negative"} />
                    <BloodBagCard name={"O Positive"} />
                    <BloodBagCard name={"O Negative"} />
                    <BloodBagCard name={"AB Positive"} />
                    <BloodBagCard name={"AB Negative"} /> */}
                </div>

            </div>
            <div className="donation-requests">
                <h3 style={{ color: "#4a4a4a", fontWeight: 'bold' }}>Donation Requests</h3>
                <Table />
            </div>
        </div>
    )
}

export default Home