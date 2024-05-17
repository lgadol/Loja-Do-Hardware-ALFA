# Nome do Projeto
LOJA DO HARDWARE (Alfa)

## Tecnologias Utilizadas
- React
- Express
- MySQL
- Node.js

## Como Iniciar a Aplicação
1. Clone o repositório para a sua máquina local usando 'git clone https://github.com/lgadol/Loja-Do-Hardware-ALFA'.
2. Navegue até a pasta do projeto usando 'cd loja_do_hardware-ALFA'.
3. Instale todas as dependências usando 'npm install'.

## Como importar o DB (HeidiSQL)
1. Dentro do HeidiSQL, já conectado na sua sessão.
2. Clique em 'Arquivo', no canto superior esquerdo.
3. Escolha a opção 'Executar arquivo SQL...'.
4. Na janela que abrir, clique em 'SIM'.

## Configurando o .env
Crie um arquivo '.env' dentro da pasta 'server' e configure ele da seguinte forma:
Substitua "root" e "admin" pelas suas credenciais para a conexão com o banco.

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=admin
DB_NAME=loja_do_hardware

## Iniciar a aplicação
Execute o comando na raíz do projeto:
'npm run start:both'


## Login padrão
Dentro do banco, há dois usuários padrão, suas cerdenciais, são:

USUÁRIO ADMIN
user: root
senha: admin

USUÁRIO TESTE
user: userTeste
senha: teste

Use eles para logar na aplicação ou crie novos