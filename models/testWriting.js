const mongoose = require('mongoose'); // Erase if already required
const termSchema = require('./term');
const optionAnswerSchema = require('./optionAnswer');

// Declare the Schema of the Mongo model
var testWritingSchema = new mongoose.Schema({
    answers: [{
        answer: String,
        result: Boolean,
        term: termSchema
    }],
    optionAnswer: optionAnswerSchema,
    overall: Number,
    topic: {
        type: mongoose.Types.ObjectId,
        ref: 'Topic',
    },
    totalQuestion: Number,
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('TestWriting', testWritingSchema);