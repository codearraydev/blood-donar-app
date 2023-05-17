

import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { Button, Modal, Input, Radio, Select, Table, message , Tag} from 'antd';

import '../App.css';
import tbhlogo from './resources/TBH LOGO.png';
import NavBar from './NavBar';

// Modal.setAppElement('#root');


function Events() {

    const [allEvents, setAllEvents] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventContactPerson, setEventContactPerson] = useState("");
    const [totalVisitors, setTotalVisitors] = useState("");
    const [eventAddress, setEventAddress] = useState("");
    const [eventDetail, setEventDetail] = useState("");








    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleOk = () => {

        addEvent();
        setIsModalOpen(false);
    };
    useEffect(() => {
        getAllEvents();

    }, [])

    const addEvent = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "organizationID": "zK92NQHRa4xiChSi3nMr",
            "eventName": eventName,
            "eventDate": eventDate,
            "eventContactPerson": eventContactPerson,
            "eventAddress": eventAddress,
            "totalVisitors": totalVisitors,
            "eventDetail":eventDetail
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/addEvent", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                message.success('Event Added Succesfully!')
                getAllEvents();
                setEventAddress('')
                setEventName('')
                setEventDate('')
                setEventDetail('')
                setEventContactPerson('')
                setTotalVisitors('')
            }
            )
            .catch(error => console.log('error', error));
    }
    const getAllEvents = () => {
        const values = localStorage.getItem('userData')
        const item = JSON.parse(values)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var organizationid = "zK92NQHRa4xiChSi3nMr"


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            // body: raw,
            redirect: 'follow'
        };

        fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/getAllEvents/" + organizationid, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.data.result, "atatatatata")
                setAllEvents(result.data.result)
            })
            .catch(error => console.log('error', error));

    }



    const columns = [
        {
            title: 'Event Name',
            dataIndex: 'eventName',
            key: 'eventName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Event Date',
            dataIndex: 'eventDate',
            key: 'eventDate',
        },
        {
            title: 'Contact Person',
            dataIndex: 'eventContactPerson',
            key: 'eventContactPerson',
        },
        {
            title: 'Event Address',
            dataIndex: 'eventAddress',
            key: 'eventAddress',
        },
        {
            title: 'Total Visitors',
            dataIndex: 'totalVisitors',
            key: 'totalVisitors',
        },
        {
            title: 'Event Detail',
            dataIndex: 'eventDetail',
            key: 'eventDetail',
        },

        {
            title: 'Action',
            render(text, record, index) {
                return (
                    <>
                       <Tag style={{ cursor: 'pointer' }} onClick={()=>message.info("API Not Recieved")} color={'red'}>
                           Delete Event
                        </Tag>
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
                <div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' , marginBottom: '10px'}}>
                        <Button type='primary' onClick={() => setIsModalOpen(true)}>Add New Event</Button>
                    </div>
                    {/* <Button >Add Event</Button> */}
                </div>
                <Table columns={columns} dataSource={allEvents} />
            </div>




            <Modal
                title="Add New Event"
                // confirmLoading={savingData}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >

                <div>
                    <div className='patient-form'>
                        <label>Event Name</label>
                        <Input placeholder='Event Name' value={eventName} onChange={(e) => setEventName(e.target.value)} />
                    </div>

                    <div>
                        <label>Event Date</label>
                        <Input placeholder='Event Date...' value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                    </div>


                    <div>
                        <label>Event Contact Person</label>
                        <Input type='tel' placeholder='Contact Person...' value={eventContactPerson} onChange={(e) => setEventContactPerson(e.target.value)} />
                    </div>
                    <div>
                        <label>Total Visitors</label>
                        <Input type='tel' placeholder='Total Visitors ...' value={totalVisitors} onChange={(e) => setTotalVisitors(e.target.value)} />
                    </div>



                    <div>
                        <label>Event Address</label>
                        <Input.TextArea placeholder='Enter Address..' value={eventAddress} onChange={(e) => setEventAddress(e.target.value)} />
                    </div>

                    <div>
                        <label>Event Detail</label>
                        <Input.TextArea placeholder='Enter Address..' value={eventDetail} onChange={(e) => setEventDetail(e.target.value)} />
                    </div>

                </div>
            </Modal>
        </div>
    )

}

export default Events;