const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator')
const fetchUser = require('../middlewares/fetchUser');
const User = require('../models/User');
const Blogs = require('../models/Blogs')

//ROUTE 1 - To fetch all the Blogs Posts
router.get('/fetchAllBlogs', fetchUser, async (req, res) => {
    try {
        //To retrieve logged in user's blog post only
        // const sendBlogs = await Blogs.BlogsSchema.find({ user_id: req.user.id })

        //To retrieve all the Blog Posts added by all the verified users
        const sendBlogs = await Blogs.BlogsSchema.find()
        res.status(200).json(sendBlogs)
    }
    catch (error) {
        console.log("Errr in fetchAllBlogs", error)
        res.status(500).json("Internal Server Error")
    }
})

//ROUTE 2 - To save blog posts added by logged in user
router.post('/createBlogPost', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('content', 'Enter a valid content').isLength({ min: 5 }),
    body('author', 'Enter an author').isLength({ min: 3 }),
], async (req, res) => {

    //If there are errors, return Bad request and the eerors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const blogs = await Blogs.BlogsSchema.create({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            user_id: req.user.id

        })
        res.status(200).json(blogs)
    }
    catch (error) {
        console.log("Errr in createBlogPost", error)
        res.status(500).json("Internal Server Error")
    }


})

//ROUTE 3 - To update the blog post modified by logged in user
router.put('/updateBlogPost/:id', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('content', 'Enter a valid content').isLength({ min: 5 }),
], async (req, res) => {

    //If there are errors, return Bad request and the eerors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        let blog = await Blogs.BlogsSchema.findById(req.params.id)
        if (!blog) {
            return res.status(404).send("Not Found")
        }
        //Prohibiting logged in user to delete other user's blog post
        if (blog.user_id.toString() !== req.user.id) {
            return res.status(401).send('Unauthorized')
        }
        let newObj = {}
        if (req.body.title) { newObj.title = req.body.title }
        if (req.body.content) { newObj.content = req.body.content }
        if (req.body.author) { newObj.tag = req.body.author }

        blog = await Blogs.BlogsSchema.findByIdAndUpdate(req.params.id, { $set: newObj }, { new: true })
         res.status(200).send(blog)
    }
    catch (error) {
        console.log(" Errr in updateBlogPost", error)
        res.status(500).json("Internal Server Error")
    }


})

//ROUTE 4 - To delete the blog post chosen by logged in user
router.delete('/deleteBlogPost/:id', fetchUser, async (req, res) => {
    try {
        let blog = await Blogs.BlogsSchema.findById(req.params.id)
        console.log("blog", blog)
        if (!blog) {
            return res.status(404).send("Not Found")
        }
        //Prohibiting logged in user to update other user's blog post
        if (blog.user_id.toString() !== req.user.id) {
            return res.status(401).send('Unauthorized')
        }

        blog = await Blogs.BlogsSchema.findByIdAndDelete(req.params.id)
        res.status(200).send("Blog post successfully deleted")
    }
    catch (error) {
        console.log("Errr in deleteBlogPost", error)
        res.status(500).json("Internal Server Error")
    }
})

module.exports = router;


