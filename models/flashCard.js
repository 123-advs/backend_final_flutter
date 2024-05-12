const mongoose = require('mongoose'); // Erase if already required
const termSchema = require('./term');
const optionAnswerSchema = require('./optionAnswer');

var flashCardSchema = new mongoose.Schema({
    termKnew: [termSchema],
    termStudy: [termSchema],
    optionAnswer: optionAnswerSchema,
    topic: {
        type: mongoose.Types.ObjectId,
        ref: 'Topic',
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('FlashCard', flashCardSchema);