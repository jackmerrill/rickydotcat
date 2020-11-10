import axios from 'axios';
import { Component } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import Cookies from 'universal-cookie';

class Login extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            username: "",
            password: ""
        }
    }

    login() {
        axios.post("http://localhost:4000/api/users/login", {
            username: this.state.username,
            password: this.state.password
        }).then(res => {
            const data = res.data
            if (data.error) {
                return <Alert variant="danger" dismissible>
                <p>
                    {data.message}
                </p>
              </Alert>
            }
            const cookies = new Cookies();
            cookies.set('key', res.data.id, { path: '/' });
        })
    }

    handleUsernameChange(e){
        this.setState({ username: e.target.value })
    }

    handlePasswordChange(e){
        this.setState({ password: e.target.value })
    }

    render() {
        return <Container>
            <h1 style={{ fontWeight: "700" }}>Login</h1>
            <Form onSubmit={this.login()}>
            <Form.Group controlId="loginForm">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" name="username" onChange={this.handleUsernameChange.bind(this)}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" onChange={this.handlePasswordChange.bind(this)}/>
            </Form.Group>
            <Button variant="primary" type="button" onClick={function(e){ this.login() }} style={{ marginBottom: "25px"}}>
                Submit
            </Button>
            </Form>
        </Container>
    }
}

export default Login