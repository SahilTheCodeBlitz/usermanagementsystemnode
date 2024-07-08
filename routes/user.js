import express from 'express'

import {viewmeth,searchmeth,gotoadduserpage,addUserToDb,gotoeditpage,updateUserToDb} from '../controllers/userControllers.js'


const router = express.Router()

router.get('/',viewmeth)

// route handling for search method
router.post('/',searchmeth)

// route handling for going to page adduser when user click on add user button  
router.get('/addUser',gotoadduserpage)

// when user submit form after adding user data

router.post('/submitForm',addUserToDb)

// route for going to page updateUser page when user click on the edit button

router.get('/editPage/:id',gotoeditpage)

// when user submit from after uodating the user data

router.post('/updateData/:id',updateUserToDb)



export default router


//In Node.js, a router is used to handle HTTP requests and direct them to the appropriate handler functions based on the request URL and method. It helps in organizing the code by providing a way to define routes and their corresponding actions. Routers in Node.js allow developers to create modular and maintainable web applications by separating the concerns related to routing from other parts of the application logic. 