import mongoose from 'mongoose'
const Schema = mongoose.Schema;
let Post = new Schema({
    post_title: {
        type: String
    },
    post_author: {
        type: mongoose.Types.ObjectId
    },
    post_img: {
        type: String
    },
    post_id: {
        type: String
    },
    post_votes: {
        type: Number,
        default: 0
    }
});
let PostModel = mongoose.model('Post', Post);
export {Post, PostModel}