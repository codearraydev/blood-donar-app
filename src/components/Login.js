import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import { UNSAFE_DataRouterStateContext, useAsyncError, useNavigate } from 'react-router-dom';
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

    const [api, contextHolder] = notification.useNotification();
    const [isLoginError, setIsLoginError] = useState(false)
    const openNotificationWithIcon = () => {
        api['error']({
            message: 'Error',
            description:
                'Invalid username or password',
        });
    };


    const handleSubmit = () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let obj = {
            "email": username,
            "password": password
        };

        var raw = JSON.stringify(obj);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://us-central1-blood-donar-project.cloudfunctions.net/app/userLogin", requestOptions)
            .then(response => response.json())
            .then((result) => {
                console.log(result)
                if (result.status == 1) {
                    alert('login success')
                    localStorage.setItem("role", result.data.role);
                    // localStorage.setItem("name", result.data.name);
                    if(result.data.role=="superadmin"){                        
                        navigate("/Dashboard");
                    }else if(result.data.role.includes('bloodbank')){
                        alert("bloodbank dashboard")
                        navigate("/")
                    }
                    
                } else {
                    alert("Invalid username or password")
                    // setIsLoginError(true)
                    console.log("Login failed. Invalid username or password.");
                }
            }
            )
            .catch(error => console.log('error', error));



        // Find matching admin in dataset
        // const matchingAdmin = admins.find((admin) => admin.username === username && admin.password === password);
        // if (matchingAdmin) {
        //     console.log(`Login successful. Role: ${matchingAdmin.role}`);

        //     // Store role and other credentials in localStorage

        //     localStorage.setItem("role", matchingAdmin.role);
        //     localStorage.setItem("name", matchingAdmin.name);
        //     localStorage.setItem("username", matchingAdmin.username);

        //     // Navigate to Dashboard page
            
        // } else {
        //     alert("Invalid username or password")
        //     setIsLoginError(true)
        //     console.log("Login failed. Invalid username or password.");
        // }
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

                    <input type="text" id="username" placeholder='   Username' name="username" value={username} onChange={handleUsernameChange} required />
                    <br />
                    <input type="password" id="password" placeholder='   Password' name="password" value={password} onChange={handlePasswordChange} required />
                    <br />
                    <button onClick={() => handleSubmit()} className='lgn-btn'>Login</button>

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
