const express = require('express')
const login = express.Router()
const bcrypt = require('bcrypt')
const sesi = require('express-session')
const flash = require('express-flash')
const {
    development
} = require('./src/config/config.json')
const {
    Sequelize,
    QueryTypes,
    INTEGER
} = require('sequelize')
const SequelizePool = new Sequelize(development)


login.use(sesi({
    cookie: { // 
        httpOnly: true, // hanya untuk akse http
        secure: false, // mengatur cookies untuk melewati protokol yang sudah di tentukan
        maxAge: null // batas waktu cookie
    },
    resave: false, // digunakan untuk tidak atau menyimpan sessionnya
    store: sesi.MemoryStore(), //untuk menyimpan sesi khususnya untuk mode development
    secret: 'sesistorage', //digunakan sebagai kata kunci untuk mencari session
    saveUninitialized: true, // untuk menyimpan sesi ada ataupun belum ada isinya
}))

login.use(flash())

login.route('/login')
    .get(function (req, res) {
        try {

            res.render('login')
        } catch (error) {
            throw error
        }
    })

    .post(async function login(req, res) {
        try {
            const {
                email,
                password
            } = req.body

            const checkemail = await SequelizePool.query(`select * from users where email = '${email}'`, {
                type: QueryTypes.SELECT
            })

            if (!checkemail.length) {
                return res.redirect('/mailError')
            }

            bcrypt.compare(password, checkemail[0].password, function (err, result) {
                if (!result) {
                    return res.redirect('/passError')
                } else {
                    req.session.login = true
                    req.session.user = checkemail[0].name
                    req.flash('success', 'Selamat, Anda Sudah Login !!!!')
                    return res.redirect('/homelogin')
                }
            })
        } catch (error) {
            throw error
        }
    })

login.route('/homelogin')
    .get(async function (req, res) {
        try {
            const query = await SequelizePool.query("select * from blogs", {
                type: QueryTypes.SELECT
            })
            const dataBlog = query.map(res => ({
                ...res,
                login: req.session.login
            }))

            res.render('homelogin', {
                dataBlog,
                login: req.session.login,
                user: req.session.user
            })

        } catch (error) {
            throw error
        }
    })



let dataBlog = []
// ================ Blog ================

login.route('/bloglogin')
    .get(async function (req, res) {
        try {
            const query = await SequelizePool.query("select * from blogs", {
                type: QueryTypes.SELECT
            })
            const dataBlog = query.map(res => ({
                ...res,
                login: req.session.login
            }))

            res.render('bloglogin', {
                dataBlog,
                login: req.session.login,
                user: req.session.user
            })

        } catch (error) {
            throw error
        }
    })

    .post(async function (req, res) {
        try {
            const {
                projectName,
                startDate,
                endDate,
                tech,
                tech1,
                description
            } = req.body

            // const {
            //     id
            // } = req.params
            // ========= Untuk Blog Detail =============
            let dataMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Novermber", "Desember"]

            let dateDayStart = new Date(startDate).getDate()
            let MonthStart = new Date(startDate).getMonth()
            let dateMonthStart = dataMonth[MonthStart]
            let dateYearStart = new Date(startDate).getFullYear()
            let allDateStart = dateDayStart + ' ' + dateMonthStart + ' ' + dateYearStart
            let dateStartError = ""

            if (allDateStart === "NaN undefined NaN") {
                dateStartError += "Masukkan Datenya"
            } else {
                dateStartError += allDateStart
            }

            let dateDayEnd = new Date(endDate).getDate()
            let MonthEnd = new Date(endDate).getMonth()
            let dateMonthEnd = dataMonth[MonthEnd]
            let dateYearEnd = new Date(endDate).getFullYear()
            let allDateEnd = dateDayEnd + ' ' + dateMonthEnd + ' ' + dateYearEnd
            let dateEndError = ""

            if (allDateEnd === "NaN undefined NaN") {
                dateEndError += "Masukkan Datenya"

            } else {
                dateEndError += allDateEnd
            }

            //     // ========= Untuk Blog ================

            let oneDay = 24 * 60 * 60 * 1000
            let oneMonth = 31 * 24 * 60 * 60 * 1000
            let oneYear = 12 * 31 * 24 * 60 * 60 * 1000

            let selisih = Math.abs(new Date(endDate) - new Date(startDate))
            let day = Math.round(selisih / oneDay)
            let month = Math.round(selisih / oneMonth)
            let year = Math.round(selisih / oneYear)

            let durasi = ""

            if (day < 30) {
                durasi += day + " day"

            } else if (month < 12) {
                durasi += month + " month"
            } else if (year) {
                durasi += year + " year"
            } else {
                durasi += "ada Date yang belum di masukkan"
            }

            const data = {
                projectName,
                dateStartError,
                dateEndError,
                durasi, // untuk blog dan blogdetail
                tech,
                tech1,
                description,
            }
            dataBlog.unshift(data)

            const query = await SequelizePool.query(`insert into blogs (projectname,datestarterror,dateenderror,durasi,tech,tech1,description) values ('${projectName}','${dateStartError}','${dateEndError}','${durasi}','{${tech}}','{${tech1}}','${description}')`)

            // console.log(query)
            res.redirect('#myProject')
        } catch (error) {
            throw error
        }
    })

// ================ Blog Detail ================

login.route('/blogDetailLogin/:id')
    .get(async function (req, res) {
        try {
            const {
                id
            } = req.params

            const query = await SequelizePool.query(`select * from blogs where id=${id}`, {
                type: QueryTypes.SELECT
            })

            res.render('blogDetailLogin', {
                dataBlog: query[0],
                login: req.session.login,
                user: req.session.user
            })

        } catch (error) {
            throw error
        }
    })

// ================ Blog Delete ================

login.route('/delete/:id')
    .get(async function (req, res) {

        try {
            const {
                id
            } = req.params
            await SequelizePool.query(`delete from blogs where id=${id}`)

            res.redirect('/bloglogin#myProject')
        } catch (error) {
            throw error
        }
    })

// ================ Blog Edit ================


login.route('/editDetailLogin/:id')
    .get(async function (req, res) {
        try {
            const {
                id
            } = req.params

            const query = await SequelizePool.query(`select * from blogs where id=${id}`, {
                type: QueryTypes.SELECT
            })

            res.render('editDetailLogin', {
                dataBlog: query[0]
            })

        } catch (error) {
            throw error
        }
    })

    .post(async function (req, res) {
        try {
            const {
                projectName,
                startDate,
                endDate,
                tech,
                tech1,
                description
            } = req.body

            let dataMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Novermber", "Desember"]

            let dateDayStart = new Date(startDate).getDate()
            let MonthStart = new Date(startDate).getMonth()
            let dateMonthStart = dataMonth[MonthStart]
            let dateYearStart = new Date(startDate).getFullYear()
            let allDateStart = dateDayStart + ' ' + dateMonthStart + ' ' + dateYearStart
            let dateStartError = ""

            if (allDateStart === "NaN undefined NaN") {
                dateStartError += "Masukkan Datenya"
            } else {
                dateStartError += allDateStart
            }

            let dateDayEnd = new Date(endDate).getDate()
            let MonthEnd = new Date(endDate).getMonth()
            let dateMonthEnd = dataMonth[MonthEnd]
            let dateYearEnd = new Date(endDate).getFullYear()
            let allDateEnd = dateDayEnd + ' ' + dateMonthEnd + ' ' + dateYearEnd
            let dateEndError = ""

            if (allDateEnd === "NaN undefined NaN") {
                dateEndError += "Masukkan Datenya"

            } else {
                dateEndError += allDateEnd
            }

            //     // ========= Untuk Blog ================

            let oneDay = 24 * 60 * 60 * 1000
            let oneMonth = 31 * 24 * 60 * 60 * 1000
            let oneYear = 12 * 31 * 24 * 60 * 60 * 1000

            let selisih = Math.abs(new Date(endDate) - new Date(startDate))
            let day = Math.round(selisih / oneDay)
            let month = Math.round(selisih / oneMonth)
            let year = Math.round(selisih / oneYear)

            let durasi = ""

            if (day < 30) {
                durasi += day + " day"

            } else if (month < 12) {
                durasi += month + " month"
            } else if (year) {
                durasi += year + " year"
            } else {
                durasi += "ada Date yang belum di masukkan"
            }

            const data = {
                projectName,
                dateStartError,
                dateEndError,
                durasi, // untuk blog dan blogdetail
                tech,
                tech1,
                description,
            }
            dataBlog.unshift(data)
            const {
                id
            } = req.params
            const query = await SequelizePool.query(`update blogs set
                projectname = '${projectName}',
                datestarterror = '${dateStartError}',
                dateenderror = '${dateEndError}',
                durasi = '${durasi}',
                tech = '{${tech}}',
                tech1 = '{${tech1}}',
                description = '${description}'
    
                where id=${id}`, {
                type: QueryTypes.UPDATE
            })
            res.redirect('/blog#myProject')
        } catch (error) {
            throw error
        }
    })


login.route('/logout')
    .get(async function (req, res) {
        req.session.destroy()
        res.redirect('/login')
    })

exports.dataBlog = dataBlog
module.exports = login