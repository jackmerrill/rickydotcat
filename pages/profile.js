import Axios from 'axios';
import { Component, useState } from 'react';
import { Container, FormControl, Button } from 'react-bootstrap';
import Cookies from 'universal-cookie';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = { webhook: '' }
        this.userDetails = this.getUser.bind(this)
        this.updateHook = this.updateWebhook.bind(this)
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

    getUser() {
        const cookies = new Cookies();
        const key = cookies.get('key')
        if (key) {
            Axios.post('https://api.ricky.cat/api/users/id', {
                id: key
            }).then(res => {
                return res.data
            })
        } else {
            return null
        }
    }

    updateWebhook() {
        const cookies = new Cookies();
        const key = cookies.get('key')
        if (key) {
            Axios.patch('https://api.ricky.cat/api/users/id', {
                id: key,
                url: this.state.webhook
            }).then(res => {
                return res.data
            })
        } else {
            return null
        }
    }

    webhookChangeHandler = (event) => {
        this.setState({ webhook: event.target.value })
    }

    render() {
        return <Container>
            <h1 style={{ fontWeight: "700" }}>Your Profile</h1>
            <h2 style={{ fontWeight: "700" }}>API Key</h2>
            <FormControl type="text" value={this.checkLogin()} disabled={true} />
            <h2 style={{ fontWeight: "700" }}>Discord Webhook URL</h2>
            <FormControl type="text" value={this.userDetails.user_webhook} onChange={this.webhookChangeHandler} style={{ marginBottom: "25px" }}/>
            <Button type="button" variant="success" style={{ marginBottom: "25px" }} onClick={this.updateHook}>Update Webhook</Button>
        </Container>
    }
}

export default Profile