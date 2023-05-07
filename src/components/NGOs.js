

import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { Button, Modal, Input } from 'antd';

import '../App.css';
import tbhlogo from './resources/TBH LOGO.png';
import NavBar from './NavBar';

// Modal.setAppElement('#root');





function NGOs() {


    const [newNgo, setNewNgo] = useState({
        name: "",
        district: "",
        address: "",
        contact: "",
        email: "",
    });

    const [ngos, setNgos] = useState([]);
    const [ngoo, setNgoo] = useState([]);
    const [index, setIndex] = useState(0);
    const [filteredNgos, setFilteredNgos] = useState([]);
    const [districtFilter, setDistrictFilter] = useState("");
    const [nameFilter, setNameFilter] = useState("");
    const [func, setFunc] = useState("");




    const [ngos1, setNgos1] = useState([]);

    const customStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
        content: {
            top: 0,
            bottom: 0,
            right: 0,
            border: 'none',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '0px',
            outline: 'none',
            padding: '0px',
            margin: '0px',
            width: '100%',
            height: '100%'
        }
    };

    useEffect(() => {


        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/getAllBloodBanks", requestOptions)
            .then(response => response.json())
            .then((result) => {
                console.log(result)
                setNgos1(result.data.result)

            })
            .catch(error => console.log('error', error));


        setNgos(ngos1);
        setFilteredNgos(ngos1);
    }, [ngos1]);






    const handleDistrictFilterChange = (e) => {
        setDistrictFilter(e.target.value);
        if (e.target.value !== "") {
            const filtered = ngos.filter(ngo => ngo.district === e.target.value);
            setFilteredNgos(filtered);
        } else {
            setFilteredNgos(ngos);
        }
    }

    const handleNameFilterChange = (e) => {
        setNameFilter(e.target.value);
        const filtered = ngos.filter(ngo => ngo.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredNgos(filtered);
    }


    // const handleAdd = () => {

    //     setNgos1([...ngos, newNgo]);
    //     closeModal();

    // }

    // const handleEdit = () => {

    //     ngos1[index] = ngoo
    //     closeModal();
    //     console.log("edited data ", ngoo)

    // }

    // const handleDelete = () => {

    //     ngos1.splice(index, 1);
    //     closeModal();

    // }


    // const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Define a function to open the modal
    const openModal = () => {
        console.log("okay hy")
        setIsModalOpen(true);
    }






    const handleOk = () => {

        if (func === 'add') {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var obj = {
                "organizationName": newNgo.name,
                "email": newNgo.email,
                "phoneno": newNgo.contact,
                "district": newNgo.district,
                "address": newNgo.address,
                "location": {
                    "lat": "341.5",
                    "lng": "38.2"
                }
            }

            var raw = JSON.stringify(obj);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/createBloodBank", requestOptions)
                .then(response => response.json())
                .then((result) => {
                    console.log(result)
                    if (result.status == 1) {
                        alert(result.message)
                    } else if (result.status == 0) {
                        alert(result.message)
                    }
                })
                .catch(error => console.log('error', error));


            setIsModalOpen(false);
        }
        else if (func === 'view') {
            setIsModalOpen(false);
        }


        else if (func === 'edit') {
            ngos1[index] = ngoo
            setIsModalOpen(false);
        }


        else {
            // ngos1.splice(index, 1);
            setIsModalOpen(false);
        }

        //perform your desiered action based on MOdel Type...
        // setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    /////////////////////////////////////////////////////////


    const addmodal = (
        <div>
            {/* <h2>Add New NGO</h2> */}
            <div style={{ display: "flex", flexDirection: "column", paddingRight: "700px" }}>
                <label style={{ marginTop: "10px" }} htmlFor="name">Name:</label>
                <Input style={{ width: "200px", height: "25px" }} type="text" id="name" value={newNgo.organizationName} onChange={(e) => setNewNgo({ ...newNgo, name: e.target.value })} />
                <label style={{ marginTop: "10px" }} htmlFor="district">District:</label>
                <Input style={{ width: "200px", height: "25px" }} type="text" id="district" value={newNgo.district} onChange={(e) => setNewNgo({ ...newNgo, district: e.target.value })} />
                <label style={{ marginTop: "10px" }} htmlFor="address">Address:</label>
                <Input style={{ width: "200px", height: "25px" }} type="text" id="address" value={newNgo.address} onChange={(e) => setNewNgo({ ...newNgo, address: e.target.value })} />
                <label style={{ marginTop: "10px" }} htmlFor="contact">Contact:</label>
                <Input style={{ width: "200px", height: "25px" }} type="text" id="contact" value={newNgo.phoneno} onChange={(e) => setNewNgo({ ...newNgo, contact: e.target.value })} />
                <label style={{ marginTop: "10px" }} htmlFor="email">Email:</label>
                <Input style={{ width: "200px", height: "25px" }} type="email" id="email" value={newNgo.email} onChange={(e) => setNewNgo({ ...newNgo, email: e.target.value })} />
                <br /><br />
            </div>
            {/* <button style={{ width: "100px", height: "25px", marginRight: "10px" }} type="submit">Save</button>
                <button style={{ width: "100px", height: "25px", marginRight: "10px" }} onClick={closeModal}>Cancel</button> */}
        </div>
    );


    const viewmodal = (

        <div>
            <div>
                <br></br>
                {/* <h2>NGO Details</h2> */}
                <p className="user-name">Name: <b>{ngoo.organizationName}</b> </p>
                <p className="user-name">District: {ngoo.district}</p>
                <p className="user-name">Address: {ngoo.address} </p>
                <p className="user-name">Contact: {ngoo.phoneno}</p>
                <p className="user-name">Email: {ngoo.email} </p>
            </div>
            {/* <button onClick={closeModal} style={{ fontSize: "1.0rem", padding: "5px 10px" }}>Close</button> */}
            <br></br>
        </div>

    );


    const editmodal = (

        <div>
            {/* <h2>Edit NGO Details</h2> */}
            {/* <form onSubmit={handleEdit}> */}
            <div style={{ display: "flex", flexDirection: "column", paddingRight: "700px" }}>
                <label style={{ marginTop: "10px" }} htmlFor="name">Name:</label>
                <Input style={{ width: "200px", height: "25px" }} type="text" id="name" value={ngoo.organizationName} onChange={(e) => setNgoo({ ...ngoo, name: e.target.value })} />
                <label style={{ marginTop: "10px" }} htmlFor="district">District:</label>
                <Input style={{ width: "200px", height: "25px" }} type="text" id="district" value={ngoo.district} onChange={(e) => setNgoo({ ...ngoo, district: e.target.value })} />
                <label style={{ marginTop: "10px" }} htmlFor="address">Address:</label>
                <Input style={{ width: "200px", height: "25px" }} type="text" id="address" value={ngoo.address} onChange={(e) => setNgoo({ ...ngoo, address: e.target.value })} />
                <label style={{ marginTop: "10px" }} htmlFor="contact">Contact:</label>
                <Input style={{ width: "200px", height: "25px" }} type="text" id="contact" value={ngoo.phoneno} onChange={(e) => setNgoo({ ...ngoo, contact: e.target.value })} />
                <label style={{ marginTop: "10px" }} htmlFor="email">Email:</label>
                <Input style={{ width: "200px", height: "25px" }} type="email" id="email" value={ngoo.email} onChange={(e) => setNgoo({ ...ngoo, email: e.target.value })} />
                <br /><br />
            </div>
            {/* <button style={{ width: "100px", height: "25px", marginRight: "10px" }} type="submit">Save</button>
                <button style={{ width: "100px", height: "25px", marginRight: "10px" }} onClick={closeModal}>Cancel</button> */}
            {/* </form> */}
        </div>

    );


    const deletemodal = (

        <div>
            <div>
                <br></br>
                {/* <h2>NGO Details</h2> */}
                <p className="user-name">Name: <b>{ngoo.organizationName}</b> </p>
                <p className="user-name">District: {ngoo.district}</p>
                <p className="user-name">Address: {ngoo.address} </p>
                <p className="user-name">Contact: {ngoo.phoneno}</p>
                <p className="user-name">Email: {ngoo.email} </p>
                <br></br>
                <br></br>
            </div>
            <br></br>
            {/* <button style={{ width: "100px", height: "25px", marginRight: "10px" }} onClick={handleDelete}>Delete</button>
            <button style={{ width: "100px", height: "25px", marginRight: "10px" }} onClick={closeModal}>Cancel</button> */}
            <br></br>
        </div>

    );





    return (
        <div className="main-box">
            <NavBar />
            <main className="main-content">
                <div className="topbar">
                    <img src={tbhlogo} style={{ width: 70 }} alt="Logo" />
                </div>

                <div className="title-box">
                    <h1 className="title">NGOs</h1>
                </div>


                <div>
                    <div className='searchbars-div'>
                        <label htmlFor="nameFilter" className='searchbars-leftlabel'> Filter by Name </label>
                        <Input type="text" id="nameFilter" value={nameFilter} onChange={handleNameFilterChange} className='searchbars-div-leftsearchbox' />
                        <div className='searchbars-div-rightdiv'>
                            <label htmlFor="districtFilter" className='searchbars-rightlabel'> Filter by District </label>
                            <select id="districtFilter" value={districtFilter} onChange={handleDistrictFilterChange} className='searchbars-div-rightfilter'>
                                <option value="">All Districts</option>
                                {Array.from(new Set(ngos.map(ngo => ngo.district))).map((district, index) => (
                                    <option key={index} value={district}>{district}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className='data-div' >


                    {ngos1.length > 0 ? (

                        <div style={{ marginTop: "20px" }}>
                            {filteredNgos.map((ngo, index) => (
                                <div className="user-card">
                                    <img src={"https://picsum.photos/200/300?random=" + index} alt="User Profile Picture" />
                                    <div className="user-card-info">
                                        <h2>Name:  {ngo.organizationName} </h2>
                                        <p>District: {ngo.district}</p>
                                    </div>

                                    <div className="user-card-icons">
                                        <p className="user-card-icon" onClick={() => { setNgoo(ngo); setFunc("view"); openModal() }}> <AiFillEye /> </p>
                                        <p className="user-card-icon" onClick={() => { setNgoo(ngo); setFunc("edit"); setIndex(index); openModal() }}> <BsPencilFill /> </p>
                                        <p className="user-card-icon" onClick={() => { setNgoo(ngo); setFunc("delete"); setIndex(index); openModal() }}> <AiFillDelete /> </p>
                                    </div>
                                </div>
                                // <div key={ngo.index} className="user-box">
                                //     {/* <img src={`data:image/png;base6`} alt="User" className="user-img" /> */}
                                //     <div className="user-info">
                                //         <p>{index + 1} {"  -  "} <b> {ngo.name} </b> </p>
                                //         <p>{ngo.district} </p>
                                //     </div>
                                //     <p onClick={() => { setNgoo(ngo); setFunc("view"); openModal() }}> <AiFillEye /> </p>
                                //     <p onClick={() => { setNgoo(ngo); setFunc("edit"); setIndex(index); openModal() }}> <BsPencilFill /> </p>
                                //     <p onClick={() => { setNgoo(ngo); setFunc("delete"); setIndex(index); openModal() }}> <AiFillDelete /> </p>





                                //     {/* <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>



                                //     </Modal> */}



                                // </div>
                            ))}

                        </div>


                    ) : (
                        <p style={{ marginTop: "30px", marginLeft: "100px" }}>No NGO Added Yet</p>
                    )}

                </div>


                <div style={{ justifyContent: "center", display: "flex" }}>
                    <div className="functionality-boxes">
                        <p onClick={() => { setFunc("add"); openModal() }}> <AiFillPlusCircle /> </p>
                        <h3>Add New NGO</h3>
                    </div>
                </div>

                {/*  MODAL */}

                <Modal
                    width={'900px'}
                    title={func === 'add' ? 'Add NGO' : func === 'view' ? "View NGO" : func === 'edit' ? 'Update NGO' : 'Delete NGO'}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    {(func === 'add') && (
                        addmodal
                    )}
                    {(func === 'view') && (
                        viewmodal
                    )}
                    {(func === 'edit') && (
                        editmodal
                    )}
                    {(func === 'delete') && (
                        deletemodal
                    )}
                </Modal>

            </main>
        </div>
    );
}

export default NGOs;