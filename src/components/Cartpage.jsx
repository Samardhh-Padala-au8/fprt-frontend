import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { deletecart, emptycart } from '../redux/actions/medicneAction';
import { v4 as uuidv4 } from "uuid";
import Stripecheckout from "react-stripe-checkout"

const Cartpage = (props) => {
    const [product, setProduct] = useState({
        name: "Medical Store",
        price: 10,
        productBy: "Apollo",
    })
    const setprice = (price) => {
        setProduct({ ...product, price })
    }
    const makePayment = token => {
        const body = {
            token,
            product
        }
        const headers = {
            "Content-Type": "application/json"
        }
        return fetch(`http://localhost:5000/payment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response)
            console.log(response.status)
            if (response.status == 200) {
                props.history.push("/final")
                props.emptycart()
            }
        }).catch(err => {
            console.log(err)
        })
    }
    const handleseeproducts = (e) => {
        props.history.push("/buyerhome")

    }
    const handleRemove = (name) => {
        props.deletecart(name)
    }
    let price = 0
    return props.user ? (
        <div className="newmedbox">
            {props.cart.length > 0 ? <div>

                <h1>Cart Page</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Medicine Name</th>
                            <th>Image</th>
                            <th>price</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.cart ? props.cart.map(car => <tr key={uuidv4()}>
                            <td>{car.medicinename}</td>
                            <td>{<img src={car.medicineimagelink} alt="medical" width="100" height="100" />}</td>
                            <td>{car.price}</td>
                            <td><button onClick={() => { handleRemove(car.medicinename) }}>Remove</button></td>
                            <td style={{ display: "none" }}>{price = price + car.price}</td>
                        </tr>) : ""}
                    </tbody>
                </table>
                <h3>Total Price : {Math.floor(price)}</h3>
                <Stripecheckout
                    stripeKey="pk_test_51H8fgDEorapUb2K40KTHl6SBCmtO8vbXlMeuFCrOa4ShtNHT6zsmGwjyE1fNlJEyEGI97d2QOIpD6M3V09dqC0Xb00LCNRNrDO"
                    token={makePayment}
                    name="Buy Medicine"
                    amount={price * 100}
                    currency="INR"
                >
                    <button className="btn-large green" onClick={() => setprice(price)}>Buy Product</button>
                </Stripecheckout>
                <button onClick={handleseeproducts}>Home</button>
            </div> : <Redirect to="/buyerhome" />}
        </div>

    ) : <Redirect to="/" />
}

const mapStatetoprops = (storeData) => {
    return {
        user: storeData.userState.user,
        cart: storeData.medicineState.cart
    };
};
export default connect(mapStatetoprops, { deletecart, emptycart })(Cartpage)