const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { setupWebSocket } = require('./webSocket')
const routes = require('./routes');


const app = express();
const server = http.Server(app);

setupWebSocket(server);

//MongoDB => Banco Não-relacional (JSON)
mongoose.connect('mongodb+srv://OmniStack:JavaScript@cluster0-i1qcp.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3030);