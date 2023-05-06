import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import tbhlogo from './resources/TBH LOGO.png';
import NavBar from './NavBar';

function BloodCases() {
    const navigate = useNavigate();

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

                <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
                    <button className="button-card" onClick={() => navigate('/ActiveCases')}>
                        <h3>Active</h3>
                    </button>
                    <button className="button-card" onClick={() => navigate('/SolvedCases')}>
                        <h3>Solved</h3>
                    </button>
                </div>
            </main>
        </div>
    );
}

export default BloodCases;
