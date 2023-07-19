const ViewService = require('../services/views.service');

class ViewsController {
    viewService = new ViewService();
    index = async (req, res) => {
        const pageInfo = await this.viewService.index();
        return res.render('index', pageInfo);
    };

    login = async (req, res) => {
        const pageInfo = await this.viewService.login();
        return res.render('login', pageInfo);
    };

    signUp = async (req, res) => {
        const pageInfo = await this.viewService.login();
        return res.render('signup', pageInfo);
    };

    profile = async (req, res) => {
        const pageInfo = await this.viewService.profile();
        return res.render('profile', pageInfo);
    };
}

module.exports = ViewsController;
