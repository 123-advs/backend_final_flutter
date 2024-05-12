const mongoose = require('mongoose'); // Erase if already required
const termSchema = require('./term');

// Declare the Schema of the Mongo model
var topicSchema = new mongoose.Schema({
    definitionLanguage: {
        type: String,
        default: 'vi'
    },
    termLanguage: {
        type: String,
        default: 'en'
    },
    description: {
        type: String,
    },
    mode: {
        type: String,
        enum: ['private', 'public'],
        default: 'private'
    },
    terms: [termSchema],
    title: {
        type: String,
        required: true,
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
module.exports = mongoose.model('Topic', topicSchema);