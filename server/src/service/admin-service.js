const AdminModel = require('../models/admin-model');
const TokenService = require('./token-service');
const CustomError = require('../error');
const bcrypt = require('bcrypt');

function findAdmin(id) {
    const admin = AdminModel.findById({_id: id});
    if(!admin) {
        throw CustomError.NotFound('no found such admin');
    }
    return admin;
}

class AdminService {
    async login (username, password) {
        if(!username) {
            throw CustomError.BadRequest('error with username')
        }

        const admin = await AdminModel.findOne({username})
        if(!admin) {
            throw CustomError.BadRequest('no such admin')
        }

        const checkPassword = await bcrypt.compare(password, admin.password)
        if(!checkPassword) {
            throw CustomError.BadRequest('invalid password')
        }
        const tokens = await TokenService.generationTokens({username, password: admin.password})
        console.log(tokens);
        await TokenService.saveRefreshToken(admin.id, tokens.refreshToken)
        return {
            ...tokens,
            admin
        }
    }

    async registration (username, password, confirmPassword) {
        if(!username) {
            throw CustomError.BadRequest('error with username')
        }

        const checkName = await AdminModel.findOne({username})
        if(checkName) {
            throw CustomError.BadRequest('such an admin already exists')
        }

        if(password !== confirmPassword) {
            throw CustomError.BadRequest("confirm password doesn't match")
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const admin = await AdminModel.create({username, password: hashPassword})

        const tokens = await TokenService.generationTokens({username, password: hashPassword})
        await TokenService.saveRefreshToken(admin.id, tokens.refreshToken)

        return {
            ...tokens,
            admin
        }
    }

    async refresh (refreshToken) {
        if(!refreshToken) {
            throw CustomError.UnouthorizedError()
        }

        const admin = await TokenService.verifyRefreshToken(refreshToken)

        const token = await TokenService.findRefreshToken(refreshToken)
        if(!token) {
            throw CustomError.NotFound('token no found')
        }

        const tokens = await TokenService.generationTokens({name: admin.name, password: admin.password})
        await TokenService.saveRefreshToken(admin.id, tokens.refreshToken)

        return {
            ...tokens
        }
    }

    async name (name, id) {
        const admin = await findAdmin(id)

        admin.name = name;
        await admin.save();
        return;
    }

    async password (currentPassword, newPassword, confirmPassword, id) {
        const admin = await findAdmin(id)

        const checkPassword = await bcrypt.compare(currentPassword, admin.password)
        if(!checkPassword) {
            throw CustomError.BadRequest('invalid password')
        }

        if(newPassword !== confirmPassword) {
            throw CustomError.BadRequest('invalid confirm password')
        }

        const hashPassword = await bcrypt.hash(newPassword, 3)
        admin.password = hashPassword;
        await admin.save();
        return;
    }

    async admins() {
        return await AdminModel.find()
    }

    async delete(id) {
        await AdminModel.deleteOne({_id: id})
        await TokenService.deleteRefreshToken(id)
        return;
    }

    async logout(id) {
        return await TokenService.deleteRefreshToken(id)
    }
}

module.exports = new AdminService();