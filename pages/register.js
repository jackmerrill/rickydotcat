



import axios from 'axios';
import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel, Toast, Container } from "react-bootstrap";
import Cookies from 'universal-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function checkLogin() {
    const cookies = new Cookies();
    const key = cookies.get('key')
    if (key) {
        return window.location.replace("/")
    }
  }

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.post("https://api.ricky.cat/api/users/register", {
        username: username,
        email: email,
        password: password
    }).then(res => {
        const data = res.data
        if (data.error) {
            return toast.error(data.message, { position: "top-right", autoClose: 2500 })
        }
        const cookies = new Cookies();
        cookies.set('key', res.data.id, { path: '/' });
        toast.success("Successfully registered! Redirecting to login...", { position: "top-right", autoClose: 2500 })
        setTimeout(window.location.replace("/login"), 2500)
    })
  }

  checkLogin()

  return (
      <Container>
        <div className="Login">
        <ToastContainer />
        <form onSubmit={handleSubmit}>
            <FormGroup controlId="username">
            <FormLabel>Username</FormLabel>
            <FormControl
                autoFocus
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            </FormGroup>
            <FormGroup controlId="email">
            <FormLabel>Email</FormLabel>
            <FormControl
                autoFocus
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            </FormGroup>

            <FormGroup controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
            />
            </FormGroup>
            <Button block bsSize="large" disabled={!validateForm()} type="submit" style={{ marginBottom: "25px" }}>
            Register
            </Button>
        </form>
        </div>
      </Container>
  );
}