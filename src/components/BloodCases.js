import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import tbhlogo from './resources/TBH LOGO.png';
import NavBar from './NavBar';

function BloodCases() {
    const navigate = useNavigate();



    const [caseList, setCaseList] = useState([])
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const getCases = () => {

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
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render(text, record, index) {
                return (
                    <>
                        <Tag color={'blue'} >
                            {capitalizeFirstLetter(record.caseStatus)}
                        </Tag>
                        <Tag color={'red'}>
                            {capitalizeFirstLetter(record.casedecision)}
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
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
    return (
        <div className="main-box">
            <NavBar />
            <main className="main-content">
                <div className="topbar">
                    <img src={tbhlogo} style={{ width: 70 }} alt="Logo" />
                </div>

                <div className="title-box">
                    <h1 className="title">BLOOD CASES</h1>
                </div>


                <Table columns={columns} dataSource={caseList} />

                {/* <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
                    <button className="button-card" onClick={() => navigate('/ActiveCases')}>
                        <h3>Active</h3>
                    </button>
                    <button className="button-card" onClick={() => navigate('/SolvedCases')}>
                        <h3>Solved</h3>
                    </button>
                </div> */}
            </main>
        </div>
    );
}

export default BloodCases;
