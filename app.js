const express = require ('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config();
const PORT = process.env.PORT  || 5000;
const connectDb = require('./config/Db')
const indexRoute = require ('./routes/user/index') ;
const authRoute = require ('./routes/user/auth');
const adminIndexRoute = require ('./routes/admin/index');
const adminAuthRoute = require ('./routes/admin/auth');
const ejs = require("ejs");
const bodyParser = require("body-parser");
const session = require('express-session');
const MongoStore = require('connect-mongo') //to store sessions
const passport = require("passport");
const notFound = require('./middleware/notFound')
const cors = require('cors') //Cross-origin Resource Sharing
const morgan = require('morgan');

//Loggin request
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// middleware
app.use(express.json());
app.use(express.static("public")); // to render static file like CSS, plain javascript, fonts, images.
app.use(express.static(__dirname))
app.set("view engine", "ejs"); // set the app to use view engine to render ejs folders
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
app.use(cors());  // to initialise the cors middleware
app.use(morgan('dev'));require('dotenv').config();
app.set("view engine", "ejs"); // set the app to use view engine to render ejs folders


// enable app to use session
app.use(session({
    secret:"ekklasiaisachurchwebsite",
    resave:false,
    saveUninitialized:false,
    store: MongoStore.create({mongoUrl:'mongodb://localhost:27017/OHI_DB'}),
    cookie:{},
}))

// use/ initialize passport middleware (to reinitialize the passport middleware to avoid user been out of session when open different tabs or pages)
app.use(passport.initialize());
app.use(passport.session());   // set app to use passport and set up sessions

// passport configuration
const User = require('./models/User');
// const { default: mongoose } = require('mongoose'); 
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//Global variables
app.use((req, res, next)=>{
    res.locals.user= req.user
    next();
})


// routes
app.use('/',indexRoute)
app.use('/auth',authRoute)
app.use('/admin',adminIndexRoute);
app.use('/admin',adminAuthRoute);
app.use(notFound)  // handles wrong route errors






const start = async ()=>{
    try{
        // process.env.MONGO_CONNECT
        await connectDb('mongodb://localhost:27017/OHI_DB') 
        app.listen(PORT,()=>{console.log(`Server is listening on port : ${PORT}`)})
    } catch (error){
        console.log (error)
    }
}

// start connection process
start();
