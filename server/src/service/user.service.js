const UserModel = require('../models/user.model');
const TokenModel = require("../models/token.model");
const BaseErrors = require('../error');

class UserService {
    deleteRefreshToken(id) {
        return TokenModel.deleteOne({user: id})
    }

    async updateUsername (username, id) {
        const user = await UserModel.findById(id);
        if(!user) {
            throw BaseErrors.NotFound('no such user');
        }
        user.username = username;
        return user.save();
    }

    async updatePassword (password, user) {
        user.password = password;
        return user.save();
    }

    async deleteUser(id) {
        const user = await UserModel.deleteOne({_id: id})
        if(!user) {
            throw BaseErrors.BadRequest('invalid id')
        }

        return this.deleteRefreshToken(id)
    }

    logoutUser(id) {
        return this.deleteRefreshToken(id)
    }
}

module.exports = new UserService();