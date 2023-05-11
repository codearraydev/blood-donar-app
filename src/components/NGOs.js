

import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { Button, Modal, Input, notification, message, Popconfirm } from 'antd';

import { useToasts } from 'react-toast-notifications';

import '../App.css';
import tbhlogo from './resources/TBH LOGO.png';
import NavBar from './NavBar';


// Modal.setAppElement('#root');





function NGOs() {

    const [editNgo, setEditNgo] = useState({
        name: "",
        district: "",
        address: "",
        contact: "",
        email: "",
    });

    
    const [newNgo, setNewNgo] = useState({
        name: "",
        district: "",
        address: "",
        contact: "",
        email: "",
    });


    const [ngoo, setNgoo] = useState([]);
    const [index, setIndex] = useState(0);
    const [func, setFunc] = useState("");
    const [ngos1, setNgos1] = useState([]);

    //set result data
    const [listBloodbanks, setListBloodbank] = useState()
    const [showPopConfirm, setShowPopConfirm] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addToast } = useToasts();




    useEffect(() => {
        if (ngos1.length == 0) {
            getAllLocation()
        }
    }, []);


    const getAllLocation = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/getAllBloodBanks", requestOptions)
            .then(response => response.json())
            .then((result) => {
                console.log(result)
                setListBloodbank(result.data.result)
                // setNgos1(result.data.result)
                // setNgos(ngos1);
                // setFilteredNgos(ngos1);

            })
            .catch(error => console.log('error', error));
    }


    // Define a function to open the modal
    const openModal = () => {
        console.log("okay hy")
        setIsModalOpen(true);
    }


    //taking care of all actions
    const handleOk = () => {
        if (func === 'add') {
            setConfirmLoading(true)
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
                    setConfirmLoading(false)
                    console.log(result)




                    if (result.status == 1) {
                        addToast(result.message, {
                            appearance: 'success',
                            autoDismiss: true,
                        });
                        setIsModalOpen(false);
                        getAllLocation()
                        // alert(result.message)
                    } else if (result.status == 0) {
                        addToast(result.message, {
                            appearance: 'warning',
                            autoDismiss: true,
                        });
                        // alert(result.message)
                    }
                })
                .catch(error => console.log('error', error));



        }
        else if (func === 'view') {
            setIsModalOpen(false);
        }


        else if (func === 'edit') {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");


            var obj = {
                "organizationName": editNgo.name,
                "email": editNgo.email,
                "phoneno": editNgo.contact,
                "district": editNgo.district,
                "address": editNgo.address,
                "location": {
                    "lat": "341.5",
                    "lng": "38.2"
                }
            }

            alert(JSON.stringify(obj))
            // var requestOptions = {
            //     method: 'PUT',
            //     headers: myHeaders,
            //     body: obj,
            //     redirect: 'follow'
            // };

            // fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/editBloodBank", requestOptions)
            //     .then(response => response.text())
            //     .then(result => console.log(result))
            //     .catch(error => console.log('error', error));
            // ngos1[index] = ngoo
            // setIsModalOpen(false);
        }

        else {
            //delete the NGO here
            setConfirmLoading(true)

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "id": ngoo.id
            });

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/delBloodBank", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setConfirmLoading(false)
                    if (result.status == 1) {
                        addToast(result.message, {
                            appearance: 'success',
                            autoDismiss: true,
                        });
                        setIsModalOpen(false);
                        getAllLocation()

                    }
                    else {
                        addToast("There was an error deleting your Organization Please try again", {
                            appearance: 'warning',
                            autoDismiss: true,
                        });

                    }
                })
                .catch(error => console.log('error', error));



            //
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
                <Input style={{ width: "200px", height: "25px" }} type="text" id="name" value={ngoo.organizationName} onChange={(e) => setEditNgo({ ...editNgo, name: e.target.value })} />
                <label style={{ marginTop: "10px" }} htmlFor="district">District:</label>
                <Input style={{ width: "200px", height: "25px" }} type="text" id="district" value={ngoo.district} onChange={(e) => setEditNgo({ ...editNgo, district: e.target.value })} />
                <label style={{ marginTop: "10px" }} htmlFor="address">Address:</label>
                <Input style={{ width: "200px", height: "25px" }} type="text" id="address" value={ngoo.address} onChange={(e) => setEditNgo({ ...editNgo, address: e.target.value })} />
                <label style={{ marginTop: "10px" }} htmlFor="contact">Contact:</label>
                <Input style={{ width: "200px", height: "25px" }} type="text" id="contact" value={ngoo.phoneno} onChange={(e) => setEditNgo({ ...editNgo, contact: e.target.value })} />
                <label style={{ marginTop: "10px" }} htmlFor="email">Email:</label>
                <Input style={{ width: "200px", height: "25px" }} type="email" id="email" value={ngoo.email} onChange={(e) => setEditNgo({ ...editNgo, email: e.target.value })} />
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
                <p style={{ color: 'red' }}>NGO Details are as below. Are you sure you want to delete this NGO? Click Ok to confirm.</p>
                {/* <h2>NGO Details</h2> */}
                <p className="user-name">Name: <b>{ngoo.organizationName}</b> </p>
                <p className="user-name">District: {ngoo.district}</p>
                <p className="user-name">Address: {ngoo.address} </p>
                <p className="user-name">Contact: {ngoo.phoneno}</p>
                <p className="user-name">Email: {ngoo.email} </p>

                <br></br>
            </div>

            {/* <button style={{ width: "100px", height: "25px", marginRight: "10px" }} onClick={handleDelete}>Delete</button>
            <button style={{ width: "100px", height: "25px", marginRight: "10px" }} onClick={closeModal}>Cancel</button> */}
            <br></br>
        </div>

    );






    return (
        <div className="main-box">
            <NavBar />
            <main className="main-content">
                <div className="topbar"><img src={tbhlogo} style={{ width: 70 }} alt="Logo" /></div>
                <div className="title-box"><h1 className="title">NGOs</h1></div>
                <div className='data-div' >
                    {

                        <div>
                            {listBloodbanks?.map((banks, index) => {
                                return (
                                    <div key={index} className="user-card">
                                        <img src={"https://picsum.photos/200/300?random=" + index} alt="User Profile Picture" />
                                        <div className="user-card-info">
                                            <h2>Name:  {banks.organizationName} </h2>
                                            <p>District: {banks.district}</p>
                                        </div>

                                        <div className="user-card-icons">
                                            <p className="user-card-icon" onClick={() => { setNgoo(banks); setFunc("view"); openModal() }}> <AiFillEye /> </p>
                                            <p className="user-card-icon" onClick={() => { setNgoo(banks); setFunc("edit"); setIndex(index); openModal() }}> <BsPencilFill /> </p>


                                            <p className="user-card-icon" onClick={() => {
                                                setShowPopConfirm(true)
                                                setNgoo(banks);
                                                setFunc("delete");
                                                setIndex(index);
                                                openModal()
                                            }}> <AiFillDelete /> </p>



                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    }



                </div>


                <div style={{ justifyContent: "center", display: "flex" }}>
                    <div className="functionality-boxes">
                        <p onClick={() => {
                            setFunc("add");
                            openModal()
                        }}> <AiFillPlusCircle /> </p>
                        <h3>Add New NGO</h3>
                    </div>
                </div>



                {/*  MODAL */}

                <Modal
                    width={'900px'}
                    title={func === 'add' ? 'Add NGO' : func === 'view' ? "View NGO" : func === 'edit' ? 'Update NGO' : 'Delete NGO'}
                    open={isModalOpen}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
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