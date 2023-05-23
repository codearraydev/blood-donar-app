

import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { Button, Modal, Input, Radio, Select, Table, Tag, Spin } from 'antd';

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

    const [isClosingCase, setIsClosingCase] = useState(false)
    const closeRequestedCase = (caseId, orgId) => {
        setIsClosingCase(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "organizationID": orgId,
            "caseID": caseId,
            "caseClosedComments": "None"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/fullCaseClosed", requestOptions)
            .then(response => response.json())
            .then(result => {
                setIsClosingCase(false)
                alert("Case Closed...!!!")
                window.location.reload()
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
                setDonarList(result.data.donors)
                console.log(result.data)
            })
            .catch(error => console.log('error', error));
    }

    const [donarDetail, setDonarDetails] = useState()
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
            dataIndex: 'required_Date',
            key: 'required_Date',
        },
        {
            title: 'Ride Required',
            dataIndex: 'rideRequired',
            key: 'rideRequired',
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
                        <Tag style={{ cursor: 'pointer' }} onClick={() => {
                            if (record.DonorDecision === "accepted" && record.caseStatus == 'active') {
                                setDonarDetails(record)
                                showModal(record)
                            }
                        }} color={record.DonorDecision === 'accepted' ? 'green' : 'red'}>{record.caseStatus == 'closed' ? "Closed" : record.DonorDecision}</Tag>
                    </>
                )
            }
        },

        {
            title: 'Actions',
            key: 'tags',
            dataIndex: 'tags',
            render(text, record, index) {
                return (
                    <>
                        {
                            record.rideRequired == "yes" && <Tag onClick={() => sendRideRequest(record)} style={{ cursor: 'pointer' }} color='processing'>Send Reuqest to Rider</Tag>
                        }
                        {/* <Tag style={{ cursor: 'pointer' }} onClick={() => {
                            if (record.DonorDecision === "accepted" && record.caseStatus == 'active') {
                                setDonarDetails(record)
                                showModal(record)
                            }
                        }} color={record.DonorDecision === 'accepted' ? 'green' : 'red'}>{record.caseStatus == 'closed' ? "Closed" : record.DonorDecision}</Tag> */}
                    </>
                )
            }
        },
    ];


    const sendRideRequest = (record) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "organizationID": record.organizationID,
            "caseID": record.caseID,
            "donorID": record.donorID
        });


        alert(JSON.stringify(raw))
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/sendRideRequest", requestOptions)
            .then(response => response.json())
            .then(result => {
                alert(result.message)
            })
            .catch(error => console.log('error', error));
    }


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (information) => {
        setIsModalOpen(true);
        ReportSubmissionFrom(information)
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const [hemo, setHemo] = useState('')
    const [plateCount, setPlateCount] = useState('')
    const [wbc, setWbc] = useState('')
    const [rbc, setRBC] = useState('')
    const [comment, setComment] = useState('')



    const ReportSubmissionFrom = (information) => {

    }



    const closeCase = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "organizationID": donarDetail?.organizationID,
            "caseID": donarDetail?.caseID,
            "reciverID": donarDetail?.reciverID,
            "sendRequestID": donarDetail?.sendRequestID,
            "donorID": donarDetail?.donorID,
            "Hemoglobin": hemo,
            "plateletCount": plateCount,
            "whiteBloodCells": wbc,
            "redBloodCells": rbc,
            "comments": comment,
            "BloodDonated": "yes"
        });



        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/caseClosedDonor", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status == 0) {
                    alert(result.message)
                    return
                }

                alert(result.message)
                setIsModalOpen(false)
            })
            .catch(error => console.log('error', error));
    }



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


                {

                    caseDetails?.caseStatus == "closed" ? null :

                        caseDetails?.casedecision == "Donor Requested" ?
                            <div class="approval-buttons">
                                <button class="approve-button" onClick={() => closeRequestedCase(caseDetails?.CaseID, caseDetails.organizationID)}>{isClosingCase ? <Spin /> : "Close Case"}</button>
                            </div>
                            :
                            <div class="approval-buttons">
                                <button class="approve-button" onClick={() => approveRequest()}>Approve</button>
                                <button class="reject-button" onclick="rejectRequest()">Reject</button>
                            </div>
                }

            </div>


            <div className="donation-requests">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1>Donars List and Status</h1>
                    <div style={{ display: 'flex' }}>
                        <p>Required Bags: <Tag color='geekblue-inverse'> {caseDetails?.bloodBags}</Tag></p>
                        <p>Bags Left: <Tag color='green-inverse'> {caseDetails?.leftBloodBags}</Tag></p>
                    </div>

                </div>

                <Table dataSource={donarList} columns={columns} />
            </div>

            <Modal
                title="Donor Inormation"
                open={isModalOpen}
                onOk={handleOk}
                width={900}
                onCancel={handleCancel}
                footer={[
                    <Button onClick={() => handleCancel()} key="1" type='dashed'>Cancel</Button>,

                    <Button key="3" type="primary" onClick={() => closeCase()}>
                        Close Case
                    </Button>
                ]}
            >
                <>
                    <div class="info-box">
                        <h2><strong>Donor Information:</strong></h2>
                        <p><strong>Name :</strong>  {donarDetail?.donorName}</p>
                        <p><strong>Phone :</strong>  {donarDetail?.donorPhoneno}</p>
                        <p><strong>Address :</strong>  {donarDetail?.donorDistrict}</p>
                        <p><strong>Appointment Time:</strong>  {donarDetail?.appointmentDate}</p>
                        <p><strong>Last Blood Donated:</strong>  {donarDetail?.lastDonated}</p>
                        <p><strong>Ride Required:</strong>  {donarDetail?.rideRequired}</p>
                    </div>

                    <div class="info-box">
                        <h2>Basic Patient Information</h2>
                        <p><strong><label>Name:</label> </strong>{donarDetail?.pat_name}</p>
                        <p><strong><label>Phone:</label> </strong>{donarDetail?.pat_phoneno}</p>
                        <p><strong><label>Date Required:</label></strong> {donarDetail?.required_Date}</p>
                        <p><strong><label>Required Bags:</label> </strong>{donarDetail?.bloodBags}</p>
                        <p><strong><label>Bags Left:</label> </strong>{donarDetail?.leftBloodBags}</p>
                    </div>

                    <div>
                        <div>
                            <label for="hemoglobin">Hemoglobin:</label>
                            <Input type="number" id="hemoglobin" name="hemoglobin" value={hemo} onChange={(e) => setHemo(e.target.value)} />
                        </div>

                        <div>
                            <label for="plateletCount">Platelet Count:</label>
                            <Input type="number" id="plateletCount" name="plateletCount" value={plateCount} onChange={(e) => setPlateCount(e.target.value)} />
                        </div>

                        <div>
                            <label for="whiteBloodCell">White Blood Cell (WBC) Count:</label>
                            <Input type="number" id="whiteBloodCell" name="whiteBloodCell" value={wbc} onChange={(e) => setWbc(e.target.value)} />
                        </div>

                        <div>
                            <label for="redBloodCell">Red Blood Cell (RBC) Count:</label>
                            <Input type="number" id="redBloodCell" name="redBloodCell" value={rbc} onChange={(e) => setRBC(e.target.value)} />
                        </div>

                        <div>
                            <label for="comments">Comments:</label>
                            <Input.TextArea id="comments" name="comments" value={comment} onChange={(e) => setComment(e.target.value)}></Input.TextArea>
                        </div>
                    </div>
                </>
            </Modal>

        </div>



    )



}

export default CaseDetails;