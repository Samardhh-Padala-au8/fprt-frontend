import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logoutUser, getuserDetail } from "../redux/actions/userAction";
import { getmedicines, getcategories, addcart } from '../redux/actions/medicneAction';
import { v4 as uuidv4 } from "uuid";

const Buyerhome = (props) => {
    const [cat, setCat] = useState("")
    const [search, setSearch] = useState("")
    useEffect(async () => {
        await props.getuserDetail(props.history)
        await props.getmedicines(search, cat)
        await props.getcategories()
    }, [search, cat])
    const handleLogout = () => {
        props.logoutUser(props.history)
    }
    function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return false;
            }
        }

        return true;
    }
    const handleCart = (med) => {
        if (containsObject(med, props.cart)) {
            props.addcart(med)
        }
    }
    const handleseeproducts = (e) => {
        props.history.push("/cartpage")
    }
    const handleindi = (name) => {
        props.history.push(`/indi/${name}`)
    }
    return props.user ? (
        <div>
            <div className="headerbox">
                <button onClick={handleseeproducts}>Go to the cartpage</button>
                <div>{props.userDetail ? <div> <p><b>Welcome  {props.userDetail.name}</b></p>
                </div> : null}</div>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <h1>Buyer Page</h1>
            <div>
                <div className="searchbox">
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Enter the medicine name" />
                    <select
                        value={cat}
                        onChange={e => setCat(e.target.value)}
                        name="role"
                    >
                        <option value="">ALL</option>
                        {
                            props.categories ? props.categories.map(med => <option value={med.categoryname} key={uuidv4()}>{med.categoryname}</option>) : null
                        }

                    </select>
                </div>
                <div className="medicinebox">
                    {
                        props.medicines ? props.medicines.map(med => <div className="mediboxi" key={uuidv4()}>
                            <img src={med.medicineimagelink} alt="medi" width="200" height="200" />
                            <div className="meddetails">
                                <p><b>name:</b>{med.medicinename}</p>
                                <p><b>category:</b>{med.categoryname}</p>
                                <p><b>price:</b>{med.price}</p>
                                <button onClick={() => handleCart(med)}>add to cart</button>
                                <button onClick={() => handleindi(med.medicinename)}>View product</button>
                            </div>
                        </div>) : null
                    }
                </div>
            </div>
        </div>
    ) : <Redirect to="/" />
}

const mapStatetoprops = (storeData) => {
    return {
        user: storeData.userState.user,
        userDetail: storeData.userState.userDetail,
        medicines: storeData.medicineState.medicines,
        categories: storeData.medicineState.categories,
        cart: storeData.medicineState.cart
    };
};

export default connect(mapStatetoprops, { logoutUser, getuserDetail, getmedicines, getcategories, addcart })(Buyerhome)
