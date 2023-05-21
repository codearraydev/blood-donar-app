

import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { Button, Modal, Input, Radio, Select, Table } from 'antd';

import '../App.css';
import tbhlogo from './resources/TBH LOGO.png';
import NavBar from './NavBar';

// Modal.setAppElement('#root');


function Donations() {
    const [donarList, setDonarList] = useState()

    const loadDonation = () => {

        const values = localStorage.getItem('userData')
        const item = JSON.parse(values)

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/getAllDonationsByBloodBank/" + item.id, requestOptions)
            .then(response => response.json())
            .then(result => {
                setDonarList(result.data.result)
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }


    useEffect(() => {
        loadDonation()
    }, [])


    const columns = [
        {
            title: 'Donated By',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Donation Date',
            dataIndex: 'donationDate',
            key: 'donationDate',
            render(text, record, index) {
                return (
                    <>
                        <p>{new Date(record.donationDate).toLocaleDateString("en-US")}</p>
                    </>
                )
            }
        },
        {
            title: 'Contact',
            dataIndex: 'phoneno',
            key: 'phoneno',
        },
        {
            title: 'Donation Amount',
            dataIndex: 'donationAmount',
            key: 'donationAmount',
            render: (text) => <a>{text} PKR</a>,
        }
    ];

    return (


        <div className='dashboard'>
            <div className="cards-container">
            </div>
            <div className="donation-requests">
                <h4 style={{ color: "#4a4a4a" }}>Total Donations Received</h4>
                <Table columns={columns} dataSource={donarList} />
            </div>
        </div>



    )
}

export default Donations;