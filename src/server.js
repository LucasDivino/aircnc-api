const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const app = express();
mongoose.connect(process.env.DATA_BASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
//GET, POST, PUT, DELETE

//req.query => acessar querry params (para filtros)
//req.params => acessar querry params (para edição, delete)
//req.body = acessar corpo da requisição
app.use(cors());
app.use(express.json());
app.use('/files',express.static(path.resolve(__dirname,'..', 'uploads' )))
app.use(routes);

app.listen(3000);