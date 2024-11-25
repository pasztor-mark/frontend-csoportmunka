const express = require("express")
const mysql = require("mysql2/promise")
const app = express()
const PORT = 3000
const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "sajtok",
    password: ""
})


app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Szerver fut a :${PORT} porton`)
    }
    else throw error
})