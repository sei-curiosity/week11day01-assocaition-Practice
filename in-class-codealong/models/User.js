const mongoose = require('mongoose')
const Schema = mongoose.Schema

// embedded document schema comes first(TweetSchema)
const TweetSchema = new Schema ({
    tweetText: {
        type: String
    }
}, {timestamps: true})

//the top schema which holds the embedded document (UserSchema)
const UserSchema = new Schema ({
    name: {
        type: String,
        default: "Invalid User"
    },
    tweets: [TweetSchema]
})

//* Models referencing singluar instance of my model (User, Tweet) and using
//* Respective schama
const TweetModel = mongoose.model("Tweet", TweetSchema)
const UserModel = mongoose.model("User", UserSchema)


//exporting the model to be used in the controller
module.exports = {UserModel, TweetModel}