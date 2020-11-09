import Head from 'next/head';

import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => (
    <div style={{
        marginBottom: '5%'
    }}>
        <Head>
            <title>Ricky.CAT</title>
            <link rel='icon' href='./favicon.ico' />
        </Head>
        <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ fontFamily: "Montserrat" }}>
            <Container>
                <Navbar.Brand href="/" style={{ fontWeight: 800 }}>
                    <img
                        alt=""
                        src="/logo.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Ricky.CAT
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="container-fluid">
                        <Nav.Link href="/" style={{ fontWeight: 600 }}>Home</Nav.Link>
                        <Nav.Link href="/about" style={{ fontWeight: 600 }}>About</Nav.Link>
                        <Nav.Link href="/api" style={{ fontWeight: 600 }}>API</Nav.Link>
                        <Nav.Link href="/login" className="ml-auto" style={{ fontWeight: 600 }}>Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
)

export default Header