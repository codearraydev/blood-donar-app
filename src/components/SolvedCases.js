

import React, { useState, useEffect } from 'react';
import { AiFillEye,  AiFillDelete } from "react-icons/ai";
import Modal from 'react-modal';
import '../App.css';
import tbhlogo from './resources/TBH LOGO.png';
import NavBar from './NavBar';

Modal.setAppElement('#root');


function SolvedCases() {


    const [ngos, setNgos] = useState([]);
    const [ngoo, setNgoo] = useState([]);
    const [index, setIndex] = useState(0);
    const [filteredNgos, setFilteredNgos] = useState([]);
    const [districtFilter, setDistrictFilter] = useState("");
    const [bloodGroupFilter, setBloodGroupFilter] = useState("");
    const [func, setFunc] = useState("");

    const [ngos1] = useState([
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



    ///////////////// Content for View Modal

    const viewmodal = (

        <div>
            <div>
                <br></br>
                <h2>Blood Case Details</h2>
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


///////////////// Content for Delete Modal

    const deletemodal = (

        <div>
            <div>
                <br></br>
                <h2>Blood Case Details</h2>
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
                    <h1 className="title">Solved Cases</h1>
                </div>

                <div style={{ justifyContent: "center", flexDirection: "column", marginTop: 50 }} >

                    {ngos1.length > 0 ? (

                        <div>
                            <div>
                                <div className='searchbars-div'>

                                    {/* ------- Search/Filter Boxes ------- */}

                                    <label htmlFor="bloodGroupFilter" className='searchbars-leftlabel'>Filter by Blood Group</label>
                                    <select id="bloodGroupFilter" value={bloodGroupFilter} onChange={handleBloodGroupFilterChange} className='searchbars-div-leftfilter'>
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

                            {/* ------- Divs/Cards to Show Donors Info ------- */}

                            <div style={{ marginTop: "20px" }}>
                                {filteredNgos.map((ngo, index) => (
                                    <div key={ngo.index} className="user-box">
                                        <div className="user-info">
                                            <p>{index + 1} {"  -  "} <b> {ngo.name} </b> </p>
                                            <p>{ngo.bloodgroup} </p>
                                            <p>{ngo.district} </p>
                                        </div>

                                        <p onClick={() => { setNgoo(ngo); setFunc("view"); openModal() }}> <AiFillEye /> </p>
                                        <p onClick={() => { setNgoo(ngo); setFunc("delete"); setIndex(index); openModal() }}> <AiFillDelete /> </p>

                                        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>

                                            {(func === 'view') && (
                                                viewmodal
                                            )}
   
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

export default SolvedCases;