import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";

const ViewOrdersDetails = () =>{
    const  params = useParams()
    console.log(params)
    const firebase = useFirebase();
   const [orders,setOrders] = useState([])
   
    useEffect(()=>{
        firebase.getOrders(params.bookId).then(orders=>setOrders(orders.docs))
    },[firebase])
    console.log(orders)
    return (
        <div className="container">
            <h1>Orders</h1>
      {orders.map((order)=>{
        const data  = order.data();
        return <div className="border border-danger p-2 m-2">
           <h5> Order By : {data.displayName}</h5>
           <h6>Quantity : {data.qty}</h6>
           <p>User Email : {data.userEmail}</p>
        </div>
      })}
        </div>
    )
}

export default ViewOrdersDetails;