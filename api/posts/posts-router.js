// implement your posts router here
const express = require('express')
const router = express.Router()
const Post = require('./posts-model')

router.get('/', (req, res) => {
Post.find(req.query)
.then(found => {
    res.status(200).json(found)
})
.catch(err => {
    res.status(500).json({
        message: "The posts information could not be retrieved"
    })
})
})

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            res.status(404).json({
                message: 'The post with the specified ID does not exist',
            })
        } else {
            res.json(post)
        }
    } catch (err) {
        res.status(500).json({
            message: "The posts information could not be retrvied",
        })
    }
})

router.post('/', (req, res) => {
    const {title, contents} = req.body
    if (!title || !contents) {
      res.status(400).json({
          meswsage: 'Please provide title and contents for the post.'
      })  
    } else {
        Post.insert({ title, contents })
        .then(id => {
           return Post.findById(id)
        })
        .then(post => {
        res.status(201).json(post)    
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the post to the database",
                err: err.message,
                stack: err.stack
            })
        })
    }
})

router.put('/', (req, res) => {
    
})

router.delete('/:id', async (req, res) => {
    try {
        const maybe = await Post.findById(req.params.id)
        if(!maybe) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "The post could not be removed",
            err: err.message,
            stacK: err.stack,
        })
    }
})

router.get('/:id/comments', (req, res) => {
    
})


module.exports = router