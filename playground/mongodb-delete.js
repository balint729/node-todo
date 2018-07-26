// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


//  v3MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
    if(err) return console.log('Unable to connect');
    console.log('Connected to database');

    //deleteMany
    // db.collection('Todos').deleteMany({text:'Eat lunch'}).then((result) =>{
    //     console.log(result);

    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text:'Eat lunch'}).then((result) =>{
    //     console.log(result);
    // });
    
    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) =>{
    //     console.log(result);
    // });

    //Users
    // db.collection('Users').deleteMany({name:'Andrew'}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5b587805f32c571618515c26')}).then((result) =>{
        console.log(result);
    })

    //  db.close();
   

});