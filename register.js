const express = require('express')
const register = express.Router()


// app.get('/blogDetail', blogDetail)

// function blogDetail(req, res) {
//     res.render('blogDetail')
// }

register.route('/register')
    .get(function (req, res) {

        res.render('register')

    })

module.exports = register