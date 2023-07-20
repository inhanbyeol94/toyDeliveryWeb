const ViewService = require('../services/views.service');

class ViewsController {
    viewService = new ViewService();
    login = async (req, res) => {
        const pageInfo = await this.viewService.login();
        return res.render('login', pageInfo);
    };

    signUp = async (req, res) => {
        const pageInfo = await this.viewService.login();
        return res.render('signup', pageInfo);
    };

    index = async (req, res) => {
        const { user } = req.session;
        const pageInfo = await this.viewService.index({ user });
        return res.render('index', pageInfo);
    };

    profile = async (req, res) => {
        const { user } = req.session;
        const pageInfo = await this.viewService.profile({ user });
        return res.render('profile', pageInfo);
    };

    restaurant = async (req, res) => {
        const pageInfo = await this.viewService.restaurant();
        return res.render('restaurant', pageInfo);
    };
}

module.exports = ViewsController;
