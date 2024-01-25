// =================Task10======================

// const express = require("express")
// const app = express()
// const port = 3000

// function home(req, res) {
//     app.send('halo ini untuk Task 10')
// }

// app.listen(port, () => {
//     console.log("Server berhasil dijalankan pada port", port)
// })

// =================Task10======================
// =================Task14======================

// ========= use import module or package like require (hal yang diperlukan) ========
const express = require("express")
const app = express()
// ======= module in hbs or UI ========
const useaddBlog = require("./blog")
// const register = require("./register")
// const login = require("./login")
// ======= module in hbs or UI ========
// ======= module in back or machine (not show in browser) ========
const dbPool = require('./src/connect/index')
// ======= module in back or machine (not show in browser) ========
const port = 3000

// ========= use import module or package like require (hal yang diperlukan) ========

// ========= use for read file json and get input value in .hbs file ========
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
// ========= use for read file json and get input value in .hbs file ========

// ========= set & use engine or rout file ========

app.set('view engine', 'hbs')
app.set('views', 'src/views')
app.use('/assets', express.static('src/assets'))
app.get('/', home)
// ========= set & use engine or rout file ========

// ========= routing home ========
function home(req, res) {
    res.render('home')
}
// ========= routing home ========

// =========== Use Module ============

app.use(useaddBlog)
// app.use(register)
// app.use(login)

// =========== Use Module ============
app.listen(port, () => {
    console.log("Server berhasil dijalankan pada port", port)
})

// =================Task14======================