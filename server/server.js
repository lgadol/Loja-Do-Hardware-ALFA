const express = require('express');
const cors = require('cors');
const app = express();
const { createConnection } = require('mysql2');

app.use(cors());

const lojaHardwareCONN = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'estudos_pedro'
});

//Consulta para produtos
app.get('/', (req, res) => {
    lojaHardwareCONN.query('SELECT * FROM produtos_hardware', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Consulta para usuários
app.get('/users', (req, res) => {
    lojaHardwareCONN.query('SELECT * FROM usuarios_hardware', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.listen(4000, () => {
    console.log('API rodando na porta 4000');
});