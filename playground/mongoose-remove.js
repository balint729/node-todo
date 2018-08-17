const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

/* Todo.remove({}).then((result) =>{
    console.log(result);
});
 */

 Todo.findByIdAndRemove('5b7549863d5b534af0a12649').then((res) =>{
     console.log(res);
 })