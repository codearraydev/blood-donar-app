

import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { Button, Modal, Input, Radio, Select, Table } from 'antd';

import '../App.css';
import tbhlogo from './resources/TBH LOGO.png';
import NavBar from './NavBar';

// Modal.setAppElement('#root');


function Events() {




    const columns = [
        {
            title: 'Name',
            dataIndex: 'eventName',
            key: 'eventName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Contact No.',
            dataIndex: 'eventDate',
            key: 'eventDate',
        },
        {
            title: 'Gender',
            dataIndex: 'eventContactPerson',
            key: 'eventContactPerson',
        },
        {
            title: 'Blood Group',
            dataIndex: 'eventAddress',
            key: 'eventAddress',
        },
        {
            title: 'Email',
            dataIndex: 'totalVisitors',
            key: 'totalVisitors',
        },

        {
            title: 'Action',
            render(text, record, index) {
                return (
                    <>
                        <Button>Delete Event</Button>
                    </>
                )
            }
        },

    ];









    return (


        <div className='dashboard'>
            <div className="cards-container">
                {/* <MeasurementCard name={"Donors"} />
                <MeasurementCard name={"Volunteers"} />
                <MeasurementCard name={"NGOs"} />
                <MeasurementCard name={"Cases"} /> */}
            </div>



            <div className="donation-requests">
                <h4 style={{ color: "#4a4a4a" }}>Upcoming Events</h4>
                <Table columns={columns} />
            </div>


            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type='primary'>Add New Event</Button>
            </div>


        </div>
    )

}

export default Events;