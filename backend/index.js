import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "sajtok",
    password: ''
})

//BOGÁRDI BENEDEK
//getAll, getOne, post
app.get('/', (req, res) => {
    
        return res.status(200, "segg")

        /*const temp = await db.query('SELECT * FROM sajtok');
        const rows = temp[0];
        const fields = temp[1];
        return res.status(200).json(rows);
    } catch (error) {
        console.error(`Error retrieving phones ${error}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }*/
})


app.listen(3000, err => {
    if (err) {
      console.log(err);
      return process.exit(1);
    }
    console.log(`Server is running on ${3000}`);
  });