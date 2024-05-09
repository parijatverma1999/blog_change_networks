import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const Login = ({ showAlert }) => {
    console.log("showAlert", showAlert)
    const navigate = useNavigate()

    const [loginUser, setLoginUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleLoginChange = (e) => {
        setLoginUser({
            ...loginUser,
            [e.target.name]: e.target.value
        })
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginUser)
        });

        const result = await response.json();

        if (result.authVerify) {
            localStorage.setItem("authToken", result.authToken)
            showAlert("Welcome to Blog Post! Successful Login", "success")
            navigate('/');
        }
        else {
            showAlert("Invalid credentials", "danger")
        }

    }
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={handleLoginSubmit}>
                    <h3>Login</h3>
                    <div className="form-group mb-2">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email_id" name="email" onChange={handleLoginChange} placeholder="Enter email" required />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password_id" name="password" onChange={handleLoginChange} placeholder="Enter Password" required />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>

                </form>
                {/* </div> */}
            </div>
        </div>
    )
}

export default Login;