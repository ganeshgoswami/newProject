import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/firebase";

const ListingPage = () =>{


    const firebase = useFirebase()

    const handleSubmit =(e)=>{
    e.preventDefault()
    firebase.handelCreateNewListing(name,isbnNumber,price,coverPic);
    }

    const [name,setName] = useState("")
    const [isbnNumber,setIsbnNumber] = useState("")
    const [price,setPrice] = useState("")
    const [coverPic,setCoverPic] = useState("")

    return (
        <div className="container mt-5">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Book Name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Book Name"
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              onChange={(e) => setIsbnNumber(e.target.value)}
              value={isbnNumber}
              type="number"
              placeholder="ISBN Number"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              type="text"
              placeholder="Enter Price"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              onChange={(e) => setCoverPic(e.target.files[0])}
              type="file"
              placeholder="Enter Image Path"
            />
          </Form.Group>



          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
};

export default ListingPage;