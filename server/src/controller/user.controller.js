const bcrypt = require("bcrypt");

const UserService = require("../service/user.service");
const UserModel = require("../models/user.model");
const BaseErrors = require("../error");

class UserController {
    async updateUsername (req, res, next) {
        try {
            const { username } = req.body;
            const id = req.params.id;

            if(!username) {
                throw BaseErrors.BadRequest('invalid username');
            }

            await UserService.updateUsername(username, id);

            return res.json({
                result: 'changed username'
            });
        } catch(e) {
            next(e);
        }
    }

    async updatePassword (req, res, next) {
        try {
            const { password, newPassword } = req.body;
            const id = req.params.id;

            if(!password || !newPassword) {
                throw BaseErrors.BadRequest('invalid password');
            }

            const user = await UserModel.findById(id);
            if(!user) {
                throw BaseErrors.NotFound('no such user');
            }

            const checkPassword = await bcrypt.compare(password, user.password)
            if(!checkPassword) {
                throw BaseErrors.BadRequest('invalid password')
            }

            const hashPassword = await bcrypt.hash(password, 12)

            await UserService.updatePassword(hashPassword, user)

            return res.json({
                result: 'changed password'
            });
        } catch(e) {
            next(e)
        }
    }

    async deleteUser(req, res, next) {
        try {
            const id = req.params.id;

            await UserService.deleteUser(id);
            await res.clearCookie('refreshToken');

            res.json({
                result: 'delete user'
            })
        } catch(e) {
            next(e)
        }
    }

    async logoutUser(req, res, next) {
        try {
            const id = req.params.id;

            await UserService.logoutUser(id);
            await res.clearCookie('refreshToken');

            return res.json({
                result: 'logout user'
            })
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new UserController();