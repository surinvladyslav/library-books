const bcrypt = require("bcrypt");

const AuthService = require('../service/auth.service');
const UserModel = require('../models/user.model');
const BaseErrors = require('../error');

class AuthController {
    async loginUser(req, res, next) {
        try {
            const { username, password } = req.body;

            if(!username) {
                throw BaseErrors.BadRequest('error with username');
            }

            const user = await UserModel.findOne({username});
            if(!user) {
                throw BaseErrors.BadRequest('no such admin');
            }

            const checkPassword = await bcrypt.compare(password, user.password);
            if(!checkPassword) {
                throw BaseErrors.BadRequest('invalid password');
            }

            const tokens = await AuthService.loginUser(user);
            await res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
            delete tokens.refreshToken;

            return res.json({
                ...tokens,
                user,
            });
        } catch(e) {
            next(e)
        }
    }

    async registrationUser (req, res, next) {
        try {
            const { username, password } = req.body;

            if(!username) {
                throw BaseErrors.BadRequest('error with username');
            }

            const userCheck = await UserModel.findOne({username});
            if(userCheck) {
                throw BaseErrors.BadRequest('such an admin already exists')
            }

            const hashPassword = await bcrypt.hash(password, 12)

            const user = await AuthService.registrationUser(username, hashPassword);

            await res.cookie('refreshToken', user.refreshToken, { httpOnly: true });
            delete user.refreshToken;

            return res.json(user);
        } catch(e) {
            next(e)
        }
    }

    async refreshUser (req, res, next) {
        try {
            const { refreshToken } = req.cookies;

            if(!refreshToken) {
                throw BaseErrors.UnouthorizedError()
            }

            const user = await AuthService.refreshUser(refreshToken);

            await res.cookie('refreshToken', user.refreshToken, { httpOnly: true });
            delete user.refreshToken

            return res.json(user)
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new AuthController()