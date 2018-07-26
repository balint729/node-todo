// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


//  v3MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
    if(err) return console.log('Unable to connect');
    console.log('Connected to database');

    // v3: const db = client.db('Todos');
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err,result) =>{
    //     if(err) return console.log('Unable to insert');

    //     console.log(JSON.stringify(result.ops, undefined,2));


    // });


    // db.collection('Users').insertOne({
    //     name: 'Flóra',
    //     age: 22,
    //     location: 'Budapest'
    // }, (err, result) =>{
    //     if(err) return console.log('Unable to insert');

    //     // console.log(JSON.stringify(result.ops, undefined , 2));
    //     console.log(result.ops[0]._id.getTimestamp());


    // });

    db.close();
   //v3 client.close();

});