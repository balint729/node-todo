const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');
 
beforeEach(populateUsers);
beforeEach(populateTodos);


describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });

});

describe('GET/todos', () =>{
    it('should get all todos', (done) =>{
      request(app)
      .get('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((result) =>{
          expect(result.body.todos.length).toBe(1);
      })
      .end(done);
    });
});

describe('GET/todos/:id', ()=>{

    it('should return TODO doc', (done) =>{
      request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((response) =>{
          expect(response.body.todo.text).toBe(todos[0].text)
        }).end(done);



    });

    it('should not return TODO doc created by other user', (done) =>{
      request(app)
        .get(`/todos/${todos[1]._id.toHexString()}`)
        .set('x-auth', users[0].tokens[0].token)
        .expect(404)
        .end(done);
    });

    it('should return a 404 if todo not found', (done) =>{
      var id = new ObjectID();
      request(app)
        .get(`/todos/${id.toHexString()}`)
        .set('x-auth', users[0].tokens[0].token)
        .expect(404)
        .end(done);

    });

    it('should return 404 if non-object id requested', (done) =>{
      request(app)
        .get(`/todos/123`)
        .set('x-auth', users[0].tokens[0].token)
        .expect(404)
        .end(done);


    });

});

describe('DELETE todos/:id', () =>{
  it('should remove a todo', (done) =>{
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(200)
      .expect((res) =>{
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err,res) =>{
        if(err){
          return done(err);
        }
        
        Todo.findById(hexId).then((todo) =>{
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e)
          );
      
        });
      });


  it('should not remove a todo if its creator is not the user', (done) =>{
    var hexId = todos[0]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end((err,res) =>{
        if(err){
          return done(err);
        }
        
        Todo.findById(hexId).then((todo) =>{
          expect(todo).toExist();
          done();
        }).catch((e) => done(e)
          );
      
        });
      });



  it('should return 404 if todo not found', (done) =>{
    var id = new ObjectID();
    request(app)
      .delete(`/todos/${id.toHexString()}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done);
  
      });
  
      
  it('should return 404 if objectid is invalid', (done) =>{

    request(app)
    .delete(`/todos/123`)
    .set('x-auth', users[1].tokens[0].token)
    .expect(404)
    .end(done);


  }); 

  });

describe('PATCH /:id', (() =>{

  it('should update a todo if found', (done) =>{
    var id = todos[0]._id.toHexString();
    var text = "Walk the dog";

    request(app)
      .patch(`/todos/${id}`)
      .set('x-auth', users[0].tokens[0].token)
      .send({
        text,
        completed: true
        })
      .expect(200)
      .expect((result) =>{
        expect(result.body.todo.text).toBe(text);
        expect(result.body.todo.completed).toBe(true);
        expect(result.body.todo.completedAt).toBeA('number');
      }).end(done);
  });

  it('should not update a todo if creator is not the current user', (done) =>{
    var id = todos[0]._id.toHexString();
    var text = "Walk the dog";

    request(app)
      .patch(`/todos/${id}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({
        text,
        completed: true
        })
      .expect(404)
      .end(done);



  });

  it('should clear completedat if completed is false', (done) =>{
    var id = todos[1]._id.toHexString();
    var text = "Walk the dog";

    request(app)
      .patch(`/todos/${id}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({"text" : text, completed: false })
      .expect(200)
      .expect((result) =>{
        expect(result.body.todo.text).toBe(text);
        expect(result.body.todo.completed).toBe(false);
        expect(result.body.todo.completedAt).toNotExist();
        
      }).end(done);



    }); 
  })
);

    

describe('GET users/me', (() =>{
  it('should return user if authenticated ', ( done ) =>{
    request(app)
    .get('/users/me')
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .expect((res) =>{
      expect(res.body._id).toBe(users[0]._id.toHexString());
      expect(res.body.email).toBe(users[0].email);
    }).end(done);
  });

  it('should return 401 if not auth', (done) =>{
    request(app)
    .get('/users/me')
    .expect(401)
    .expect((res) =>{
      expect(res.body).toEqual({});
    }).end(done);
  });

})
);

describe('POST /users', () =>{
  it('should add new user ', (done) =>{
    var email = 'asd@asd.com';
    var password = '123asd!';

    request(app)
    .post('/users')
    .send({email, password})
    .expect(200)
    .expect((res) =>{
      expect(res.headers['x-auth']).toExist();
      expect(res.body._id).toExist();
      expect(res.body.email).toBe(email);
    })
    .end((err) =>{
      if(err) {
        return done(err);
      }

      User.findOne({email}).then((user) =>{
        expect(user).toExist();
        expect(user.password).toNotBe(password);
        done();

      }).catch((e) => done(e));
    });

  });

  it('should return validation errors if request invalid', (done) =>{
    var email = 'asdasd.com';
    var password = '123asd!';

    request(app)
    .post('/users')
    .send({email,password})
    .expect(400)
    .end(done);


  });

  it('should not create user if email already in use', (done) =>{
    var password = '123asd!';

    request(app)
    .post('/users')
    .send({email: users[0].email,password})
    .expect(400)
    .end(done);


  });

});

describe('POST users/login', () =>{
  it('should login the user and return token', (done) =>{
    request(app)
    .post('/users/login')
    .send({
      email: users[1].email,
      password: users[1].password
    })
    .expect(200)
    .expect((result) =>{
      expect(result.headers['x-auth']).toExist();
    }).end((err,res) =>{
      if(err){
        return done(err);
      }

      User.findById(users[1]._id).then((user) =>{
        expect(user.tokens[1]).toInclude({
          access: 'auth',
          token: res.headers['x-auth']
        });
        done();
      }).catch((e) => done(e));

    })


    
  });

  it('should reject invalid login', (done) =>{
    request(app)
    .post('/users/login')
    .send({
      email: users[1].email,
      password: users[1].password+'1'
    })
    .expect(400)
    .expect((result) =>{
      expect(result.headers['x-auth']).toNotExist();
    }).end((err, res) =>{
      if(err){
        return done(err);
      }

      User.findById(users[1]._id).then((user) =>{
        expect(user.tokens.length).toBe(1);
        done();
      }).catch((e) => done(e)) ;

    })


   
  });

});


describe('DELETE /users/me/token', () =>{
  it('should remove auth token on logout', (done) =>{
    request(app)
    .delete('/users/me/token')
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .end((err,res) =>{
      if(err){
        return done(err);
      }
  
      User.findOne({email: users[0].email}).then((user) =>{
        expect(user.tokens.length).toBe(0);
        done();
      }).catch((e) => done(e));
  
    });
  })

});

