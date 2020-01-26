const router = require('express').Router() //declaring my router
const {UserModel, TweetModel} = require('../models/User')

router.get('/', (req, res) => {
    res.send({url: req.originalUrl})
})

//!index: showing all users in my DB
router.get('/users', (req, res) => {
    UserModel.find({})
    .then((users) => {
        res.send({
            users: users
        })
    })
})

//!index for our tweets: showing all tweets by a user in my DB
router.get('/users/:userid/tweets', (req, res) => {
    const userid = req.params.userid
    UserModel.findById(userid)
    .then((user) => {
        res.send({
            tweets: user.tweets
        })
    })
})

//! show: showing a specific user in my DB

router.get('/users/:userid', (req, res)=> {
const userid = req.params.userid
UserModel.findById(userid)
.then((user) => {
    res.send({
        user: user
    })
})
.catch(err => console.log(err))
})

//! show a specific tweet by a specific user
router.get('/users/:userid/tweets/:tweetid', (req, res)=> {
    const userid = req.params.userid
    const tweetid = req.params.tweetid
    UserModel.findById(userid)
    .then((user) => {
        const currentTweet = user.tweets.find(x => x._id == tweetid)
        res.send({
            tweet: currentTweet
        })
    })
})

//! Create new user 
router.post('/users', (req, res)=> {
    const newUser = req.body
    let createUser  = new UserModel(
        {"name": newUser.name, "tweets": newUser.tweets} //newUser
    )
    createUser.save()
    .then((user)=> {
        res.redirect(`/users/${user._id}`)
    })
    .catch(err => console.log(err))
})

//! Create a new tweet for a specific user
router.post('/users/:userid', (req, res)=> {
const userid = req.params.userid
const newTweet = req.body
const createTweet = new TweetModel ({"tweetText": newTweet.tweetText})
UserModel.findById(userid)
.then((user)=> {
    user.tweets.push(createTweet)
    return user
})
.then (user => user.save())
.then((savedUserWithNewTweet)=> {
    res.redirect(`/users/${userid}`)
})
.catch(err => console.log(err))
})

//!update a user
router.put('/users/:userid', (req, res)=> {
const userid = req.params.userid
const updatedUser = req.body
UserModel.findByIdAndUpdate(userid, updatedUser)
.then((user)=> {
    res.redirect(`/users/${userid}`)
})
.catch(err=> console.log(err))
})

//! update a specific tweet by a specific user
router.put('/users/:userid/tweets/:tweetid', (req, res)=> {
    const userid = req.params.userid
    const tweetid = req.params.tweetid
    const updatedTweet = req.body
    UserModel.findById(userid)
    .then((user)=> {
        let index = user.tweets.findIndex(x => x._id == tweetid)
        user.tweets[index].tweetText = updatedTweet.tweetText
        return user
    })
    .then((user) => user.save())
    .then((user) => res.redirect(`/users/${userid}/tweets/${tweetid}`))
    .catch(err => console.log(err))
})

//! delete a user

router.delete('/users/:userid', (req, res)=> {
const userid = req. params.userid
UserModel.findByIdAndDelete(userid)
.then(()=> res.redirect('/users'))
.catch(err => console.log(err))
})

//!delete a specific tweet by a specific user
router.delete('/users/:userid/tweets/:tweetid', (req, res) => {
    const userid = req.params.userid
    const tweetid = req.params.tweetid
    UserModel.findById(userid)
    .then ((user) => {
        let index = user.tweets.findIndex(x => x._id == tweetid)
        if(index > -1) {
            user.tweets.splice(index, 1)
        }
        return user
    })
    .then(user => user.save())
    .then(()=> res.redirect(`/users/${userid}/tweets`))
    .catch(err => console.log(err))
})


module.exports = router