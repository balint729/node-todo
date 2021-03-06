const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const  userTwoId = new ObjectID();

const todos =[{
    text:'first test',
    _id: new ObjectID(),
    _creator: userOneId
}, {
    text: 'second test',
    _id: new ObjectID(),
    completed: true,
    completedAt : 333,
    _creator: userTwoId
}];

const users = [{
    _id: userOneId,
    email: 'balint@gmail.com',
    password: 'newPass',
    tokens:[{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'  }, process.env.JWT_SECRET, ).toString()
    }]
},{
    _id: userTwoId,
    email: 'asd@example.com',
    password: 'newPass2',
    tokens:[{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'  }, process.env.JWT_SECRET, ).toString()
    }]
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
      return Todo.insertMany(todos);
     }).then(() => done());
  }

const populateUsers = (done) =>{
    User.remove({}).then(() =>{
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne,userTwo])
    }).then(() =>done());
}


module.exports = {
    todos,
    populateTodos, 
    users,
    populateUsers
}

