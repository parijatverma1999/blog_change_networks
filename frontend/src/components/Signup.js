import React, { useState, lazy } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";

const Signup = ({ showAlert }) => {
    let navigate = useNavigate()

    const [signUpUser, setSignUpUser] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: ""
    })

    const handleSignupChange = (e) => {
        setSignUpUser({
            ...signUpUser,
            [e.target.name]: e.target.value
        })
    }

    const handleSignupSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/createUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signUpUser)
        });

        const result = await response.json();

        if (result.userVerify) {
            localStorage.setItem("authToken", result.authToken)
            showAlert("Welcome to Blog Post! Account created successfully", "success")
            navigate('/');
        }
        else {
            showAlert(result.message, "danger")
        }
    }
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={handleSignupSubmit}>
                    <h3>Sign Up</h3>
                    <div className="form-group mb-2">
                        <label htmlFor="name">Name</label>
                        <input type="name" className="form-control" id="name_id" name="name" onChange={handleSignupChange} placeholder="Enter Name" />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email_id" name="email" onChange={handleSignupChange} placeholder="Enter email" required />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password_id" name="password" onChange={handleSignupChange} placeholder="Enter Password" required minLength={5} />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input type="password" className="form-control" id="confirm_password_id" name="confirm_password" onChange={handleSignupChange} placeholder="Enter Password" required />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    <p className="forgot-password text-right">
                        Already registered? <Link to="/login" style={{ color: "blue" }}>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup