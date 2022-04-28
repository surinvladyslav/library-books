const TokenModel = require('../models/token-model');
const CustomError = require('../error');
const jwt = require('jsonwebtoken');

class TokenService {
    async generationTokens (payload) {
        const accessToken = await jwt.sign({payload}, process.env.ACCESS_SECRET_KEY, {expiresIn: '20m'})
        const refreshToken = await jwt.sign({payload}, process.env.REFRESH_SECRET_KEY, {expiresIn: '1d'} )
        return {
            accessToken,
            refreshToken
        }
    }

    async saveRefreshToken(id, refreshToken) {
        const token = await TokenModel.findOne({user: id})
        if(token) {
            token.refreshToken = refreshToken
            return await token.save()
        }
        return await TokenModel.create({user: id, refreshToken})
    }

    async findRefreshToken(refreshToken) {
        const token = await TokenModel.findOne({refreshToken})
        return token;
    }

    async verifyRefreshToken(refreshToken) {
        const admin = await jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, function(err, decoded) {
            if (err) {
                throw CustomError.UnouthorizedError(err.message)
            }
            return decoded.payload
        });
        return admin;
    }

    async deleteRefreshToken(id) {
        return await TokenModel.deleteOne({user: id})
    }
}

module.exports = new TokenService();