import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logoutseller, getsellerDetail } from "../redux/actions/userAction";
import { getmedicines, getcategories, addmedicines, addcategory,emptymedres,emptycatres } from '../redux/actions/medicneAction';
import { v4 as uuidv4 } from "uuid";
import { nanoid } from 'nanoid';

const Sellerhome = (props) => {
    const [medi, setMedi] = useState({ medicinename: "", categoryname: "fever", description: "", medicineimagelink: '', price: "" })
    const [cat, setCat] = useState("")

    useEffect(() => {
        props.getsellerDetail(props.history)
        props.getcategories()
        props.emptymedres()
        props.emptycatres()
    }, [])
    const handleSubmit = (e) => {
        props.addmedicines(medi)
        setMedi({ medicinename: "", categoryname: "fever", description: "", medicineimagelink: '', price: "" })
    }
    const handleCategory = (e) => {

        let data = {
            categoryId: nanoid(),
            categoryname: cat
        }
        props.addcategory(data)
        setCat("")
    }
    const handleLogout = () => {
        props.logoutseller(props.history)
    }
    const handleseeproducts = (e) => {
        props.history.push("/sellerproducts")
    }
    return props.user ? (
        <div>
            <div>
                <div className="headerbox">
                    <button onClick={handleseeproducts}>See the products</button>
                    <div>{props.userDetail ? <div> <p><b>Welcome  {props.userDetail.name}</b></p>
                    </div> : null}</div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <h1>Seller Page</h1>
            </div>
            <div>
                <div className="newbie">
                    <div className="newmedbox">
                        <h2>Adding New Medicine</h2>
                        <input type="text" value={medi.medicinename} onChange={e => setMedi({ ...medi, medicinename: e.target.value })} placeholder="please enter medicine name" />
                        <div>
                            <label htmlFor="categoryname">Please pick your category </label>
                            <select
                                value={medi.categoryname}
                                onChange={e => setMedi({ ...medi, categoryname: e.target.value })}
                                name="categoryname"
                            >
                                {
                                    props.categories ? props.categories.map(med => <option value={med.categoryname} key={uuidv4()}>{med.categoryname}</option>) : null
                                }

                            </select>
                        </div>
                        <input type="text" value={medi.medicineimagelink} onChange={e => setMedi({ ...medi, medicineimagelink: e.target.value })} placeholder="paste medicine image link if available " />
                        <input type="text" value={medi.description} onChange={e => setMedi({ ...medi, description: e.target.value })} placeholder="please enter medicine description" />
                        <input type="number" value={medi.price} onChange={e => setMedi({ ...medi, price: e.target.value })} placeholder="please enter medicine price" />
                        <button onClick={handleSubmit}>Add the medicine</button>
                        {props.addresponse ? <p>{props.addresponse}</p> : ""}
                    </div>
                    <div className="newmedbox">
                        <h2>Adding New category</h2>
                        <input type="text" value={cat} onChange={e => setCat(e.target.value)} placeholder="Enter the new Category" />
                        <button onClick={handleCategory}>Add the Category</button>
                        {props.catresponse ? <p>{props.catresponse}</p> : ""}
                    </div>
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
        addresponse: storeData.medicineState.addresponse,
        catresponse: storeData.medicineState.catresponse,
        categories: storeData.medicineState.categories
    };
};

export default connect(mapStatetoprops, { logoutseller, getsellerDetail, getmedicines, getcategories, addmedicines, addcategory,emptycatres,emptymedres })(Sellerhome)
