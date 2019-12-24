const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

//conexão banco de dados
mongoose.connect(process.env.DATA_BASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//server config
const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};

io.on('connection', socket => {
    const {user_id} = socket.handshake.query
    connectedUsers[user_id] = socket.id
});

app.use((req, res, next) =>{
    req.io = io;
    req.connectedUsers = connectedUsers

    return next();
});

//GET, POST, PUT, DELETE

//req.query => acessar querry params (para filtros)
//req.params => acessar querry params (para edição, delete)
//req.body = acessar corpo da requisição
app.use(cors());
app.use(express.json());
app.use('/files',express.static(path.resolve(__dirname,'..', 'uploads' )))
app.use(routes);

server.listen(3000);