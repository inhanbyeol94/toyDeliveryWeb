// const ViewRepository = require('../repositories/views.repository');

class ViewService {
    // viewRepository = new ViewRepository();

    index = async () => {
        return {
            title: 'Toy Delivery Web',
            subtitle: '기본',
        };
    };

    login = async () => {
        return {
            title: 'Toy Delivery Web',
            subtitle: '로그인',
        };
    };

    signup = async () => {
        return {
            title: 'Toy Delivery Web',
            subtitle: '회원가입',
        };
    };

    profile = async () => {
        return {
            title: 'Toy Delivery Web',
            subtitle: '사용자 프로필',
        };
    };
}

module.exports = ViewService;
