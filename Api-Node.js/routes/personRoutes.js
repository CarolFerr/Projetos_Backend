const router = require('express').Router();
const Person = require('../models/Person');


router.post('/', async(req, res) => {
    //req.body

    // {name: "Maria", salary: 5000, approved: false}
    const {name, salary, approved}= req.body; // como eu espero que será retornado o dado

    if(!name){
        res.status(422).json({error: 'O nome é obrigatório!'});
        return;
    }

    const person = {
        name, 
        salary,
        approved
    }

    // create do moongose
    try {
        //criando dados
        await Person.create(person);

        res.status(201).json({message: 'Pessoa inserida com sucesso!'});

    } catch(error) {
        res.status(500).json({error: error}); // erro de servidor que cheda do catch, embora nem sempre seja a melhor alternativa
    }

});

// Read
router.get('/', async(req, res) => {
    try {
        const people = await Person.find();
        res.status(200).json(people);
    }catch (error) {
        res.status(500).json({error: error})
    }
});

// rotas dinamicas
router.get('/:id', async(req, res)=> {

    //console.log(req); // mostra tudo o que tem na requisição

    // extrair o dado da requisiçã, pela url = req.params
    const id = req.params.id;

    try {
        const person = await Person.findOne({_id: id});

        if(!person){
            res.status(422).json({message: 'O usuário não foi encontrado!'});
            return; // garante que não execute mais nenhuma linha após isso
        }

        res.status(200).json(person)
    }catch(error) {
        res.status(500).json({error: error})
    }
});

// update - put(objeto compleo para atualização), patch(atualização parcial)
router.patch('/:id', async(req, res) => {
    const id = req.params.id;
    const {name, salary, approved}= req.body; 

    const person = {
        name, 
        salary, 
        approved,
    }

    try {
        const updatedPerson = await Person.updateOne({_id: id}, person);

        // conta para verificar se algum registro foi encontrado

        //quando não consegue atualizar nada
        //console.log(updatedPerson)

        if(updatedPerson.matchedCount === 0) {
            res.status(422).json({message: 'O usuário não foi encontrado!'});
            return;
        }

        res.status(200).json(person);
    }catch(error) {
        res.status(500).json({error: error});
    }

});

// deletar dados
router.delete('/:id', async(req, res) => {
    const id = req.params.id;

    const person = await Person.findOne({_id: id});

    if(!person){
        res.status(422).json({message: 'O usuário não foi encontrado!'});
        return; // garante que não execute mais nenhuma linha após isso
    }

    try{
        await Person.deleteOne({_id: id});
        res.status(200).json({message: 'Usuário removido com sucesso!'});
    }catch(error){
        res.status(500).json({error: error});
    }
});

module.exports = router;
