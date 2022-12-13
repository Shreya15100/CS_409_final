// Load required packages
var mongoose = require('mongoose');

// Define our user schema

var UserSchema = new mongoose.Schema({
    f_name: String,
    l_name: String,
    u_name: String,
    pass: String,
    teams: [Number]
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);


