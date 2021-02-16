import React from 'react'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Final = (props) => {
    const handleseeproducts = (e) => {
        props.history.push("/buyerhome")
    }
    return props.user ? (
        <div>
            <h1>PAYMENT IS SUCCESSFULL</h1>
            <h2>Your medicines will be shipped in 10  days</h2>
            <h3>Thank you visit again</h3>
            <button onClick={handleseeproducts}>Home</button>
        </div>
    ) : <Redirect to="/" />
}
const mapStatetoprops = (storeData) => {
    return {
        user: storeData.userState.user,
        cart: storeData.medicineState.cart
    };
};

export default connect(mapStatetoprops)(Final)