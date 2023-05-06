import React from 'react';
import '../App.css';
import tbhlogo from './resources/TBH LOGO.png';
import { Addform1, Addform2 } from './addforms';
import NavBar from './NavBar';
import { useLocation } from 'react-router-dom';

const Add = ( props ) => {


    const { type } = (props.location && props.location.state) || {};
    console.log(type)
    
    const { state } = useLocation();
  const myProp = state?.myProp;
    console.log(myProp)

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
        <div style={{ justifyContent: "center", display: "flex", flexDirection: "column", marginTop: 50 }}>
          {myProp === "donor" ? <Addform1 /> : <Addform2 />}
        </div>
      </main>
    </div>
  );
}

export default Add;


