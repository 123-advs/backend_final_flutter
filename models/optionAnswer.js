const mongoose = require('mongoose');

const optionAnswerSchema = new mongoose.Schema({
    answer: {
        type: String,
        enum: ['Term', 'Definition'],
        default: 'Term'
    },
    numberQues: Number,
    showAns: Boolean,
    shuffle: Boolean
});

module.exports = optionAnswerSchema;
