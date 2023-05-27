const mongoose = require ('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

// a new data Schema- defines the structure for the documents like the validations, type etc...
const userSchema = new mongoose.Schema({
    lastName:{
        type:String,
        require:true,
    },
    firstName:{
        type:String,
        require:true,
    },
    fullName : String,
    middleName:{
        type:String,
        default : ''
    },
    PhoneNo: String,
    email: {
        type:String,
        required : true
    },
    username : {
        type:String,
        required : true
    },

    DOB : Date,
    gender : {
        type:String,
        enum:['male','female'],
        default : 'male'
    },
    maritalStatus : {
        type:String,
        enum:['single','married'],
        default : 'single',
    },
    VIN: String,
    stateOfReg: String,
    maidenName:String,
    registeredBeforeMarriage:{
        type : String,
        enum:['Yes','No'],
        default : 'Yes',
    },
    passportImg:String,
    referralEmail:String,
    validated:{
        type:String,
        enum:['Verified','Unverified'],
        default: 'Unverified'
    },
    OHI_id :String,
    registeredDate :{
        type: Date,
        default : Date.now(),
    },
    Admin:{ // to reference to the admin schema
        type: String,
        enum:['Yes','No'],
        default: 'No',
    }
})

    // password: String,  passport mongose does not need the password field
// adding passport-local-mongoose plugin to our userSchema, use to hash and salt our password.
userSchema.plugin(passportLocalMongoose); 

// user model instance
const User = new mongoose.model("user",userSchema);

module.exports = User;