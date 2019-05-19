const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 5
    },
    name: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
        minlength: 6
    },
    endpoint: String,
    keys: mongoose.Schema.Types.Mixed,
    createDate: {
        type: Date,
        default: Date.now,
    },
    stocks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stock'
        }
    ]
});

userSchema.plugin(uniqueValidator);

/**Changes _id to id, removes _id, _v and passwordHash when user
 * info is shown.
 */
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;