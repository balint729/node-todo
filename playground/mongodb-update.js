// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


//  v3MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
    if(err) return console.log('Unable to connect');
    console.log('Connected to database');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b599e33d8186753a94c4528')
    // },{
    //     $set: {
    //     completed:true
    // }}, {
    //     returnOriginal:false
    // }).then((result) => {
    //     console.log(result);
    // })
    
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b59adb9d8186753a94c47f5')
    }, {
        $set:{
            name:'Albert'
        },
        $inc:{
            age: 1
        }

    },
    {
        returnOriginal:false
    }).then((result) =>{
        console.log(result);
    });



    //  db.close();
   

});