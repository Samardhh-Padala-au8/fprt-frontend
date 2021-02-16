import React, { useEffect, useState } from 'react'
import axios from "axios"

const Indimedi = (props) => {
    const [data, setData] = useState({})
    useEffect(async () => {
        const res = await axios(`https://dddemo23536e542.herokuapp.com/medicine/indi/${props.match.params.name}`, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
        })
        setData(res.data.data)
    }, [])
    return (
        <div>
            <div className="indidata">
                <h1>Medicine Detail Page</h1>
                <div><img src={data.medicineimagelink} alt="med" width="400" height="400" /></div>
                <b>
                    <div>Name : {data.medicinename}</div>
                    <div>Description : {data.description}</div>
                    <div>Category: {data.categoryname}</div>
                    <div>Price : {data.price}</div>
                </b>
            </div>
        </div>
    )
}

export default Indimedi
