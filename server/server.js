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

//Consulta para produtos ativos
app.get('/', (req, res) => {
    lojaHardwareCONN.query('SELECT * FROM produtos_hardware WHERE ativo = 1', (error, results) => {
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

// Consulta para usuário filtrado pelo id
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    lojaHardwareCONN.query('SELECT * FROM usuarios_hardware WHERE id = ?', [id], (error, results) => {
        if (error) throw error;
        if (results[0]) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    });
});



app.listen(4000, () => {
    console.log('API rodando na porta 4000');
});