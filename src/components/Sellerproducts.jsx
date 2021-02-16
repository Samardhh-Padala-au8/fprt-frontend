import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getmedicines, getcategories } from '../redux/actions/medicneAction';
import { v4 as uuidv4 } from "uuid";


const Sellerproducts = (props) => {
    const [cat, setCat] = useState("")
    const [search, setSearch] = useState("")
    useEffect(async () => {
        await props.getmedicines(search, cat)
        await props.getcategories()
    }, [cat, search])
    const handleseeproducts = (e) => {
        props.history.push("/sellerhome")
    }
    return props.user?(
        <div>
            <button onClick={handleseeproducts}>Back to home</button>
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
            <div className="medicinebox">
                {
                    props.medicines ? props.medicines.map(med => <div className="medibox" key={uuidv4()}>
                        <img src={med.medicineimagelink} alt="medi" width="200" height="200" />
                        <div className="meddetails">
                            <p><b>name:</b>{med.medicinename}</p>
                            <p><b>category:</b>{med.categoryname}</p>
                            <p><b>price:</b>{med.price}</p>
                        </div>
                    </div>) : null
                }
            </div>
        </div>
    ):<Redirect to="/" />
}

const mapStatetoprops = (storeData) => {
    return {
        user: storeData.userState.user,
        medicines: storeData.medicineState.medicines,
        categories: storeData.medicineState.categories
    };
};

export default connect(mapStatetoprops, { getmedicines, getcategories })(Sellerproducts)