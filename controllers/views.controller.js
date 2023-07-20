const ViewService = require('../services/views.service');
const pageConfig = require('../viewsConfig');

class ViewsController {
    viewService = new ViewService();
    login = async (req, res) => {
        const { title, subtitle } = pageConfig.login;
        const pageInfo = await this.viewService.login({ title, subtitle });
        return res.render('login', pageInfo);
    };

    signUp = async (req, res) => {
        const { title, subtitle } = pageConfig.signup;
        const pageInfo = await this.viewService.signup({ title, subtitle });
        return res.render('signup', pageInfo);
    };

    orderAdmin = async (req, res) => {
        const { user } = req.session;
        const { title, subtitle, css } = pageConfig.orderAdmin;
        const pageInfo = await this.viewService.authorization({ user, title, subtitle });
        pageInfo.css = css;
        return res.render('orderAdmin', pageInfo);
    };

    index = async (req, res) => {
        const { user } = req.session;
        const { title, subtitle } = pageConfig.index;
        const pageInfo = await this.viewService.authorization({ user, title, subtitle });
        return res.render('index', pageInfo);
    };

    profile = async (req, res) => {
        const { user } = req.session;
        const { title, subtitle } = pageConfig.profile;
        const pageInfo = await this.viewService.authorization({ user, title, subtitle });
        return res.render('profile', pageInfo);
    };
    menuAdmin = async (req, res) => {
        const { user } = req.session;
        const { title, subtitle, css } = pageConfig.menuAdmin;
        const pageInfo = await this.viewService.authorization({ user, title, subtitle });
        pageInfo.css = css;
        return res.render('menuAdmin', pageInfo);
    };
}

module.exports = ViewsController;
