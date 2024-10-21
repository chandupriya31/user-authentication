const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    user_name: String,
    email: String,
    password: String
}, {
    timestamps: true
})

const UserModel = new model('user', userSchema);

module.exports = UserModel;