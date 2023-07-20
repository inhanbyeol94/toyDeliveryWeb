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
        const member_id = req.session.user?.member_id;
        const { title, subtitle, css } = pageConfig.orderAdmin;
        const pageInfo = await this.viewService.authorization({ member_id, title, subtitle });
        pageInfo.css = css;
        return res.render('orderAdmin', pageInfo);
    };

    index = async (req, res) => {
        const member_id = req.session.user?.member_id;
        const { title, subtitle } = pageConfig.index;
        const pageInfo = await this.viewService.authorization({ member_id, title, subtitle });
        return res.render('index', pageInfo);
    };

    profile = async (req, res) => {
        const member_id = req.session.user?.member_id;
        const { title, subtitle } = pageConfig.profile;
        const pageInfo = await this.viewService.authorization({ member_id, title, subtitle });
        return res.render('profile', pageInfo);
    };
    menuAdmin = async (req, res) => {
        const member_id = req.session.user?.member_id;
        const { title, subtitle, css } = pageConfig.menuAdmin;
        const pageInfo = await this.viewService.authorization({ member_id, title, subtitle });
        pageInfo.css = css;
        return res.render('menuAdmin', pageInfo);
    };

    restaurant = async (req, res) => {
        const member_id = req.session.user?.member_id;
        const restaurantId = req.params?.restaurantId;
        const { title, subtitle } = pageConfig.restaurant;
        const pageInfo = await this.viewService.authorization({ member_id, title, subtitle, restaurantId });
        return res.render('restaurant', pageInfo);
    };
}

module.exports = ViewsController;
