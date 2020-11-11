import Head from 'next/head';
import { Component } from 'react';
import Cookies from 'universal-cookie'
import { Navbar, Nav, Container, Dropdown, NavItem, NavLink } from 'react-bootstrap'
import Axios from 'axios'


class UserNavbar extends Component {
    constructor(props) {
        super(props)

        this.logout = this.logout.bind(this)
    }

    logout() {
        const cookies = new Cookies();
        cookies.remove('key')
        return window.location.replace("/");
    }

    render() {
        return <Nav.Link onClick={this.logout} className="ml-auto" style={{ fontWeight: 600 }}>Logout</Nav.Link>
    }
}

class GuestNavbar extends Component {
    render() {
        return <Nav.Link href="/login" className="ml-auto" style={{ fontWeight: 600 }}>Login</Nav.Link>
    }
}


class Header extends Component {

    checkLogin() {
        const cookies = new Cookies();
        const key = cookies.get('key')
        if (key) {
            return <UserNavbar />
        } else {
            return <GuestNavbar />
        }
    }
    

    render() {
        return <>
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
                                <Nav.Link href="https://github.com/jackmerrill/Ricky.CAT/tree/master/docs" style={{ fontWeight: 600 }}>API</Nav.Link>
                                {this.checkLogin()}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    }
}

export default Header