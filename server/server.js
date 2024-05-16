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

// Atualizar um usuário
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { usuario, nome, email, cpf, senha, rua, bairro, numero, cep, cidade, estado } = req.body;

    // Verificar se o nome de usuário já existe
    lojaHardwareCONN.query('SELECT * FROM usuarios_hardware WHERE usuario = ? AND id != ?', [usuario, id], (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            // Nome de usuário já existe
            res.status(400).json({ message: 'Nome de usuário já existe' });
        } else {
            // Verificar se o e-mail já existe
            lojaHardwareCONN.query('SELECT * FROM usuarios_hardware WHERE email = ? AND id != ?', [email, id], (error, results) => {
                if (error) throw error;

                if (results.length > 0) {
                    // E-mail já existe
                    res.status(400).json({ message: 'E-mail já existe' });
                } else {
                    // Verificar se o CPF já existe
                    lojaHardwareCONN.query('SELECT * FROM usuarios_hardware WHERE cpf = ? AND id != ?', [cpf, id], (error, results) => {
                        if (error) throw error;

                        if (results.length > 0) {
                            // CPF já existe
                            res.status(400).json({ message: 'CPF já existe' });
                        } else {
                            // Atualizar o usuário
                            const queryUpdate = 'UPDATE usuarios_hardware SET usuario = ?, nome = ?, email = ?, cpf = ?, senha = ?, rua = ?, bairro = ?, numero = ?, cep = ?, cidade = ?, estado = ? WHERE id = ?';
                            lojaHardwareCONN.query(queryUpdate, [usuario, nome, email, cpf, senha, rua, bairro, numero, cep, cidade, estado, id], (error, results) => {
                                if (error) throw error;
                                res.json({ message: 'Usuário atualizado com sucesso' });
                            });
                        }
                    });
                }
            });
        }
    });
});

// Verificar a senha do usuário
app.post('/checkPassword/:id', (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    lojaHardwareCONN.query('SELECT * FROM usuarios_hardware WHERE id = ?', [id], (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            const user = results[0];

            // Senha em texto simples (o que não é recomendado), feito assim:
            if (user.senha === password) {
                res.json({ message: 'Senha correta' });
            } else {
                res.status(401).json({ message: 'Senha incorreta' });
            }

            // Senha usando bcrypt, é feito assim:
            // bcrypt.compare(password, user.senha, function(err, result) {
            //     if (result == true) {
            //         res.json({ message: 'Senha correta' });
            //     } else {
            //         res.status(401).json({ message: 'Senha incorreta' });
            //     }
            // });
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