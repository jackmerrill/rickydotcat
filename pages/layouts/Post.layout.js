import { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import React from 'react'

class Post extends Component {
    render() {
        return <Card>
            <Card.Img variant="top" src={this.props.img} />
            <Card.Body>
                <Card.Title>{this.props.title}</Card.Title>
                <Button variant="success">+1</Button>
            </Card.Body>
        </Card>
    }
}

export default Post