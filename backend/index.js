import express from "express";
import cors from 'cors';
import mysql from 'mysql2';

const app = express();

app.use(cors())

app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sajtok'
}).promise();

app.get('/sajtok', async (req, res) => {


    const temp = await db.query('SELECT * FROM sajtok');
    const rows = temp[0];

    res.status(200).json(rows);

})
app.get('/sajtok/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    const q = await db.query(`SELECT * FROM sajtok WHERE id = ?`, [id])
    res.status(200).json(q[0])
})
app.get('/erlelt', async (req, res) => {


    const temp = await db.query('SELECT * FROM sajtok WHERE erlelesi_ido != "0 hónap"');
    const rows = temp[0];

    res.status(200).json(rows);

})
/*app.post('/sajtok', async (req, res) => {
    try {
        let sajt = [req.body.nev, req.body.tipus, req.body.tejfele, req.body.erlelesi_ido, req.body.szarmazas, req.body.iz];

        if (sajt[0].length < 1) {
            return res.status(400).json({ error: "Érvénytelen" });
        }
        if (sajt[1].length < 1) {
            return res.status(400).json({ error: "Phone model must have at least 1 character" });
        }


        const [rows, fields] = await db.query('INSERT INTO sajtok (nev, tipus, tejfele, erlelesi_ido, szarmazas, iz) VALUES (?,?,?,?,?,?)', sajt);
        res.status(200).json({ message: 'Sajt hozzáadva!' });


    } catch (error) {
        console.error(` ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})*/

/*app.delete('/phones/:phoneId', async (req, res) => {
    try {
        let phoneId = parseInt(req.params.phoneId);
        const [rows, fields] = await db.query('DELETE FROM phones WHERE id =?', [phoneId]);
        if (rows.length === 0) {
            res.status(404).json({ error: "Phone not found" });
        } else {
            res.status(200).json({ message: "Phone successfully removed" });
        }

    } catch (error) {
        console.error(`Error retrieving phones ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})
*/
app.listen(3000);
