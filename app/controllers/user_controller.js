const bcryptjs = require('bcryptjs')
const UserModel = require("../models/user_model");
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res) => {
    const user = req.body
    try {
        const salt = await bcryptjs.genSalt();
        user.password = await bcryptjs.hash(user.password, salt);
        const user_data = await UserModel.create(user);
        res.json({ msg: "You have registered successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.msg || error.message || 'Somethimg went wrong... please try again later' });
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'Please provide valid credentials' });
        }
        const result = await bcryptjs.compare(password, user.password);
        if (!result) {
            return res.status(404).json({ msg: 'Please provide valid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({ msg: "You have logged in successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.msg || error.message || 'Somethimg went wrong... please try again later' });
    }
}

module.exports.getUser = async (req, res, next) => {
    try {
        const user = await UserModel.find({ _id: req.user.id })
        res.json(user)
    } catch (error) {
        res.status(500).json({ msg: error.msg || error.message || 'Somethimg went wrong... please try again later' });
    }
}