

import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { Button, Modal, Input, Radio, Select, Table } from 'antd';

import '../App.css';
import tbhlogo from './resources/TBH LOGO.png';
import NavBar from './NavBar';

// Modal.setAppElement('#root');


function Donors() {


    // const [ngos, setNgos] = useState([]);
    // const [ngoo, setNgoo] = useState([]);
    // const [index, setIndex] = useState(0);
    // const [filteredNgos, setFilteredNgos] = useState([]);
    // const [districtFilter, setDistrictFilter] = useState("");
    // const [bloodGroupFilter, setBloodGroupFilter] = useState("");
    // const [func, setFunc] = useState("");

    // const [ngos1, setNgos1] = useState([]);


    //////////////////// Custom Style for Modal

    // const customStyles = {
    //     overlay: {
    //         position: 'fixed',
    //         top: 0,
    //         left: 0,
    //         right: 0,
    //         bottom: 0,
    //     },
    //     content: {
    //         top: 0,
    //         bottom: 0,
    //         right: 0,
    //         border: 'none',
    //         overflow: 'auto',
    //         WebkitOverflowScrolling: 'touch',
    //         borderRadius: '0px',
    //         outline: 'none',
    //         padding: '0px',
    //         margin: '0px',
    //         width: '100%',
    //         height: '100%'
    //     }
    // };

    // useEffect(() => {

    //     var requestOptions = {
    //         method: 'GET',
    //         redirect: 'follow'
    //       };

    //       fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/getAllDonors", requestOptions)
    //         .then(response => response.json())
    //         .then((result) => {
    //             console.log(result)
    //             setNgos1(result.data.result)
    //         })
    //         .catch(error => console.log('error', error));


    //     setNgos(ngos1);
    //     setFilteredNgos(ngos1);
    // }, [ngos1]);



    // const handleDistrictFilterChange = (e) => {
    //     setDistrictFilter(e.target.value);
    //     if (e.target.value !== "") {
    //         const filtered = ngos.filter(ngo => ngo.district === e.target.value);
    //         setFilteredNgos(filtered);
    //     } else {
    //         setFilteredNgos(ngos);
    //     }
    // }


    // const handleBloodGroupFilterChange = (e) => {
    //     setBloodGroupFilter(e.target.value);
    //     if (e.target.value !== "") {
    //         const filtered = ngos.filter(ngo => ngo.bloodgroup === e.target.value);
    //         setFilteredNgos(filtered);
    //     } else {
    //         setFilteredNgos(ngos);
    //     }
    // };




    // // const [modalIsOpen, setModalIsOpen] = useState(false);
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // // Define a function to open the modal
    // const openModal = () => {
    //     console.log("okay hy")
    //     setIsModalOpen(true);
    // }


    // const handleOk = () => {

    //     if (func === 'view') {
    //         setIsModalOpen(false);
    //     }
    //     else if (func === 'delete') {
    //         ngos1.splice(index, 1);
    //         setIsModalOpen(false);
    //     }


    //     //perform your desiered action based on MOdel Type...
    //     // setIsModalOpen(false);
    // };

    // const handleCancel = () => {
    //     setIsModalOpen(false);
    // };
    /////////////////////////////////////////////////////////



    ///////////////// Content for View Modal

    // const viewmodal = (

    //     <div>
    //         <br></br>
    //         <p className="user-name">Name: <b>{ngoo.name}</b> </p>
    //         <p className="user-name">Blood Group: {ngoo.bloodGroup}</p>
    //         <p className="user-name">District: {ngoo.district}</p>
    //         <p className="user-name">Address: {ngoo.address} </p>
    //         <p className="user-name">Contact: {ngoo.phoneno}</p>
    //         <p className="user-name">Email: {ngoo.email} </p>
    //         <br></br>
    //     </div>

    // );


    // ///////////////// Content for Delete Modal

    // const deletemodal = (

    //     <div>
    //         <br></br>
    //         <p className="user-name">Name: <b>{ngoo.name}</b> </p>
    //         <p className="user-name">Blood Group: {ngoo.bloodGroup}</p>
    //         <p className="user-name">District: {ngoo.district}</p>
    //         <p className="user-name">Address: {ngoo.address} </p>
    //         <p className="user-name">Contact: {ngoo.phoneno}</p>
    //         <p className="user-name">Email: {ngoo.email} </p>
    //         <br></br>
    //     </div>

    // );



    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('')
    const [bloodGroup, setBloodGroup] = useState('')
    const [address, setAddress] = useState('')
    const [weight, setWeight] = useState('')
    const [savingData, setSavingData] = useState(false)
    const [donarList, setDonarList] = useState([])
    //on gender change
    const onGenderChange = (e) => {
        console.log(e.target.value)
        setGender(e.target.value)
    }

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setBloodGroup(value)
    };



    const handleOk = () => {

        setSavingData(true)

        const values = localStorage.getItem('userData')
        const item = JSON.parse(values)


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "organizationId": item.id,
            "name": name,
            "email": email,
            "phoneno": phone,
            "gender": gender,
            "age": age,
            "district": address,
            "bloodGroup": bloodGroup,
            "address": address,
            "location": {
                "lat": "194.56",
                "lng": "256.34"
            },
            "weight": weight
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/createDonor", requestOptions)
            .then(response => response.json())
            .then(result => {
                setSavingData(false)
                if (result.status == 0) {
                    alert(result.message)
                    // setIsModalOpen(false);
                    return
                }
                alert(result.message)
                setIsModalOpen(false);
                getMyDonarList()
            })
            .catch(error => console.log('error', error));
        // 
    };
    const handleCancel = () => {
        setName('')
        setEmail('')
        setPhone('')
        setGender('')
        setAge('')
        setBloodGroup('')
        setAddress('')
        setIsModalOpen(false);
    };

    // const AddDonarModal = () => {
    //     return (

    //     )
    // }


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Contact No.',
            dataIndex: 'phoneno',
            key: 'phoneno',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Blood Group',
            dataIndex: 'bloodGroup',
            key: 'bloodGroup',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Age/Weight',
            dataIndex: 'age',
            key: 'age',
            render(text, record, index) {
                return (
                    <>
                        <p>{record.age}/</p>
                    </>
                )
            }
        },
        {
            title: 'Address',
            dataIndex: 'district',
            key: 'district',
        },
        {
            title: 'Member Since',
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
            title: 'Action',
            render(text, record, index) {
                return (
                    <>
                        <button>Delete</button>
                        <button onClick={() => {
                            setName(record.name)
                            setEmail(record.email)
                            setPhone(record.phoneno)
                            setGender(record.gender)
                            setAge(record.age)
                            setBloodGroup(record.bloodGroup)
                            setAddress(record.district)
                            updateDonarDetails()
                        }}>Update</button>
                    </>
                )
            }
        },

    ];


    const updateDonarDetails = () => {
        setIsModalOpen(true)
    }

    const getMyDonarList = () => {
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

        fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/getAllDonorsBloodBank", requestOptions)
            .then(response => response.json())
            .then(result => {
                setDonarList(result.data.result)
            })
            .catch(error => console.log('error', error));
    }


    useEffect(() => {
        getMyDonarList()
    }, [])



    return (


        <div className='dashboard'>
            <div className="cards-container">
                {/* <MeasurementCard name={"Donors"} />
                <MeasurementCard name={"Volunteers"} />
                <MeasurementCard name={"NGOs"} />
                <MeasurementCard name={"Cases"} /> */}
            </div>
            {/* <div className='flex-col'>
                <h4 style={{ color: "#4a4a4a" }}>Blood Stock</h4>
                <div className="blood-stock">
                    <BloodBagCard name={"A Positive"} />
                    <BloodBagCard name={"A Negative"} />
                    <BloodBagCard name={"B Positive"} />
                    <BloodBagCard name={"B Negative"} />
                    <BloodBagCard name={"O Positive"} />
                    <BloodBagCard name={"O Negative"} />
                    <BloodBagCard name={"AB Positive"} />
                    <BloodBagCard name={"AB Negative"} />
                </div>

            </div> */}


            <div className="donation-requests">
                <h4 style={{ color: "#4a4a4a" }}>Donation Requests</h4>
                <Table columns={columns} dataSource={donarList} />
            </div>


            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {/* <button>Add New Donar</button> */}
                <Button onClick={() => setIsModalOpen(true)}>Add New Donar</Button>
            </div>


            <Modal
                title="Basic Modal"
                confirmLoading={savingData}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div>
                    <div className='patient-form'>
                        <label>Name</label>
                        <Input placeholder='Full name...' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div>
                        <label>Email</label>
                        <Input placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>


                    <div>
                        <label>Phone</label>
                        <Input type='tel' placeholder='Phone number...' value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>


                    <div>
                        <label>Gender</label>
                        <Radio.Group onChange={onGenderChange}>
                            <Radio value={"Male"}>Male</Radio>
                            <Radio value={"Female"}>Female</Radio>
                        </Radio.Group>
                    </div>

                    <div>
                        <label>Age</label>
                        <Input placeholder='Age...' value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>

                    <div>
                        <label>Weight</label>
                        <Input placeholder='Weight...' value={weight} onChange={(e) => setWeight(e.target.value)} />
                    </div>

                    <div>
                        <label>Blood Group</label>
                        <Select
                            value={bloodGroup}
                            style={{ width: '100%' }}
                            placeholder="Select Blood Group"
                            onChange={handleChange}
                            options={[
                                { value: 'A+', label: 'A+' },
                                { value: 'A-', label: 'A-' },
                                { value: 'B+', label: 'B+' },
                                { value: 'B-', label: 'B-' },
                                { value: 'O+', label: 'O+' },
                                { value: 'O-', label: 'O-' },
                                { value: 'AB+', label: 'AB+' },
                                { value: 'AB-', label: 'AB-' },

                            ]}
                        />
                    </div>

                    <div>
                        <label>Address</label>
                        <Input.TextArea placeholder='Enter Address..' value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>

                </div>
            </Modal>

        </div>

        // <div>
        //     <Table columns={columns} dataSource={donarList} />
        // </div>




    )



    // return (
    //     <div className="main-box">
    //         <NavBar />
    //         <main className="main-content">
    //             <div className="topbar">
    //                 <img src={tbhlogo} style={{ width: 70 }} alt="Logo" />
    //             </div>

    //             <div className="title-box">
    //                 <h1 className="title">Donors</h1>
    //             </div>

    //             <div style={{ justifyContent: "center", flexDirection: "column" }} >




    //                 <div>
    //                     <div className='searchbars-div'>

    //                         {/* ------- Search/Filter Boxes ------- */}

    //                         <label htmlFor="bloodGroupFilter" className='searchbars-leftlabel'>Filter by Blood Group</label>
    //                         <select id="bloodGroupFilter" value={bloodGroupFilter} onChange={handleBloodGroupFilterChange} className='searchbars-div-leftfilter' >
    //                             <option value="">All Blood Groups</option>
    //                             <option value="A+">A+</option>
    //                             <option value="A-">A-</option>
    //                             <option value="B+">B+</option>
    //                             <option value="B-">B-</option>
    //                             <option value="AB+">AB+</option>
    //                             <option value="AB-">AB-</option>
    //                             <option value="O+">O+</option>
    //                             <option value="O-">O-</option>
    //                         </select>

    //                         <div className='searchbars-div-rightdiv'>
    //                             <label htmlFor="districtFilter" className='searchbars-rightlabel'> Filter by District </label>
    //                             <select id="districtFilter" value={districtFilter} onChange={handleDistrictFilterChange} className='searchbars-div-rightfilter'>
    //                                 <option value="">All Districts</option>
    //                                 {Array.from(new Set(ngos.map(ngo => ngo.district))).map((district, index) => (
    //                                     <option key={index} value={district}>{district}</option>
    //                                 ))}
    //                             </select>
    //                         </div>
    //                     </div>
    //                 </div>

    //                 {/* ------- Divs/Cards to Show Donors Info ------- */}

    //                 <div className='data-div' >

    //                     {ngos1.length > 0 ? (

    //                         <div style={{ marginTop: "20px" }}>
    //                             {filteredNgos.map((ngo, index) => (

    //                                 <div className="user-card">
    //                                     <img src={"https://picsum.photos/200/300?random=" + index} alt="User Profile Picture" />
    //                                     <div className="user-card-info">
    //                                         <h2>Name:  {ngo.name} </h2>
    //                                         <p>Blood Group: {ngo.bloodGroup}</p>
    //                                         <p>District: {ngo.district}</p>
    //                                     </div>

    //                                     <div className="user-card-icons">
    //                                         <p className="user-card-icon" onClick={() => { setNgoo(ngo); setFunc("view"); openModal() }}> <AiFillEye /> </p>
    //                                         <p className="user-card-icon" onClick={() => { setNgoo(ngo); setFunc("delete"); setIndex(index); openModal() }}> <AiFillDelete /> </p>
    //                                     </div>
    //                                 </div>
    //                             ))}

    //                         </div>



    //                     ) : (
    //                         <p style={{ marginTop: "30px", marginLeft: "100px" }}>No Donors to Show</p>
    //                     )}

    //                 </div>

    //             </div>

    //             {/*  MODAL */}

    //             <Modal
    //                 width={'900px'}
    //                 title={func === 'view' ? "View Donor" : 'Delete Donor'}
    //                 open={isModalOpen}
    //                 onOk={handleOk}
    //                 onCancel={handleCancel}
    //             >

    //                 {(func === 'view') && (
    //                     viewmodal
    //                 )}

    //                 {(func === 'delete') && (
    //                     deletemodal
    //                 )}
    //             </Modal>

    //         </main>
    //     </div>
    // );
}

export default Donors;