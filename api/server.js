// BUILD YOUR SERVER HERE

const users = require('./users/model.js')
const express = require('express')

const server = express()

server.use(express.json())
//GET    | /api/users     | Returns an array users.
server.get('/api/users', (req,res)=>{
    users.find()
        .then(result=>{
            result == null ? res.status(500).send({message:"The users information could not be retrieved"}) : res.send(result)
        })
})

//| GET    | /api/users/:id | Returns the user object with the specified `id`.    
server.get('/api/users/:id', (req,res)=>{
    users.findById(req.params.id)
        .then(result=>{
            result == null ? res.status(404).send({ message: "The user with the specified ID does not exist" }) : res.send(result)
        })
        .catch(error=>{
            res.status(500).send({message:"The users information could not be retrieved"})
        })
})

//POST| /api/users| Creates a user using the information sent inside the `request body`.                                   |                                                                    |
server.post('/api/users', (req,res)=>{
    console.log(req.body)
    const {name, bio} = req.body
    if(!name || !bio){
        res.status(400).send({ message: "Please provide name and bio for the user" })
    }else{
        users.insert(req.body)
        .then(result=>{
            return res.status(201).send(result)
        })
        .catch(error=>{
            res.status(500).send({ message: "There was an error while saving the user to the database" })
        })
    }
})

// /DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
server.delete('/api/users/:id', (req,res)=>{
    users.remove(req.params.id)
        .then(result=>{
            result == null ? res.status(404).send({ message: "The user with the specified ID does not exist" }) : res.send(result)
        })
        .catch(error=>{
            res.status(500).send({ message: "The user could not be removed" })
        })
})

//PUT|/api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |
server.put('/api/users/:id', (req,res)=>{
    const {name, bio} = req.body
    if(!name || !bio){
        res.status(400).send({ message: "Please provide name and bio for the user" })
    }else{
        users.update(req.params.id, req.body)
            .then(result=>{
                result == null ? res.status(404).send({ message: "The user with the specified ID does not exist" }) : res.send(result)
            })
            .catch(error=>{
                res.status(500).send({ message: "The user information could not be modified" })
            })
    }
})




module.exports = server; // EXPORT YOUR SERVER instead of {}
