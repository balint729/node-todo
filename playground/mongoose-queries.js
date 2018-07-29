const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// var id = '5b5ddf5acd274fe828d73bbd';
// var id = '6b5ddf5acd274fe828d73bbd';

var userId = '5b5ae606b0727a2424dad3c5';

// if(!ObjectID.isValid(id)){
//     console.log('ID is not valid');
// }

// Todo.find({
//     _id:id //Converted by mongoose
// }).then((todos) =>{
//     console.log(todos);
// });

// Todo.findOne({
//     _id:id 
// }).then((todo) =>{
//     console.log(todo);
// });

// Todo.findById(id).then((todo) =>{
//     if(!todo){
//         return console.log('Unable to find that id');
//     }
//     console.log(todo);
// }).catch((e) =>{
//     console.log(e);
// });


User.findById(userId).then((user) =>{
    if(!user){
        return console.log('User not found');
    }
    console.log(user);

}).catch((e) => console.log(e));