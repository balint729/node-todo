const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = "asdasdasd";

// bcrypt.genSalt(10, (err,salt) =>{
//     bcrypt.hash(password, salt, (error, hash) =>{
//         console.log(hash);
//     });

// });

var hashedPw = "$2a$10$tIINKEB.02xx30laSkNigeU0lCxGN5ZUGAZz9MF5Z1GKFq1c0Y7uO";
bcrypt.compare(password, hashedPw, (err, res) =>{
    console.log(res);

});

// var data ={
//     id:10
// };

// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log(decoded);
// var msg = 'Hello World';
// var hashMsg = SHA256(msg).toString();

// console.log(hashMsg);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if(resultHash === token.hash){
//     console.log('Data was not changed');
// }else{
//     console.log('Data was changed. Do not trust!');
// }