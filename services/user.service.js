const User = require('../models/user.model');
const md5 = require('md5');

const userService = {};

userService.createUser = async function ({ name, email, password }) {
    try {
        const user = new User({ name, email, password:md5(password)});
        const newUser = await user.save();
        return newUser;

    } catch (e) {
        console.log(e.message)
        throw new Error('Error while save user')
    }
}

userService.getUsers = async function () {
    try {
        const users = await User.find({});
        return users;

    } catch(e) {
        console.log(e.message)
        throw new Error('Error while Paginating Users')
    }
}

userService.getUser = async function ({ id }) {
    try {
        const user = await User.findById(id)
        let getUser = JSON.parse(JSON.stringify(user))
        delete getUser.password;
        return  getUser
    } catch (e) {
        console.log(e.message)
        throw new Error('Error while returning user');
    }
}

userService.updateUser = async function ({ id }, { name, email, password }) {
    try {
        const user = await User.findById(id);
        const updateUser = await user.set({ name, email, password });
        await updateUser.save();
        return updateUser;
    } catch (e) {
        console.log(e.message)
        throw new Error('Error while update user')
    }
}

userService.updateUserName = async function ({ id }, { name }) {
    try {
        const userid = await User.findById(id);
        const updateNameUser = await userid.set({ name });
        await updateNameUser.save();
        return updateNameUser;
    } catch (e) {
        console.log(e.message)
        throw new Error('Error while changing name of user')
    }
}

userService.LogUser = async function({email,password}){
    try{
        const logedUser = await User.findOne({email,password:md5(password)})
        if(logedUser){
            return logedUser;
        }else{
            return 'User doesnt exist or the password is not the same'
        }
    }catch(e){
        console.log(e.message)
        throw new Error ('Error while getting User')
    }
}

userService.removeUser = async function (data) {
    try {
        const Userid = data.id;
        const userDeleted = await User.findByIdAndRemove(Userid);
        const message = 'User removed';
        return message;
    } catch (e) {
        console.log(e.message)
        throw new Error(error);
    }
};


module.exports = userService;