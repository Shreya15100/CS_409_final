// Load required packages
var mongoose = require('mongoose');

// Define our user schema

var TeamData = new mongoose.Schema({
    name: String,
    api_id: String,
    games_played: Number,
    win_total: Number,
    win_pct: Number,
    loss_total: Number,
    loss_pct: Number,
    avg_pf : Number,
    avg_pa : Number
});

var UserSchema = new mongoose.Schema({
    f_name: String,
    l_name: String,
    u_name: String,
    pass: String,
    teams: [TeamData]
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);


