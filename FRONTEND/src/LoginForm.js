import React, { useState } from "react";

export const Login = (props) => {
    const [MobileNumber, setMobilenum] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(MobileNumber);
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="MobileNumber">MobileNumber</label>
                <input value={MobileNumber} onChange={(e) => setMobilenum(e.target.value)}type="mobile" placeholder="Enter phone number" id="mobile" name="mobile" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}
export default Login;