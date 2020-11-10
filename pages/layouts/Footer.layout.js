import { Component } from 'react';

import { Container, Nav, Navbar } from 'react-bootstrap'

class Footer extends Component {
    render() {
        return <Navbar expand="lg" variant="dark" bg="dark" sticky="bottom">
            <Container>
                <div className="footer">
                    Made with <span class="heart">❤</span> in the Windy City
                    <br/>
                    Copyright 2020 © <a href="https://jackmerrill.com">Jack Merrill</a>
                </div>
            </Container>
        </Navbar>
    }
}

export default Footer