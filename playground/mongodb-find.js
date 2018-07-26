// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


//  v3MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
    if(err) return console.log('Unable to connect');
    console.log('Connected to database');

    // db.collection('Todos').find().toArray().then((docs) =>{

    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined,2));
    // }, (err)=>{
    //     console.log('Unable to fetch ', err);
    // })

    // db.collection('Todos').find().count().then((count) =>{

    //     console.log(`Todos count: ${count}`);
       
    // }, (err)=>{
    //     console.log('Unable to fetch ', err);
    // })

    db.collection('Users').find({name:'Andrew'}).toArray().then((docs) =>{
        console.log('Users');
        console.log(JSON.stringify(docs, undefined,2));

    }, (err) => {
        console.log('Unable to fetch  ', err);

    })
  
  
    // db.close();
   //v3 client.close();

});