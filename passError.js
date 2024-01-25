const express = require('express')
const errorpass = express.Router()


errorpass.route('/passError')
    .get(function (req, res) {
        try {

            res.render('passError')
        } catch (error) {
            throw error
        }
    })


module.exports = errorpass