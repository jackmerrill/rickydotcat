import { Component } from 'react';

import { Container, Nav, Navbar } from 'react-bootstrap'

class Footer extends Component {
    render() {
        return <Navbar expand="lg" variant="dark" bg="dark" sticky="bottom">
            <Container>
                <div style={{ textAlign: "center" }}>
                    <h3>Made with Love</h3>
                </div>
            </Container>
        </Navbar>
    }
}

export default Footer