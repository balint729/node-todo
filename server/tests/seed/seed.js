const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const todos =[{
    text:'first test',
    _id: new ObjectID()
}, {
    text: 'second test',
    _id: new ObjectID(),
    completed: true,
    completedAt : 333
}];

const userOneId = new ObjectID();
const  userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: 'balint@gmail.com',
    password: 'newPass',
    tokens:[{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'  }, 'abc123', ).toString()
    }]
},{
    _id: userTwoId,
    email: 'asd@example.com',
    password: 'newPass2'
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

