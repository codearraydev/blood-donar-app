import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import tbhlogo from './resources/TBH LOGO.png';

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const admins = [
        {
            name: "Ali Khan",
            username: "sadmin",
            password: "123",
            role: "superadmin"
        },
        {
            name: "Akif Anees",
            username: "nadmin1",
            password: "123",
            role: "nationaladmin"
        },
        {
            name: "Abdul Arham",
            username: "nadmin2",
            password: "123",
            role: "nationaladmin"
        },
        {
            name: "Ahsan Rasheed",
            username: "dadmin1",
            password: "123",
            role: "districtadmin"
        },
        {
            name: "Hammad Saqib",
            username: "dadmin2",
            password: "123",
            role: "districtadmin"
        }
    
    ];


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        
        event.preventDefault();
        console.log(`Username: ${username}, Password: ${password}`);

        // Find matching admin in dataset
        const matchingAdmin = admins.find((admin) => admin.username === username && admin.password === password);

        if (matchingAdmin) {
            console.log(`Login successful. Role: ${matchingAdmin.role}`);

            // Store role and other credentials in localStorage
            
            localStorage.setItem("role", matchingAdmin.role);
            localStorage.setItem("name", matchingAdmin.name);
            localStorage.setItem("username", matchingAdmin.username);

            // Navigate to Dashboard page
            navigate("/Dashboard");
        } else {
            alert("Invalid username or password")
            console.log("Login failed. Invalid username or password.");
        }
    };


    return (
        <div className="login-box-main">
        <div className="login-box">
            <div className="left">
                <img src={tbhlogo} style={{ width: 300, marginRight: 30 }} alt="TBH Logo" />
            </div>

            <div className="right">
                <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}><b>Login - Admin Portal</b></button>
                <br />
                <br />
                <br />
                <form onSubmit={handleSubmit}>
                    <input type="text" id="username" placeholder='   Username' name="username" value={username} onChange={handleUsernameChange} required />
                    <br />
                    <input type="password" id="password" placeholder='   Password' name="password" value={password} onChange={handlePasswordChange} required />
                    <br />
                    <input type="submit" value="L O G I N" />
                </form>
                <br />
                <button style={{ background: 'none', border: 'none', padding: 0, margin: 0, color: 'black', cursor: 'pointer' }}>
                    Forget password?
                </button>
            </div>
        </div>
        </div>
    );
}

export default Login;
