const RestaurantRepository = require('../repositories/restaurants.repository');

class ViewService {
    restaurantRepository = new RestaurantRepository();

    index = async ({ user }) => {
        const pageInfo = { title: 'Toy Delivery Web', subtitle: '기본' };

        switch (user?.group) {
            case 0:
                return {
                    member_id: user.member_id,
                    email: user.email,
                    nickname: user.nickname,
                    group: user.group,
                    image: user.image ?? 'https://img.freepik.com/free-icon/user_318-159711.jpg',
                    defaultName: user.defaultName,
                    defaultPhone: user.defaultPhone,
                    defaultAddress: user.defaultAddress,
                    ...pageInfo,
                };

            case 1: {
                const findRestaurant = await this.restaurantRepository.findRestaurantId({ member_id: user.member_id });

                return {
                    member_id: user.member_id,
                    email: user.email,
                    nickname: user.nickname,
                    group: user.group,
                    restaurantId: findRestaurant?.restaurant_id,
                    image: user.image ?? 'https://img.freepik.com/free-icon/user_318-159711.jpg',
                    defaultName: user.defaultName,
                    defaultPhone: user.defaultPhone,
                    defaultAddress: user.defaultAddress,
                    ...pageInfo,
                };
            }
            case undefined:
                return {
                    member_id: null,
                    group: null,
                    ...pageInfo,
                };
        }
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

    profile = async ({ user }) => {
        if (user) {
            return {
                member_id: user.member_id,
                email: user.email,
                nickname: user.nickname,
                image: user.image ?? 'https://img.freepik.com/free-icon/user_318-159711.jpg',
                group: user.group,
                defaultName: user.defaultName,
                defaultPhone: user.defaultPhone,
                defaultAddress: user.defaultAddress,
                title: 'Toy Delivery Web',
                subtitle: '사용자 프로필',
            };
        } else {
            return {
                member_id: null,
                group: null,
                title: 'Toy Delivery Web',
                subtitle: '사용자 프로필',
            };
        }
    };
}

module.exports = ViewService;
