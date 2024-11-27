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


    const temp = await db.query('SELECT * FROM sajtok WHERE erlelesi_ido != "nem érlelt"');
    const rows = temp[0];

    res.status(200).json(rows);

})

app.post('/sajtok', async (req, res) => {
    try {
        let sajt = [req.body.nev, req.body.tipus, req.body.tejfele, req.body.erlelesi_ido, req.body.szarmazas, req.body.iz];

        if (sajt[0].length < 1) {
            return res.status(400).json({ error: "Érvénytelen" });
        }
        if (sajt[1].length < 1) {
            return res.status(400).json({ error: "Cheese must have at least 1 character" });
        }


        const [rows, fields] = await db.query('INSERT INTO sajtok (nev, tipus, tejfele, erlelesi_ido, szarmazas, iz) VALUES (?,?,?,?,?,?)', sajt);
        res.status(200).json({ message: 'Sajt hozzáadva!' });


    } catch (error) {
        console.error(` ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.delete('/sajtok/:sajtId', async (req, res) => {
    try {
        let sajtId = parseInt(req.params.sajtId);
        const [rows, fields] = await db.query('DELETE FROM sajtok WHERE id =?', [sajtId]);
        if (rows.length === 0) {
            res.status(404).json({ error: "Cheese not found" });
        } else {
            res.status(200).json({ message: "Cheese successfully removed" });
        }

    } catch (error) {
        console.error(`Error retrieving cheeses ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.patch('/sajtok/:sajtId', async (req, res) => {
    try {
        let sajtId = parseInt(req.params.sajtId);
        let { nev, tipus, tejfele, erlelesi_ido, szarmazas, iz } = req.body;

        let updatedFields = [];
        let values = [];

        if (nev && nev.length > 0) {
            updatedFields.push('nev = ?');
            values.push(nev);
        }
        if (tipus && tipus.length > 0) {
            updatedFields.push('tipus = ?');
            values.push(tipus);
        }
        if (tejfele && tejfele.length > 0) {
            updatedFields.push('tejfele = ?');
            values.push(tejfele);
        }
        if (erlelesi_ido && erlelesi_ido.length > 0) {
            updatedFields.push('erlelesi_ido = ?');
            values.push(erlelesi_ido);
        }
        if (szarmazas && szarmazas.length > 0) {
            updatedFields.push('szarmazas = ?');
            values.push(szarmazas);
        }
        if (iz && iz.length > 0) {
            updatedFields.push('iz = ?');
            values.push(iz);
        }

        if (updatedFields.length === 0) {
            return res.status(400).json({ error: "At least one field must be provided for update" });
        }

        values.push(sajtId);

        const query = `UPDATE sajtok SET ${updatedFields.join(', ')} WHERE id = ?`;

        const [rows, fields] = await db.query(query, values);

        if (rows.affectedRows === 0) {
            return res.status(404).json({ error: "Cheese not found" });
        }

        res.status(200).json({ message: "Cheese updated successfully" });

    } catch (error) {
        console.error(`Error updating cheese: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(3000);
