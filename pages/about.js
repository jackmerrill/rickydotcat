import { Component } from 'react';
import { Container } from 'react-bootstrap';

class About extends Component {
    render() {
        return <Container>
            <h1 style={{ fontWeight: "700" }}>About</h1>
            <p>I created Ricky.CAT as a way for me to show off my cat, and to just show off my skills.</p>
            <p>Ricky.CAT is created using a MERN stack (MongoDB, ExpressJS, React.JS, Node.JS) and is fully open source on <a href="https://github.com/jackmerrill/Ricky.CAT">GitHub.</a></p>
            <p>I don't have much else to put here, I just hope you enjoy the website!</p>
        </Container>
    }
}

export default About