const express = require ('express');
const router = express.Router();
const isAuthenticated = require ('../../middleware/Isauthenticated') // to ensure a user is authenticated before accessing a route

const{
    registerUser,
    loginUser,
    logoutUser,
    changePassword,
    changeEmail,
} = require('../../controllers/userControllers')

//@description: login Admin
//@route: POST '/admin/auth/login'
// router.route('auth/login').post(loginAdmin)

//@description: logout a User
//@route: GET '/auth/logout'
router.route('/auth/logout').get(logoutUser)

// @description: Change Admin password
// @route: POST '/auth/change-password'
// router.route('auth/change-password').post(isAuthenticated,isAdmin,changePassword)

// @description: Change Admin email
// @route: POST '/auth/change-password'
// router.route('auth/change-email').post(isAuthenticated,isAdmin,changeEmail)

module.exports= router