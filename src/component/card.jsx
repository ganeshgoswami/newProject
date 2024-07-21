import React, { useEffect, useState } from "react";
import "../pages/login.css"
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../context/firebase";
import {useNavigate} from "react-router-dom";

const BooksCard = (props) => {

  const navigate = useNavigate()
    // const [URL,setUrl] = useState(null);
    // const firebase = useFirebase();
    // useEffect(()=>{
    //    firebase.getImageUrl(props.imageUrl).then((url)=>setUrl(url))
    // },[])
    // console.log(URL)
  return (
  <div className="container">
      <div className="card mb-3 shadow p-3 mb-5 bg-body-tertiary rounded">
    <div className="row">
      <div className="col-md-4">
        <img src={props.image} alt="" width="30%" className="m-2  inOut" />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title " style={{ color: "#dd09f1",  textShadow: "1px 2px 2px #000000"}}>{props.title}</h5>
          <p className="card-text">{props.description}</p>
          <p className="card-text">Price : {props.price} <del className="text-danger">{(+props.price) + 20}</del></p>
          <p className="text-success">Rating :{props.rating.rate} / 5</p>
        </div>
      </div>
    </div>
    <div className="text-center">
    <button className="btn btn-sm btn-primary col-4" onClick={()=>navigate(`/book/view/${props.id}`)}> Add to Cart</button>
    </div>
  </div>
  </div>
  );
};

export default BooksCard;
