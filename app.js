import express from "express";
import bodyParser from "body-parser";
import mysql from 'mysql'

import dotenv from 'dotenv'

// importing routes

import routes from './routes/user.js'; // Adjust the path as needed


const app =express()

dotenv.config()

// using body - parser middleware  so we can see data coming from post request in req.body
app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json())

// in order to access static files we use static middleware 
app.use(express.static('public'))

const port = process.env.PORT || 5001

app.listen(port,()=>{
    console.log(`server is listening at port ${port}`);
})

// creating connection pool 

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     database: process.env.DB_NAME,
//     // waitForConnections: true, // Whether the pool should wait for connections to become available
//     connectionLimit: 100, // Maximum number of connections in the pool
//     // queueLimit: 0 // Maximum number of connection requests the pool should queue
//   });

// // CONNECT TO DB

// // Once you have created the connection pool, you can use the getConnection method to obtain a connection from the pool. This method takes a callback function as its argument, which is called once a connection is successfully acquired or an error occurs during the process.


// pool.getConnection(function(err, connection) {
//     // IF ERROR HAPPENS IN ESTABLISHING CONNECTION
//     if (err) {
//       console.error('Error getting MySQL connection: ' + err.stack);
//       return;
//     }

//     // IF CONNECTION IS SUCCESSFULL

//     if (connection){
//         console.log('conneceted successfully conccection id = ',connection.threadId);
//     }    
//   });
  

// app.get('/home',(req,res)=>{
//     res.render('home.ejs')
// })

app.use('',routes)
