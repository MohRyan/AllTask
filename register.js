const express = require('express')
const register = express.Router()
const bcrypt = require('bcrypt');
const {
    development
} = require('./src/config/config.json')
const {
    Sequelize,
    QueryTypes,
    INTEGER
} = require('sequelize')
const SequelizePool = new Sequelize(development)

// app.get('/blogDetail', blogDetail)

// function blogDetail(req, res) {
//     res.render('blogDetail')
// }

register.route('/register')
    .get(async function (req, res) {
        try {
            res.render('register')
        } catch (error) {
            throw error
        }

    })

    .post(async function (req, res) {
        try {
            const {
                name,
                email,
                gender,
                password
            } = req.body

            const {
                id
            } = req.params

            const salt = 10

            bcrypt.hash(password, salt, async (err, hashpass) => {
                const query = await SequelizePool.query(`insert into users (name,email,gender,password) values ('${name}','${email}','{${gender}}','${hashpass}')`)
                res.redirect('/login')
            })

        } catch (error) {
            throw error
        }
    })

module.exports = register