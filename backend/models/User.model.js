import mongoose from 'mongoose'
const Schema = mongoose.Schema;
let User = new Schema({
    user_name: {
        type: String,
    },
    user_email: {
        type: String,
    },
    user_password: {
        type: String
    },
    user_posts: {
        type: [String]
    },
    user_upvoted_posts: {
        type: [String]
    },
    user_permissions: {
        type: [String],
        default: ""
    },
    user_webhook: {
        type: String
    }
});

export default mongoose.model('User', User);