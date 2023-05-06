

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
// import { BsPencilFill } from "react-icons/bs";
import Modal from 'react-modal';
import '../App.css';
import tbhlogo from './resources/TBH LOGO.png';
import NavBar from './NavBar';

Modal.setAppElement('#root');





function Donors() {

    const navigate = useNavigate();

    // const [newNgo, setNewNgo] = useState({
    //     name: "",
    //     district: "",
    //     address: "",
    //     contact: "",
    //     email: "",
    // });

    const [ngos, setNgos] = useState([]);
    const [ngoo, setNgoo] = useState([]);
    const [index, setIndex] = useState(0);
    const [filteredNgos, setFilteredNgos] = useState([]);
    const [districtFilter, setDistrictFilter] = useState("");
    const [bloodGroupFilter, setBloodGroupFilter] = useState("");
    // const [nameFilter, setNameFilter] = useState("");
    const [func, setFunc] = useState("");

    const [ngos1, setNgos1] = useState([
        {
            name: "Donor 1",
            district: "District 1",
            address: "Address 1",
            contact: "1234567890",
            email: "ngo1@example.com",
            bloodgroup: "AB+"
        },
        {
            name: "Donor 2",
            district: "District 2",
            address: "Address 2",
            contact: "2345678901",
            email: "ngo2@example.com",
            bloodgroup: "B+"
        },
        {
            name: "Donor 3",
            district: "District 3",
            address: "Address 3",
            contact: "3456789012",
            email: "ngo3@example.com",
            bloodgroup: "AB-"
        },
        {
            name: "Donor 4",
            district: "District 4",
            address: "Address 4",
            contact: "4567890123",
            email: "ngo4@example.com",
            bloodgroup: "A+"
        },
        {
            name: "Donor 5",
            district: "District 5",
            address: "Address 5",
            contact: "5678901234",
            email: "ngo5@example.com",
            bloodgroup: "AB+"
        },
        {
            name: "Donor 6",
            district: "District 5",
            address: "Address 5",
            contact: "5678901234",
            email: "ngo5@example.com",
            bloodgroup: "O+"
        },
        {
            name: "Donor 7",
            district: "District 5",
            address: "Address 5",
            contact: "5678901234",
            email: "ngo5@example.com",
            bloodgroup: "O+"
        }
    ]);


    //////////////////// Custom Style for Modal

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


    const handleBloodGroupFilterChange = (e) => {
        setBloodGroupFilter(e.target.value);
        if (e.target.value !== "") {
            const filtered = ngos.filter(ngo => ngo.bloodgroup === e.target.value);
            setFilteredNgos(filtered);
        } else {
            setFilteredNgos(ngos);
        }
    };


    // const handleNameFilterChange = (e) => {
    //     setNameFilter(e.target.value);
    //     const filtered = ngos.filter(ngo => ngo.name.toLowerCase().includes(e.target.value.toLowerCase()));
    //     setFilteredNgos(filtered);
    // }


    // const handleAdd = () => {

    //     setNgos1([...ngos, newNgo]);
    //     closeModal();

    // }

    // const handleEdit = () => {

    //     ngos1[index] = ngoo
    //     closeModal();
    //     console.log("edited data ", ngoo)

    // }

    const handleDelete = () => {

        ngos1.splice(index, 1);
        closeModal();

    }


    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Define a function to open the modal
    const openModal = () => {
        console.log("okay hy")
        setModalIsOpen(true);
    }

    // Define a function to close the modal
    const closeModal = () => {
        setModalIsOpen(false);
    }

    /////////////////////////////////////////////////////////


    // const addmodal = (
    //     <div>
    //         <h2>Add New Donor</h2>
    //         <form onSubmit={handleAdd}>
    //             <div style={{ display: "flex", flexDirection: "column", paddingRight: "700px" }}>
    //                 <label style={{ marginTop: "10px" }} htmlFor="name">Name:</label>
    //                 <input style={{ width: "200px", height: "25px" }} type="text" id="name" value={newNgo.name} onChange={(e) => setNewNgo({ ...newNgo, name: e.target.value })} />
    //                 <label style={{ marginTop: "10px" }} htmlFor="district">District:</label>
    //                 <input style={{ width: "200px", height: "25px" }} type="text" id="district" value={newNgo.district} onChange={(e) => setNewNgo({ ...newNgo, district: e.target.value })} />
    //                 <label style={{ marginTop: "10px" }} htmlFor="address">Address:</label>
    //                 <input style={{ width: "200px", height: "25px" }} type="text" id="address" value={newNgo.address} onChange={(e) => setNewNgo({ ...newNgo, address: e.target.value })} />
    //                 <label style={{ marginTop: "10px" }} htmlFor="contact">Contact:</label>
    //                 <input style={{ width: "200px", height: "25px" }} type="text" id="contact" value={newNgo.contact} onChange={(e) => setNewNgo({ ...newNgo, contact: e.target.value })} />
    //                 <label style={{ marginTop: "10px" }} htmlFor="email">Email:</label>
    //                 <input style={{ width: "200px", height: "25px" }} type="email" id="email" value={newNgo.email} onChange={(e) => setNewNgo({ ...newNgo, email: e.target.value })} />
    //                 <br /><br />
    //             </div>
    //             <button style={{ width: "100px", height: "25px", marginRight: "10px" }} type="submit">Save</button>
    //             <button style={{ width: "100px", height: "25px", marginRight: "10px" }} onClick={closeModal}>Cancel</button>
    //         </form>
    //     </div>
    // );


    ///////////////// Content for View Modal

    const viewmodal = (

        <div>
            <div>
                <br></br>
                <h2>Donor Details</h2>
                <p className="user-name">Name: <b>{ngoo.name}</b> </p>
                <p className="user-name">Blood Group: {ngoo.bloodgroup}</p>
                <p className="user-name">District: {ngoo.district}</p>
                <p className="user-name">Address: {ngoo.address} </p>
                <p className="user-name">Contact: {ngoo.contact}</p>
                <p className="user-name">Email: {ngoo.email} </p>
                <br></br>
                <br></br>
            </div>
            <br></br>
            <button onClick={closeModal} style={{ fontSize: "1.0rem", padding: "5px 10px" }}>Close</button>
            <br></br>
        </div>

    );


    // const editmodal = (

    //     <div>
    //         <h2>Edit Donor Details</h2>
    //         <form onSubmit={handleEdit}>
    //             <div style={{ display: "flex", flexDirection: "column", paddingRight: "700px" }}>
    //                 <label style={{ marginTop: "10px" }} htmlFor="name">Name:</label>
    //                 <input style={{ width: "200px", height: "25px" }} type="text" id="name" value={ngoo.name} onChange={(e) => setNgoo({ ...ngoo, name: e.target.value })} />
    //                 <label style={{ marginTop: "10px" }} htmlFor="district">District:</label>
    //                 <input style={{ width: "200px", height: "25px" }} type="text" id="district" value={ngoo.district} onChange={(e) => setNgoo({ ...ngoo, district: e.target.value })} />
    //                 <label style={{ marginTop: "10px" }} htmlFor="address">Address:</label>
    //                 <input style={{ width: "200px", height: "25px" }} type="text" id="address" value={ngoo.address} onChange={(e) => setNgoo({ ...ngoo, address: e.target.value })} />
    //                 <label style={{ marginTop: "10px" }} htmlFor="contact">Contact:</label>
    //                 <input style={{ width: "200px", height: "25px" }} type="text" id="contact" value={ngoo.contact} onChange={(e) => setNgoo({ ...ngoo, contact: e.target.value })} />
    //                 <label style={{ marginTop: "10px" }} htmlFor="email">Email:</label>
    //                 <input style={{ width: "200px", height: "25px" }} type="email" id="email" value={ngoo.email} onChange={(e) => setNgoo({ ...ngoo, email: e.target.value })} />
    //                 <br /><br />
    //             </div>
    //             <button style={{ width: "100px", height: "25px", marginRight: "10px" }} type="submit">Save</button>
    //             <button style={{ width: "100px", height: "25px", marginRight: "10px" }} onClick={closeModal}>Cancel</button>
    //         </form>
    //     </div>

    // );


///////////////// Content for Delete Modal

    const deletemodal = (

        <div>
            <div>
                <br></br>
                <h2>Donor Details</h2>
                <p className="user-name">Name: <b>{ngoo.name}</b> </p>
                <p className="user-name">Blood Group: {ngoo.bloodgroup}</p>
                <p className="user-name">District: {ngoo.district}</p>
                <p className="user-name">Address: {ngoo.address} </p>
                <p className="user-name">Contact: {ngoo.contact}</p>
                <p className="user-name">Email: {ngoo.email} </p>
                <br></br>
                <br></br>
            </div>
            <br></br>
            <button style={{ width: "100px", height: "25px", marginRight: "10px" }} onClick={handleDelete}>Delete</button>
            <button style={{ width: "100px", height: "25px", marginRight: "10px" }} onClick={closeModal}>Cancel</button>
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
                    <h1 className="title">Donors</h1>
                </div>

                <div style={{ justifyContent: "center", flexDirection: "column", marginTop: 50 }} >

                    {/* <div style={{ justifyContent: "center", display: "flex" }}>

                        <div className="functionality-boxes">

                            <a onClick={() => { setFunc("add"); openModal() }}> <AiFillPlusCircle /> </a>

                        </div>
                    </div> */}

                    {ngos1.length > 0 ? (

                        <div>
                            <div>
                                <div style={{ display: "flex", flexDirection: "row", marginLeft: 20, marginTop: "50px" }}>

                                    {/* ------- Search/Filter Boxes ------- */}

                                    {/* <label htmlFor="nameFilter" style={{ marginTop: "5px", marginLeft: "15px" }}> Filter by Name </label>
                                    <input type="text" id="nameFilter" value={nameFilter} onChange={handleNameFilterChange} style={{ width: "150px", height: "25px", marginLeft: "10px" }} /> */}

                                    <label htmlFor="bloodGroupFilter" style={{ marginTop: "5px", marginLeft: "10px" }}>Filter by Blood Group</label>
                                    <select id="bloodGroupFilter" value={bloodGroupFilter} onChange={handleBloodGroupFilterChange} style={{ width: "150px", height: "30px", marginLeft: "10px" }}>
                                        <option value="">All Blood Groups</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>

                                    <div style={{ display: "flex", flexDirection: "row", marginLeft: 20 }}>
                                        <label htmlFor="districtFilter" style={{ marginTop: "5px" }}> Filter by District </label>
                                        <select id="districtFilter" value={districtFilter} onChange={handleDistrictFilterChange} style={{ width: "150px", height: "30px", marginLeft: "10px" }}>
                                            <option value="">All Districts</option>
                                            {Array.from(new Set(ngos.map(ngo => ngo.district))).map((district, index) => (
                                                <option key={index} value={district}>{district}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* ------- Divs/Cards to Show Donors Info ------- */}

                            <div style={{ marginTop: "20px" }}>
                                {filteredNgos.map((ngo, index) => (
                                    <div key={ngo.index} className="user-box">
                                        {/* <img src={`data:image/png;base6`} alt="User" className="user-img" /> */}
                                        <div className="user-info">
                                            <p>{index + 1} {"  -  "} <b> {ngo.name} </b> </p>
                                            <p>{ngo.bloodgroup} </p>
                                            <p>{ngo.district} </p>
                                        </div>
                                        <p onClick={() => { setNgoo(ngo); setFunc("view"); openModal() }}> <AiFillEye /> </p>
                                        {/* <p onClick={() => { setNgoo(ngo); setFunc("edit"); setIndex(index); openModal() }}> <BsPencilFill /> </p> */}
                                        <p onClick={() => { setNgoo(ngo); setFunc("delete"); setIndex(index); openModal() }}> <AiFillDelete /> </p>

                                        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>

                                            {/* {(func === 'add') && (
                                                addmodal
                                            )} */}
                                            {(func === 'view') && (
                                                viewmodal
                                            )}
                                            {/* {(func === 'edit') && (
                                                editmodal
                                            )} */}
                                            {(func === 'delete') && (
                                                deletemodal
                                            )}

                                        </Modal>


                                    </div>
                                ))}

                            </div>

                        </div>

                    ) : (
                        <p style={{ marginTop: "30px", marginLeft: "100px" }}>No Donors to Show</p>
                    )}

                </div>

            </main>
        </div>
    );
}

export default Donors;