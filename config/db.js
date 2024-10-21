const mongoose = require('mongoose');
const configureDb = async () => {
    const url = process.env.url;
    const name = process.env.db;
    try {
        await mongoose.connect(`${url}/${name}`)
        console.log('connected to db')
    } catch (e) {
        console.log('error connecting to db')
    }
}

module.exports = configureDb;