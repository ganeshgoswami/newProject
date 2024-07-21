import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/firebase";

const BookDetailsPage = () => {
  const params = useParams();
  const firebase = useFirebase();
  const [newData, setData] = useState(null);
  const [url, setURL] = useState(null);
  const [qty, setQty] = useState(1);
  console.log(params);
console.log(newData)
console.log(firebase.user)
  // useEffect(() => {
  //   firebase.getBookById(params.bookId).then((value) => setData(value.data()));
  // }, []);

  // useEffect(() => {
  //   if(data){
  //       const geturl = data.imageUrl;
  //       firebase.getImageUrl(geturl).then((url) => setURL(url));
  //   }
  // }, [data]);

  useEffect(()=>{
    const data = firebase.allProducts.find((n)=>n.id==params.prodId)
    setData(data)
    
  },[])

 const orderPlace = async() =>{
   
   const result = await firebase.placeOrder(params.prodId,qty,newData)
   console.log("order placed",result)
 }

   if (newData == null) return <h1>Loding....</h1>;

  return (
    <div className="container mt-5 text-center border border-black">
        <h1>{newData.name}</h1>
      <img src={newData.image} alt="" width="30%" style={{borderRadius:"10px"}} />
      <h1>Details</h1>
      <p>Price : Rs {newData.price}</p>
      <p>Category :  {newData.category}</p>
      {/* <p>ISBN Number {firebase.user.isbn}</p> */}

      <h1>Owner details</h1>

      <p>Name: {firebase.user.displayName} </p>
      <p>Email ID: {firebase.user.email} </p>
      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setQty(e.target.value)}
            value={qty}
            type="number"
            placeholder="Enter Qty"
          />
        </Form.Group>
      <button className="btn btn-sm btn-success" onClick={orderPlace}>Buy Product</button>
    </div>
  );
};

export default BookDetailsPage;
