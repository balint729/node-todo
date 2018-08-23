var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text:{
        type:String,
        required: true,
        trim:true,
        minlength:1
    },
    completed:{
        type:Boolean,
        default: false
    },
    completedAt:{
        type:Number,
        default: null
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    }

});

module.exports = {
    Todo
}

// var newTodo = new Todo({
//     text:'Cook dinner'
// });

// newTodo.save().then((doc) =>{
//     console.log('Success: ', doc, 'inserted');
// }, (err) =>{
//     console.log('unable to save ', err);
// });


// var newTodo2 = new Todo({
//     text:'  Talk this way   ',
    
// });

// newTodo2.save().then((doc) =>{
//     console.log('Todo saved: ', doc);

// }, (err) => {
//     console.log('Unable to save: ', err);
// });