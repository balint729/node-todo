//Lib imports
const express = require('express');
const bodyParse = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose.js')
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParse.json());

app.post('/todos', (req,res) =>{
    // console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    })
    todo.save().then((doc)=>{
        res.send(doc);
        console.log('Todo inserted ',doc);
    }, (err) =>{
        res.status(400).send();
        // res.send(err)
        // console.log('Unable to insert ', err);
    });

});

app.get('/todos', (req,res) =>{
    Todo.find().then((todos) =>{
        res.send({
            todos
        })
    }, (err) =>{
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req,res) =>{
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
       return res.status(404).send();
    }

    Todo.findById(id).then((todo) =>{
        if(!todo){
            res.status(404).send();
        }
        res.send({todo});

    }).catch((e) =>{
        res.status(400).send();
    })

});

app.delete('/todos/:id', (req,res) =>{
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(400).send();
    }

    Todo.findByIdAndRemove(id).then((result) =>{
        if(!result){
            res.status(400).send();
        }
        res.send({result});

    }).catch((e) =>{
        res.status(400).send();
    })


});




app.listen(port, ()=>{
    console.log(`Started on port ${port}`);
})

module.exports = {
    app
}