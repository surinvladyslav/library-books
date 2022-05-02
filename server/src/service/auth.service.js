const jwt = require("jsonwebtoken");

const UserModel = require('../models/user.model');
const TokenModel = require("../models/token.model");
const BaseErrors = require('../error');

class AuthService {
    async generateTokens (payload) {
        const accessToken = await jwt.sign({payload}, process.env.ACCESS_SECRET_KEY, {expiresIn: '20m'});
        const refreshToken = await jwt.sign({payload}, process.env.REFRESH_SECRET_KEY, {expiresIn: '1d'});
        return {
            accessToken,
            refreshToken
        }
    }

    async verifyRefreshToken(refreshToken) {
        try {
            return jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
        } catch(err) {
            throw BaseErrors.UnouthorizedError(err.message)
        }
    }

    findRefreshToken(refreshToken) {
        return TokenModel.findOne({refreshToken})
    }

    async saveToken(id, refreshToken) {
        const token = await TokenModel.findOne({user: id})
        if(token) {
            token.refreshToken = refreshToken
            return token.save()
        }
        return TokenModel.create({user: id, refreshToken})
    }

    async loginUser (user) {
        const tokens = await this.generateTokens({username: user.username, password: user.password});
        if(!tokens) {
            throw BaseErrors.BadRequest('error with tokens');
        }
        await this.saveToken(user.id, tokens.refreshToken);

        return tokens;
    }

    async registrationUser (username, password) {
        const user = await UserModel.create({username, password})

        const tokens = await this.generateTokens({username, password});
        if(!tokens) {
            throw BaseErrors.BadRequest('error with tokens');
        }
        await this.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user
        };
    }

    async refreshUser (refreshToken) {
        const user = await this.verifyRefreshToken(refreshToken)
        console.log(user);

        const token = await this.findRefreshToken(refreshToken)
        if(!token) {
            throw BaseErrors.NotFound('token no found')
        }

        const tokens = await this.generateTokens({username: user.username, password: user.password});
        if(!tokens) {
            throw BaseErrors.BadRequest('error with tokens');
        }
        await this.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user
        }
    }
}

module.exports = new AuthService()