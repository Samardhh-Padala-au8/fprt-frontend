import React, { useState } from 'react'
import { connect } from "react-redux";
import { loginUser, removeResponse, loginseller } from "../redux/actions/userAction";

const Login = (props) => {
    const [user, setUser] = useState({ email: "", password: "" })
    const [boolr, setBoolr] = useState(true)
    const handleSubmit = (e) => {
        console.log(user)
        props.loginUser(user, props.history);
    }
    const handleSubmitseller = (e) => {
        props.loginseller(user, props.history)
    }
    const handleRegister = (e) => {
        props.history.push("/")
    }
    const handleseeproducts = (e) => {
        props.history.push("/home")
    }
    const handleLogin = (e) => {
        setBoolr(!boolr)
    }
    return (
        <div>


            {boolr ? <div>
                <div className="btnbox">
                    <button onClick={handleRegister}>Go to the Register Page</button>
                    <button onClick={handleLogin}>Go to the seller login page</button>
                    <button onClick={handleseeproducts}>See the products</button>
                </div><div className="loginbox">
                    <h1>Buyer Login</h1>
                    <input type="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} placeholder="please enter email" />
                    <input type="password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} placeholder="please enter password" />
                    <button onClick={handleSubmit} >Login</button>

                    {props.response ? <p>{props.response.message}</p> : ""}
                </div> </div> :
                <div>
                    <div className="btnbox">
                        <button onClick={handleRegister}>Go to the Register Page</button>
                        <button onClick={handleLogin}>Go to the buyer login page</button>
                        <button onClick={handleseeproducts}>See the products</button>
                    </div>
                    <div className="loginbox">
                        <h1>Seller Login</h1>
                        <input type="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} placeholder="please enter email" />
                        <input type="password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} placeholder="please enter password" />
                        <button onClick={handleSubmitseller} >Login</button>


                        {props.response ? <p>{props.response.message}</p> : ""}
                    </div></div>}

        </div>
    )
}

const mapStatetoprops = (storeData) => {
    return {
        responseFetchingState: storeData.userState.isResponseFetching,
        response: storeData.userState.userResponse,
    };
};

export default connect(mapStatetoprops, { loginUser, removeResponse, loginseller })(Login);
