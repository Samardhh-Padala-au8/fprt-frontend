import React, { useState } from 'react'
import { connect } from "react-redux";
import { registerUser, removeResponse, registerseller } from "../redux/actions/userAction";


const Register = (props) => {
    const [user, setUser] = useState({ name: "", email: "", password: "" })
    const [boolr, setBoolr] = useState(true)
    const handleSubmit = (e) => {
        console.log(user)
        props.registerUser(user, props.history);
    }
    const handleSubmitseller = (e) => {
        props.registerseller(user, props.history)
    }
    const handleLogin = (e) => {
        props.history.push("/login")
    }
    const handleRegister = (e) => {
        setBoolr(!boolr)
    }
    return (
        <div>
            {boolr ? <div>
                <div className="loginbox">
                    <h1>Buyer Registration</h1>
                    <input type="text" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} placeholder="please enter name" />
                    <input type="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} placeholder="please enter email" />
                    <input type="password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} placeholder="please enter password" />
                    <button onClick={handleSubmit}>Register</button>
                    <div>
                        <button onClick={handleLogin}>Go to Login page</button>
                        <button onClick={handleRegister}>Register for seller</button>
                    </div>
                    {props.response ? <p>{props.response.message}</p> : ""}
                </div>

            </div> :
                <div>
                    <div className="loginbox">
                        <h1>Seller Registration</h1>
                        <input type="text" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} placeholder="please enter name" />
                        <input type="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} placeholder="please enter email" />
                        <input type="password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} placeholder="please enter password" />
                        <button onClick={handleSubmitseller}>Register</button>
                        <div>
                            <button onClick={handleLogin}>Go to Login page</button>
                            <button onClick={handleRegister}>Register for Buyer</button>
                        </div>
                        {props.response ? <p>{props.response.message}</p> : ""}
                    </div>

                </div>}
        </div>
    )
}
const mapStatetoprops = (storeData) => {
    return {
        responseFetchingState: storeData.userState.isResponseFetching,
        response: storeData.userState.userResponse,
    };
};
export default connect(mapStatetoprops, { registerUser, removeResponse, registerseller })(Register);
