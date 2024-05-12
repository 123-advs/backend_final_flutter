const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var folderSchema = new mongoose.Schema({
    description: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    topics: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Topic'
        }
    ],
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Folder', folderSchema);