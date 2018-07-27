var mongoose = require('mongoose');

var User = mongoose.model('User',{
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

module.exports = {
    User
}

// var newUser = new User({
//     email: 'balint729@gmail.com'
// });

// newUser.save().then((doc) =>{
//     console.log('User saved: ', doc);
// }, (err) =>{
//     console.log('Unable to save: ', err);
// });