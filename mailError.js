const express = require('express')
const mailError = express.Router()


mailError.route('/mailError')
    .get(function (req, res) {
        try {

            res.render('mailError')
        } catch (error) {
            throw error
        }
    })


module.exports = mailError