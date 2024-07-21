import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./login.css";

const LoginPage = () => {
  const firebase = useFirebase();
  // console.log(firebase);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("login user");
    navigate("/home");
    const result = await firebase.signInUserEmailAndPassword(email, password)
    // console.log("Successfull", result);
  };

  useEffect(() => {
    if (firebase.isLoggedIn) {
      // navigate to Home
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [firebase, navigate]);

  // useEffect(()=>{
  //   if(email.indexOf("@.com")==-1) setError("Correct your Email Address");
  //  else if(password.length < 8) setError("Password has not eight Correcter")

  // },[])
  

  return (
    <div className="container mt-5 w-50">
      <Card className="card-background d-flex justify-content-center shadow p-3 mt-5 bg-body-tertiary rounded">
        <Form onSubmit={handleSubmit} className="">
          <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
            <Form.Label className="text-white">Email address</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3 col-6" controlId="formBasicPassword">
            <Form.Label className="text-white">Password</Form.Label>
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
            <Button
              variant="primary"
              type="submit"
              disabled={email.indexOf("@gmail.com") == -1}
            >
              Login
            </Button>
          <Button
          variant="danger"
            onClick={firebase.signInWithGoogle}
          >
            Login With Google
          </Button>
            <p className="text-white" onClick={() => navigate("/register")}>
              Register 
            </p>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
