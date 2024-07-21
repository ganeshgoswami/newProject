import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { IoCartOutline } from "react-icons/io5";

const MyNavbar = () => {
  const [URL, setUrl] = useState(null);
  const firebase = useFirebase();
  const navigate = useNavigate();

  const loggedOutUser = () => {
    firebase.loggedOut();
    navigate("/");
  };

  const url   = firebase.user.providerData[0].photoURL;

//  setUrl(firebase.user.providerData[0].photoURL)

//   console.log(firebase.user.providerData[0].photoURL);
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      {/* <p>
        <BsFillPersonFill className="text-success" />
          <span className="text-white">{firebase.user.displayName}</span>
          </p> */}
      <Container>
        {!url ? <BsFillPersonFill className="text-success rounded-circle" />
        :<img src={url} alt="" className="rounded-circle"  width="35px"/>}
        <Nav.Link href="/home" className="text-info me-4">
          {firebase.user.email}
        </Nav.Link>

        <Navbar.Brand href="/home">Store</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/book/list">Add List</Nav.Link>
          <Nav.Link href="/book/orders">Orders</Nav.Link>
          <Nav.Link href="/"><IoCartOutline /></Nav.Link>
        </Nav>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => loggedOutUser()}
        >
          Logged Out
        </button>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
