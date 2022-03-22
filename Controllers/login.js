const accountModel = require('../models/users');

const getAllAccounts = async (req, res) => {
    try {
        const Login = await accountModel.find({});
        res.status(201).json({ Login });
    } catch (error) { res.status(500).json({ msg: error }) }
}
const getOneAccount = async (req, res) => {
    try {
        const Login = await accountModel.findById(req.params.id).exec();
        res.status(201).json({ Login });
    } catch (error) { res.status(500).json({ msg: error }) }
}

module.exports = {
    getAllAccounts,
    getOneAccount
}
