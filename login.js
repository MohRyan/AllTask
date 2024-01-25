const express = require('express')
const login = express.Router()


// app.get('/blogDetail', blogDetail)

// function blogDetail(req, res) {
//     res.render('blogDetail')
// }

login.route('/login')
    .get(function (req, res) {
        res.render('login')




    })


module.exports = login