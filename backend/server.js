import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose'
import morgan from 'morgan'
import { Post, PostModel } from './models/Post.model.js';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import UserModel from './models/User.model.js';
import bcrypt from 'bcrypt'
import fs from 'fs'

dotenv.config({ path:"../.env" });

const app = express();
const PORT = 4000;

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan("common"))

app.use(fileUpload());

mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@localhost:27017/ricky?authSource=admin`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

mongoose.connection.on('open', function() {
    console.log("MongoDB database connection established successfully");
})

mongoose.connection.on('error', function(err) {
    console.log("Could not connect to the MongoDB server!")
    return console.log(err)
})

const postRouter = express.Router()
const userRouter = express.Router()

app.use('/api/posts', postRouter)
app.use('/api/users', userRouter)

const makeid = length => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

postRouter.get('/', async function(req, res) {
    PostModel.find(function(err, posts) {
        if (err) {
            console.log(err)
        } else {
            res.json(posts)
        }
    })
})

postRouter.get('/random', async function(req, res) {
    // Get the count of all users
    PostModel.count().exec(function (err, count) {

    // Get a random entry
    var random = Math.floor(Math.random() * count)

    // Again query all users but only fetch one offset by our random #
    PostModel.findOne().skip(random).exec(
        function (err, result) {
        // Tada! random user
        console.log(result) 
        })
    })
})

postRouter.post('/', async function(req, res) {
    if (!req.header("Authorization")) {
        return res.json({
            "error": true,
            "message": "Not logged in."
        })
    }
    const userExists = await UserModel.exists({
        _id: req.header("Authorization")
    })
    if (!userExists) {
        return res.json({
            error: true,
            message: "You are not signed in."
        })
    }
    req.files.image.mv("../public/post_img/"+req.files.image.name)
    let id = makeid(8)
    PostModel.create({
        post_title: req.body.title,
        post_img: "/post_img/"+req.files.image.name,
        post_author: req.header("Authorization"),
        post_id: id
    })
    res.json({
        error: false,
        message: id
    })
})

postRouter.delete('/', async function(req, res) {
    if (!req.header("Authorization") || req.header("Authorization") !== process.env.ADMIN_AUTHENTICATION) {
        return res.json({
            "error": true,
            "message": "Incorrect Authorization Credentials."
        })
    }
    const post = await PostModel.findOne({
        post_id: req.body.postId
    })
    fs.unlink("../public"+post.post_img, async (err) => {
        if (err) console.log(err)
        await post.remove()
        return res.json({
            error: false,
            message: "success"
        })
    })
})

postRouter.post('/vote', async function(req, res) {
    if (!req.header("Authorization")) {
        return res.json({
            "error": true,
            "message": "Not logged in."
        })
    }
    const userExists = await UserModel.exists({
        _id: req.header("Authorization")
    })
    if (!userExists) {
        return res.json({
            error: true,
            message: "You are not signed in."
        })
    }
    const postId = req.body.postId
    const hasVoted = await UserModel.exists({
        user_upvoted_posts: postId
    })
    if (hasVoted) {
        return res.json({
            error: true,
            message: "You have already voted for this post!"
        })
    }
    const post = await PostModel.findOneAndUpdate({ post_id: postId }, { $inc: { post_votes: 1 }})
    const user = await UserModel.findOneAndUpdate({
        _id: req.header("Authorization")
    }, {
        $push: {
            user_upvoted_posts: postId
        }
    })
    return res.json({
        error: false,
        message: "success"
    })
})

userRouter.get('/', async function(req, res) {
    if (!req.header("Authorization") || req.header("Authorization") !== process.env.ADMIN_AUTHENTICATION) {
        return res.json({
            "error": true,
            "message": "Incorrect Authorization Credentials."
        })
    }
})

userRouter.post('/register', async function(req, res) {
    bcrypt.hash(req.body.password, 10, async function(err, hash) {
        const user = await UserModel.create({
            user_name: req.body.username,
            user_email: req.body.email,
            user_password: hash
        })
        return res.json({
            "id": user._id
        })
    })
})

userRouter.post('/login', async function(req, res) {
    const userExists = await UserModel.exists({
        user_name: req.body.username
    })
    if (!userExists) {
        return res.json({
            error: true,
            message: "Account does not exist."
        })
    }
    const compareUser = await UserModel.findOne({
        user_name: req.body.username
    })
    bcrypt.compare(req.body.password, compareUser.user_password, function(err, same) {
        if (err) {
            console.log(err)
        } else {
            if (same) {
                return res.json({
                    "id": compareUser._id
                })
            } else {
                return res.json({
                    error: true,
                    message: "Incorrect Password."
                })
            }
        }
    })
})

app.listen(PORT, function() {
    console.log("API is now online on port " + PORT);
});