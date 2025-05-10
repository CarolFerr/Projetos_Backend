const mongoose = require('mongoose');

// cria collection
const Person = mongoose.model('Person', {
    name: String,
    salary: Number,
    approved: Boolean,
});


module.exports = Person;