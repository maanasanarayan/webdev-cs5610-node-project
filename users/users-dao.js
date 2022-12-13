import usersModel from "./users-model.js";

export const createUser = async (user) =>
    await usersModel.create(user)

export const findUserByUsername = async (email) =>
    await usersModel.findOne({email})

export const findUserByCredentials = async (email, password) =>
    await usersModel.findOne({email, password})

export const findAllUsers = async () =>
    await usersModel.find()

export const deleteUser = async (uid) =>
    await usersModel.deleteOne({_id: uid})

export const updateUser = async (uid, userUpdates) =>
    await usersModel.updateOne({_id: uid},
        {$set: userUpdates})

export const findUserById = (uid) =>
    usersModel.findById(uid, {password: false})