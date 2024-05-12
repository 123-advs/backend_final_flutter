const mongoose = require('mongoose');

const termSchema = new mongoose.Schema({
    definition: String,
    term: String,
    star: {
        type: Boolean,
        default: false
    }
});

module.exports = termSchema;
// module.exports = mongoose.model('Term', termSchema);
