import mysql from 'mysql'
import dotenv from 'dotenv'


dotenv.config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    // waitForConnections: true, // Whether the pool should wait for connections to become available
    connectionLimit: 100, // Maximum number of connections in the pool
    // queueLimit: 0 // Maximum number of connection requests the pool should queue
  });

    export const viewmeth = ((req,res)=>{
        
        
        pool.getConnection((err,connection)=>{
            if(err){
                console.log('error we got is = ',err);
                throw err
                
            }
            else{
                connection.query('SELECT * FROM user',(err,rows)=>{
                    //when done with connection release the conncection
                    connection.release()
                    console.log(rows);
                    res.render('home.ejs', { 'rows': rows})
                })
            }
        })
        
    })


    export const searchmeth = ((req,res)=>{  
        
        // getting the data that is written in  search method  
        
        let searchQuery  = req.body.search

        console.log(searchQuery);
        
        pool.getConnection((err,connection)=>{
            if(err){
                console.log('error we got is = ',err);
                throw err                
            }
            else{
                connection.query('SELECT * FROM user WHERE first_name LIKE ? or last_name LIKE ?', ['%' + searchQuery + '%','%'+searchQuery+'%'], (err, rows) => {

                    //when done with connection release the conncection
                    connection.release()
                    console.log(rows);
                    res.render('home.ejs', {'rows': rows})
                })
            }
        })
        
    })

    // creating the method that render the page when user goto addUrl page
    
    export const gotoadduserpage = ((req,res)=>{
        res.render('addUser.ejs')
    })

    // creating method to add user to the sql database

    export const addUserToDb = ((req,res)=>{
        // trying to get the data send by the post method
        const {firstName,lastName,email,phone,comments,statuus} = req.body

        pool.getConnection((err,connection)=>{

            if(err){
                console.log('error we got is = ',err);
                throw err                
            }
            else{
                connection.query('INSERT INTO user SET first_name = ?,last_name = ? , email = ?, phone = ?, comments = ?,status =?', [firstName,lastName,email,phone,comments,statuus], (err, rows) => {

                    //when done with connection release the conncection
                    connection.release()
                    console.log(rows);
                    res.render('addUser.ejs',{'message':"user added successfully"})
                })
            }

        })
        
    })

    export const gotoeditpage = ((req,res)=>{
        // we will diplay the content on the addUser.ejs whose id we have got 

        console.log(req.params.id);

        pool.getConnection((err,connection)=>{

            if(err){
                console.log('error we got is = ',err);
                throw err                
            }
            else{
                connection.query('SELECT * FROM user WHERE id = ?',[req.params.id],(err,rows)=>{
                    //when done with connection release the conncection
                    connection.release()
                    console.log(rows);
                    res.render('editPage.ejs', { 'rowsman': rows})
                })
            }

        })
    })


    export const updateUserToDb = ((req,res)=>{ 
        
        // we will now update he data         

      console.log(req.params.body);
        const {firstName,lastName,email,phone,comments,statuus} = req.body

        pool.getConnection((err,connection)=>{

            if(err){
                console.log('error we got is = ',err);
                throw err                
            }
            else{
                connection.query('UPDATE user SET first_name = ?, last_name = ? WHERE id = ?', [firstName, lastName, req.params.id], (err, rows) => {

                    //when done with connection release the conncection
                    connection.release()

                    if (!err) {

                        // upar ka code niche




                        pool.getConnection((err,connection)=>{

                            if(err){
                                console.log('error we got is = ',err);
                                throw err                
                            }
                            else{
                                connection.query('SELECT * FROM user WHERE id = ?',[req.params.id],(err,rows)=>{
                                    //when done with connection release the conncection
                                    connection.release()
                                    console.log(rows);
                                    res.render('editPage.ejs', { 'rowsman': rows})
                                })
                            }
                
                        })
                        
                        
                    }
                    else{
                        console.log(err);
                    }
                    console.log('updated ' ,rows);
                    
                })
            }

        })
    })