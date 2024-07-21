import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const firebase = useFirebase();
  // console.log(firebase);
 const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(()=>{
    if(firebase.isLoggedIn) {
        // navigate to Home
        navigate("/")
    }
  },[firebase,navigate])


 const handleSubmit = async (e) =>{
    
    e.preventDefault();
    // console.log("Sign up a user.....")
    navigate("/login")
    const result = await firebase.signUpUserEmailAndPassword(email,password);
  // console.log("Successfull",result)
    
  }

  return (
    <div className="container mt-5 d-flex justify-content-center align-middle">
      <Form  className="card-background row">
        <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 col-6" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
     <div className="d-flex justify-content-between">
     <Button variant="primary" type="submit" className="" onClick={handleSubmit}>
          Create User
        </Button>
        <Button variant="primary" onClick={()=>navigate("/login")}>
         Login with Email
        </Button>
     </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
