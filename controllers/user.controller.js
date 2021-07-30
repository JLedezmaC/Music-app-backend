const userService = require('../services/user.service')

const userController = {};

userController.create = async function (req, res, next) {
    try {
        const newUser = await userService.createUser(req.body);
        return res.status(201).json({ newUser })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

userController.getUsers = async function (req, res, next) {
    try {
        const users = await userService.getUsers();
        return res.status(200).json({ status: 200, data: users, message: "Successfully users retrieved" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: error.message });
    }
}

userController.getUser = async function (req, res, next) {
    try {
        const user = await userService.getUser(req.params);
        if (user == null) {
            return res.status(200).json({ message: "Cannot find user" });
        }
        return res.status(200).json({ status: 200, data: user, message: "Successfully user retrieved" })
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
}

userController.updateUser = async function (req, res, next) {
    try {
        const updateUser = await userService.updateUser(req.params, req.body);
        return res.status(200).json({ status: 200, data: updateUser, message: "Successfully user retrieved" })
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
}


userController.updateUserName = async function (req, res, next) {
    try {
        const updateUserName = await userService.updateUserName(req.params, req.body);
        return res.status(200).json({ status: 200, data: updateUserName, message: "Successfully user name updated" })
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
}

userController.login = async function (req, res, next) {
    try {
        const userLogIn = await userService.LogUser(req.body);
        return res.status(200).json({ status: 200, data: userLogIn });
    } catch (error) {
        throw new Error('Error while loging user');
    }
}

userController.delete = async function (req, res, next) {
    try {
        const userToRemove = await userService.removeUser(req.body);
        return res.status(201).json({ userToRemove });
    } catch (error) {
        throw new Error('Error while deleting user or user was deleted');
    }
};


module.exports = userController;