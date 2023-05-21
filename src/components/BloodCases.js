import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import tbhlogo from './resources/TBH LOGO.png';
import NavBar from './NavBar';

function BloodCases() {
    const navigate = useNavigate();



    const [caseList, setCaseList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const getCases = () => {
        setIsLoading(true)
        const values = localStorage.getItem('userData')
        const item = JSON.parse(values)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "organizationid": item.id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/getCasesforBloodBank", requestOptions)
            .then(response => response.json())
            .then(result => {
                setCaseList(result.data.result)
                setIsLoading(false)
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        getCases()
    }, [])
    const columns = [
        {
            title: 'Patient Name',
            dataIndex: 'pat_name',
            key: 'pat_name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Contact No.',
            dataIndex: 'pat_phoneno',
            key: 'pat_phoneno',
        },
        {
            title: 'Required Blood',
            dataIndex: 'pat_bloodType',
            key: 'pat_bloodType',
        },
        {
            title: 'Applicant Name',
            dataIndex: 'reciverName',
            key: 'reciverName',
        },
        {
            title: 'Applied Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render(text, record, index) {
                return (
                    <>
                        <p>{new Date(record.createdAt).toLocaleDateString("en-US", options)}</p>
                    </>
                )
            }
        },
        {
            title: 'Case Status',
            key: 'tags',
            dataIndex: 'tags',
            filters: [
                {
                    text: 'Closed',
                    value: 'closed',
                },
                {
                    text: 'Active',
                    value: 'active',
                },
            ],
            onFilter: (value, record) => record.caseStatus.indexOf(value) === 0,
            render(text, record, index) {
                return (
                    <>
                        <Tag color={record.caseStatus == "closed" ? 'blue-inverse' : 'blue'} >
                            {capitalizeFirstLetter(record.caseStatus)}
                        </Tag>


                        {
                            record.caseStatus == "closed" ? null :
                                <Tag style={{ cursor: 'pointer' }} onClick={() => alert("hello")} color={'red'}>
                                    {capitalizeFirstLetter(record.casedecision)}
                                </Tag>
                        }
                        <Tag style={{ cursor: 'pointer' }} onClick={() => navigate('/case-details?caseId=' + record.CaseID + '&receiverId=' + record.reciverID)} color={'green'}>
                            {"View Details"}
                        </Tag>
                    </>
                )
            }
            // render: (record) => (
            //     <>
            //         <Tag color={'blue'} >
            //             {record.caseStatus}
            //         </Tag>
            //         <Tag color={'red'}>
            //             {record.caseStatus}
            //         </Tag>
            //     </>
            // ),
        },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (_, record) => (
        //         <Space size="middle">
        //             <a>Invite {record.name}</a>
        //             <a>Delete</a>
        //         </Space>
        //     ),
        // },
    ];

    return (
        <div className='dashboard'>
            <div className="cards-container">

            </div>

            <div className="donation-requests">
                <h4 style={{ color: "#4a4a4a" }}>Donation Requests</h4>
                <Table loading={isLoading} columns={columns} dataSource={caseList} />
            </div>
        </div>
        // <div className="main-box">
        //     <NavBar />
        //     <main className="main-content">
        //         <div className="topbar">
        //             <img src={tbhlogo} style={{ width: 70 }} alt="Logo" />
        //         </div>

        //         <div className="title-box">
        //             <h1 className="title">BLOOD CASES</h1>
        //         </div>


        //         <Table columns={columns} dataSource={caseList} />

        //         {/* <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
        //             <button className="button-card" onClick={() => navigate('/ActiveCases')}>
        //                 <h3>Active</h3>
        //             </button>
        //             <button className="button-card" onClick={() => navigate('/SolvedCases')}>
        //                 <h3>Solved</h3>
        //             </button>
        //         </div> */}
        //     </main>
        // </div>
    );
}

export default BloodCases;
