import { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Flex from 'react-bootstrap'

import React from 'react'

class Post extends Component {
    handleClick(id) {
        console.log(id)
    }

    render() {
        return <Card>
            <Card.Img variant="top" src={this.props.img} />
            <Card.Body>
                <Card.Title>{this.props.title}</Card.Title>
                <div className="votes-container" style={{ display: "flex", alignItems: "baseline", flexDirection: "row" }}>
                    <Button variant="success" onClick={() => this.handleClick(this.props.id)}>+1</Button>
                    <p class="votes">{this.props.votes} votes</p>
                </div>
            </Card.Body>
        </Card>
    }
}

export default Post