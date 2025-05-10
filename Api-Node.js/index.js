// config inicial
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express(); //inicializando o express

// forma de ler JSON/ middlewares
// para conseguir ler e enviar json
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

//Rotas da API
const personRoutes = require('./routes/personRoutes');

// tudo que vier de person será redirecionado para personRoutes
app.use('/person', personRoutes);

// rota inicial/endpoint 
// req e res utilizados em uma função anônima
app.get('/', (req, res) => {

    // requsição
    
    res.json({message: 'Oi Express!'});
});

// entregar uma porta
const DB_USER= process.env.DB_USER;
const DB_PASSWORD= encodeURIComponent(process.env.DB_PASSWORD);
// realizando promises
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.hszxz.mongodb.net/?retryWrites=true&w=majority&appName=APICluster`)
.then(() => {
    console.log('Conectamos ao MongoDB!');
    app.listen(3000); // para escutar a porta
}) //quando dá certo
.catch((err) => console.log(err)); //quando da errado e mostrara algo


