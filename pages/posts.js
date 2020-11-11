import { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Flex from 'react-bootstrap'
import Cookies from 'universal-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import React from 'react'
import Axios from 'axios'

class Posts extends Component {
    constructor(props) {
        super(props)

        this.votes = this.props.votes
    }

    checkLogin() {
        const cookies = new Cookies();
        const key = cookies.get('key')
        if (key) {
            return key
        } else {
            return false
        }
    }

    handleClick(id) {
        Axios.post("https://api.ricky.cat/api/posts/vote", {
            "postId": id
        }, {
            headers: {
                "Authorization": this.checkLogin()
            }
        }).then(res => {
            if (res.data.error) {
                return toast.error(res.data.message, { autoClose: 2500 })
            } else {
                return document.getElementById('votes').innerText = (this.votes + 1)+" votes"
            }
        })
    }

    render() {
        return <Container>
            <ToastContainer/>
            <Card>
                <Card.Img variant="top" src={this.props.img} />
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <div className="votes-container" style={{ display: "flex", alignItems: "baseline", flexDirection: "row" }}>
                        <Button variant="success" onClick={() => this.handleClick(this.props.id)}>+1</Button>
                        <p class="votes" id="votes">{this.votes} votes</p>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    }
}

export default Posts