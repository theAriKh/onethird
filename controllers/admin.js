require('../models/user');

const mongoose = require('mongoose');
const User = mongoose.model('user');


var isAdmin = function (req, res) {

    res.send("WORKING")
    // if(!req.isAuthenticated()){
    //     req.flash('error_msg', 'Not Authorized');
    //     res.redirect('login')
    // } else {
    //     if (!req.user.admin()) {
    //         req.flash('error_msg', 'Not Authorized');
    //         res.redirect('login')
    //     }
    //     else {
    //         res.send("WORKING")
    //         //res.render('admin')
    //     }

    // }
}

module.exports.isAdmin = isAdmin;