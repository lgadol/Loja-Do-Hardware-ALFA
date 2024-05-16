const express = require('express');
const cors = require('cors');
const app = express();
const { createConnection } = require('mysql2');

app.use(cors());
app.use(express.json());

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

// Adicionar item ao carrinho
app.post('/cart', (req, res) => {
    const { id_usuario, id_produto, quantidade } = req.body;
    const queryCheck = 'SELECT * FROM carrinho_hardware WHERE id_usuario = ? AND id_produto = ?';
    const queryInsert = 'INSERT INTO carrinho_hardware (id_usuario, id_produto, quantidade) VALUES (?, ?, ?)';
    const queryUpdate = 'UPDATE carrinho_hardware SET quantidade = quantidade + ? WHERE id_usuario = ? AND id_produto = ?';

    lojaHardwareCONN.query(queryCheck, [id_usuario, id_produto], (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            // Item já está no carrinho, atualizar quantidade
            lojaHardwareCONN.query(queryUpdate, [quantidade, id_usuario, id_produto], (error, results) => {
                if (error) throw error;
                res.json({ message: 'Quantidade atualizada no carrinho' });
            });
        } else {
            // Item não está no carrinho, inserir nova entrada
            lojaHardwareCONN.query(queryInsert, [id_usuario, id_produto, quantidade], (error, results) => {
                if (error) throw error;
                res.json({ message: 'Item adicionado ao carrinho' });
            });
        }
    });
});

// Remover item do carrinho
app.delete('/cart/:id', (req, res) => {
    const { id } = req.params;
    lojaHardwareCONN.query('DELETE FROM carrinho_hardware WHERE id = ?', [id], (error, results) => {
        if (error) throw error;
        res.json({ message: 'Item removido do carrinho' });
    });
});

// Obter todos os itens no carrinho de um usuário específico
app.get('/cart/:id_usuario', (req, res) => {
    const { id_usuario } = req.params;
    const query = `
        SELECT carrinho_hardware.*, produtos_hardware.nome, produtos_hardware.imagem_url, produtos_hardware.preco, produtos_hardware.descricao
        FROM carrinho_hardware
        JOIN produtos_hardware ON carrinho_hardware.id_produto = produtos_hardware.id
        WHERE carrinho_hardware.id_usuario = ?
    `;
    lojaHardwareCONN.query(query, [id_usuario], (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});


app.listen(4000, () => {
    console.log('API rodando na porta 4000');
});