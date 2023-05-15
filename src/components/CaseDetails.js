

import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { Button, Modal, Input, Radio, Select, Table, Tag } from 'antd';

import '../App.css';
import tbhlogo from './resources/TBH LOGO.png';
import NavBar from './NavBar';
import { useLocation, useSearchParams } from 'react-router-dom';

// Modal.setAppElement('#root');


function CaseDetails() {



    const [caseDetails, setCaseDetails] = useState();
    const [donarList, setDonarList] = useState()

    const useQuery = () => {
        const { search } = useLocation()
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    let query = useQuery();
    useEffect(() => {
        loadCaseDetails()
        loadDonarList()
    }, [])


    //loading the case details here
    const loadCaseDetails = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "reciverID": query.get('receiverId'),
            "caseID": query.get('caseId')
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/getSpecificCaseDetail", requestOptions)
            .then(response => response.json())
            .then(result => {
                setCaseDetails(result.data)
                // console.log(result)
            })
            .catch(error => console.log('error', error));
    }


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const approveRequest = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "reciverID": query.get('receiverId'),
            "caseID": query.get('caseId')
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/sendCaseRequestToALLDonors", requestOptions)
            .then(response => response.json())
            .then(result => {
                alert(result.message)
                loadCaseDetails()
            })
            .catch(error => console.log('error', error));
    }


    const loadDonarList = () => {

        const values = localStorage.getItem('userData')
        const item = JSON.parse(values)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "organizationID": item.id,
            "caseID": query.get('caseId')
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/listOfDonorsSpecificToCase", requestOptions)
            .then(response => response.json())
            .then(result => {
                setDonarList(result.data)
            })
            .catch(error => console.log('error', error));
    }


    const columns = [
        {
            title: 'Donar Name',
            dataIndex: 'donorName',
            key: 'donorName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Donar Contact No.',
            dataIndex: 'donorPhoneno',
            key: 'donorPhoneno',
        },
        {
            title: 'Donation Booking Date.',
            dataIndex: '',
            key: '',
        },
        {
            title: 'Blood Group',
            dataIndex: '',
            key: '',
        },
        {
            title: 'Applicant Name',
            dataIndex: '',
            key: '',
        },

        {
            title: 'Donar Status',
            key: 'tags',
            dataIndex: 'tags',
            render(text, record, index) {
                return (
                    <>
                        <Tag color='red'>{record.DonorDecision}</Tag>
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
                <h1>Blood Receiver - Request Details</h1>

                <div class="request-details">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h2>Receiver Profile</h2>
                        <div style={{ display: 'flex' }}>
                            <p>Case Status: <Tag color='geekblue-inverse'> {caseDetails?.caseStatus}</Tag></p>
                            <p>Case Decision: <Tag color='green-inverse'> {caseDetails?.casedecision}</Tag></p>
                        </div>

                    </div>
                    <p style={{ marginTop: 5 }}><strong>Name: </strong> {caseDetails?.reciverName}</p>
                    <p style={{ marginTop: 5 }}><strong>Contact: </strong> {caseDetails?.pat_phoneno}</p>
                </div>
                <br />
                <div class="request-details">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h2>Request Details</h2>
                        <p>Date Required: <Tag color='magenta-inverse'> {caseDetails?.required_Date}</Tag></p>
                    </div>

                    <p style={{ marginTop: 5 }}><strong>Patient Name: </strong>{caseDetails?.pat_name}</p>
                    <p style={{ color: 'red', fontWeight: 'bold', marginTop: 5 }}><strong>Required Blood:</strong> {caseDetails?.pat_bloodType}</p>
                    <p style={{ marginTop: 5 }}><strong>Required Bottels: </strong> {caseDetails?.bloodBags}</p>
                    <p style={{ marginTop: 5 }}><strong>Location: </strong> {caseDetails?.address}</p>
                    <p style={{ marginTop: 5 }}><strong>Additional Information: </strong> {caseDetails?.pat_detail}</p>
                </div>

                <div class="approval-buttons">
                    <button class="approve-button" onClick={() => approveRequest()}>Approve</button>
                    <button class="reject-button" onclick="rejectRequest()">Reject</button>
                </div>
            </div>


            <div className="donation-requests">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1>Donars List and Status</h1>
                    <div style={{ display: 'flex' }}>
                        <p>Required Bags: <Tag color='geekblue-inverse'> 10</Tag></p>
                        <p>Total Donated: <Tag color='green-inverse'> 0</Tag></p>
                    </div>

                </div>

                <Table dataSource={donarList} columns={columns} />
            </div>

        </div>



    )



}

export default CaseDetails;