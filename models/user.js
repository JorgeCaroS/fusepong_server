const mongoose = require("mongoose");
var bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: false,
  },    
  mail: {
    type: String,
    required: false,
    unique:true, 
  },
  password: {
    type: String,
    required: false,
  },
  empresa:{
      type:String,
      required:false,
  },
 
  
});

// hash the password
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("users", userSchema);