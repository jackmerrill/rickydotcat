import Axios from 'axios';
import { Component } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class TableRow extends Component {
    constructor(props) {
        super(props)

        this.deletePost = this.deletePost.bind(this)
    }

    deletePost() {
        const cookies = new Cookies();
        const key = cookies.get('key')
        Axios.delete("https://api.ricky.cat/api/", {
            "postId": this.props.post_id,
            headers: {
                "Authorization": key
            }
        }).then(res => {
            const data = res.data

            if (data.error) {
                return toast.error(data.message, { autoClose: 2500 })
            }
            return toast.success(data.message, { autoClose: 2500 })
        })
    }

    render() {
        return <>
        <tr>
            <td>{this.props.data.post_title}</td>
            <td>{this.props.data.post_author}</td>
            <td>{this.props.data.post_img}</td>
            <td>{this.props.data.post_id}</td>
            <td>{this.props.data.post_votes}</td>
            <td><Button variant='success' href={"/posts/"+this.props.data.post_id}>View</Button><Button variant="danger" onClick={this.deletePost}>Delete</Button></td>
        </tr>
        </>
    }
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {posts: []};
    }

    checkLogin() {        
        const cookies = new Cookies();
        const key = cookies.get('key')
        if (key) {
            Axios.post("https://api.ricky.cat/api/users/isAdmin", {
                "id": key
            }).then(res => {
                const data = res.data
                if (!data.isAdmin) return window.location.replace("/")
            })
        }
    }

    
      componentDidMount() {
        Axios.get("https://api.ricky.cat/api/posts")
          .then(response => {
            this.setState({ posts: response.data })
          })
          .catch(err => {
            console.log(err)
          })
      }
    
    postList() {
        return this.state.posts.map(function(post, i) {
            return <TableRow data={post}></TableRow>
        })
    }
    

    render() {
        return <Container>
            <ToastContainer />
            <h1 style={{ fontWeight: "700" }}>Dashboard</h1>
            <h2 style={{ fontWeight: "600" }}>Posts</h2>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Image Path</th>
                    <th>ID</th>
                    <th>Votes</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.postList()}
                </tbody>
            </Table>
        </Container>
    }
}

export default Dashboard