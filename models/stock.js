const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const stockSchema = mongoose.Schema({
    ticker: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    }
})

stockSchema.plugin(uniqueValidator);

/**Changes _id to id, removes _id and _v when user
 * info is shown.
 */
stockSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
    }
})

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;