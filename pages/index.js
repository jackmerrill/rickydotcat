import { Component } from 'react'
import Post from './layouts/Post.layout'
import { Row, Col, Container } from 'react-bootstrap'
import axios from 'axios';


class Index extends Component {
  
  constructor(props) {
    super(props);
    this.state = {posts: []};
  }

  componentDidMount() {
    axios.get("http://localhost:4000/api/posts")
      .then(response => {
        this.setState({ posts: response.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  postList() {
    return this.state.posts.map(function(post, i) {
      return <Col style={{ marginBottom: "12px" }}><Post title={post.post_title} img={post.post_img} votes={post.post_votes} id={post.post_votes} /></Col>
    })
  }

  render() {

    return <>
    <Container>
      <main style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
        <h1 style={{ fontFamily: "Montserrat", fontWeight: "bolder" }}>Welcome to Ricky.CAT!</h1>
      </main>
      <Row xl="2" lg="2" md="2" sm="1" xs="1">
        {this.postList()}
      </Row>

    </Container>
    </>
  }
}

export default Index