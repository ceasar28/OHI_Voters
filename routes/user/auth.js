const express = require ('express');
const router = express.Router();
const isAuthenticated = require ('../../middleware/Isauthenticated') // to ensure a user is authenticated before accessing a route

const upload = require ('../../middleware/fileUpload');
const{
    registerUser,
    loginUser,
    logoutUser,
    changePassword,
    changeEmail,
} = require('../../controllers/userControllers')

//@description: register user
//@route: post '/auth/register'
router.route('/register').post(upload.single('passportImage'),registerUser)

//@description: login a User
//@route: POST '/auth/login'
router.route('/login').post(loginUser)

//@description: logout a User
//@route: GET '/auth/logout'
router.route('/logout').get(logoutUser)

// @description: Register/SignIn a User
// @route: POST '/auth/change-password'
router.route('/change-password').post(isAuthenticated,changePassword)

// @description: Register/SignIn a User
// @route: POST '/auth/change-password'
router.route('/change-email').post(isAuthenticated,changeEmail)


module.exports= router