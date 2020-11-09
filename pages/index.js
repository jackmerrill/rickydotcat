import { Component } from 'react'
import Post from './layouts/Post.layout'
import { Row, Col, Container } from 'react-bootstrap'


class Index extends Component {


  render() {
    const items = [];
    for (let index = 0; index < 10; index++) {
      items.push(<Col style={{ marginBottom: "12px" }}><Post title={index} img="https://ricky.cat/posts/TORWWQYC" /></Col>)
    }
    return <>
    <Container>
      <main style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
        <h1 style={{ fontFamily: "Montserrat", fontWeight: "bolder" }}>Welcome to Ricky.CAT!</h1>
      </main>
      <Row xl="2" lg="2" md="2" sm="1" xs="1">
        {items}
      </Row>

    </Container>
    </>
  }
}

export default Index