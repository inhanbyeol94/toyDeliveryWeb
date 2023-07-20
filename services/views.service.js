const RestaurantRepository = require('../repositories/restaurants.repository');
const MemberRepository = require('../repositories/members.repository');

class ViewService {
    restaurantRepository = new RestaurantRepository();
    memberRepository = new MemberRepository();

    authorization = async ({ member_id, title, subtitle }) => {
        const user = await this.memberRepository.findOne({ member_id: member_id || null });

        switch (user?.group) {
            case 0:
                return {
                    //로그인 (고객)
                    member_id: user.member_id,
                    email: user.email,
                    nickname: user.nickname,
                    group: user.group,
                    image: user.image ?? 'https://img.freepik.com/free-icon/user_318-159711.jpg',
                    defaultName: user.MemberInfos.name,
                    defaultPhone: user.MemberInfos.phone,
                    defaultAddress: user.MemberInfos.address,
                    title,
                    subtitle,
                };

            case 1: {
                //로그인 (사장)

                const findRestaurant = await this.restaurantRepository.findRestaurantId({ member_id: user.member_id });

                return {
                    member_id: user.member_id,
                    email: user.email,
                    nickname: user.nickname,
                    group: user.group,
                    restaurantId: findRestaurant?.restaurant_id,
                    image: user.image ?? 'https://img.freepik.com/free-icon/user_318-159711.jpg',
                    defaultName: user.MemberInfos.name,
                    defaultPhone: user.MemberInfos.phone,
                    defaultAddress: user.MemberInfos.address,
                    title,
                    subtitle,
                };
            }
            case undefined:
                //비 로그인
                return {
                    member_id: null,
                    group: null,
                    title,
                    subtitle,
                };
        }
    };

    login = async ({ title, subtitle }) => {
        return { title, subtitle };
    };

    signup = async ({ title, subtitle }) => {
        return { title, subtitle };
    };
}

module.exports = ViewService;
