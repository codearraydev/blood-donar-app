import React from 'react'
import BloodBagCard from './BloodBagCard'
import MeasurementCard from './MeasurementCard'
import { Table } from 'antd'

function Home() {
    return (
        <div className='dashboard'>
            <div className="cards-container">
                <MeasurementCard name={"Donors"} />
                <MeasurementCard name={"Volunteers"}/>
                <MeasurementCard name={"NGOs"}/>
                <MeasurementCard name={"Cases"}/>
            </div>
            <div className='flex-col'>
                <h4 style={{color:"#4a4a4a"}}>Blood Stock</h4>
                <div className="blood-stock">
                <BloodBagCard name={"A Positive"}/>
                <BloodBagCard name={"A Negative"}/>
                <BloodBagCard name={"B Positive"}/>
                <BloodBagCard name={"B Negative"}/>
                <BloodBagCard name={"O Positive"}/>
                <BloodBagCard name={"O Negative"}/>
                <BloodBagCard name={"AB Positive"}/>
                <BloodBagCard name={"AB Negative"}/>
            </div>

            </div>
            <div className="donation-requests">
                <h4 style={{color:"#4a4a4a"}}>Donation Requests</h4>
                <Table/>
            </div>
        </div>
    )
}

export default Home