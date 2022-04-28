const AdminService = require('../service/admin-service');

class AdminController {
    async login (req, res, next) {
        try {
            const { username, password } = req.body;
            console.log(req.body);
            const admin = await AdminService.login(username, password);
            await res.cookie('refreshToken', admin.refreshToken, { httpOnly: true });
            delete admin.refreshToken
            return res.json({
                ...admin
            })
        } catch(e) {
            next(e)
        }
    }

    async registration (req, res, next) {
        try {
            const { username, password } = req.body;
            const admin = await AdminService.registration(username, password);
            await res.cookie('refreshToken', admin.refreshToken, { httpOnly: true });
            delete admin.refreshToken
            return res.json({
                ...admin
            })
        } catch(e) {
            next(e)
        }
    }

    async refresh (req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const admin = await AdminService.refresh(refreshToken);
            await res.cookie('refreshToken', admin.refreshToken, { httpOnly: true });
            delete admin.refreshToken
            return res.json({
                ...admin
            })
        } catch(e) {
            next(e)
        }
    }

    async name (req, res, next) {
        try {
            const { name } = req.body;
            const id = req.params.id;
            await AdminService.name(name, id)
            return res.json({
                result: 'Changed name'
            })
        } catch(e) {
            next(e)
        }
    }

    async admins (req, res, next) {
        try {
            const admins = await AdminService.admins()
            return res.json({admins})
        } catch(e) {
            next(e)
        }
    }

    async password(req, res, next) {
        try {
            const { currentPassword, newPassword, confirmPassword } = req.body;
            const id = req.params.id;
            await AdminService.password(currentPassword, newPassword, confirmPassword, id)
            return res.json({
                result: 'Changed password'
            })
        } catch(e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;
            await AdminService.delete(id)
            await res.clearCookie('refreshToken');
            res.json({
                result: 'Delete admin'
            })
        } catch(e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const id = req.params.id;
            await AdminService.logout(id)
            await res.clearCookie('refreshToken');
            res.json({
                result: 'Logout admin'
            })
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new AdminController()