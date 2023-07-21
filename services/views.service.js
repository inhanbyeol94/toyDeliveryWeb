const RestaurantRepository = require('../repositories/restaurants.repository');
const MemberRepository = require('../repositories/members.repository');
const KeywordRepository = require('../repositories/keywords.repository');
const CartRepository = require('../repositories/carts.repository');

class ViewService {
    restaurantRepository = new RestaurantRepository();
    memberRepository = new MemberRepository();
    keywordRepository = new KeywordRepository();
    cartRepository = new CartRepository();

    authorization = async ({ member_id, title, subtitle, restaurantId = null }) => {
        const user = await this.memberRepository.findOne({ member_id: member_id || null });
        const cartItems = await this.cartRepository.memberCartitems({ member_id: member_id || null });

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
                    cartItems,
                };

            case 1: {
                //로그인 (사장)

                const findRestaurant = await this.restaurantRepository.findRestaurantId({ member_id: user.member_id });
                const findKeyword = await this.keywordRepository.findAllKeyword(Number(restaurantId));
                const keywordList = findKeyword.map((keyword) => {
                    return {
                        keyword: keyword.keyword,
                        keyword_id: keyword.keyword_id,
                    };
                });
                let category = '';
                switch (findRestaurant?.category) {
                    case 0:
                        category = '한식';
                        break;
                    case 1:
                        category = '분식';
                        break;
                    case 2:
                        category = '카페 & 디저트';
                        break;
                    case 3:
                        category = '치킨';
                        break;
                    case 4:
                        category = '피자';
                        break;
                    case 5:
                        category = '아시안';
                        break;
                    case 6:
                        category = '양식';
                        break;
                    case 7:
                        category = '일식';
                        break;
                    case 8:
                        category = '중식';
                        break;
                }

                return {
                    member_id: user.member_id,
                    email: user.email,
                    nickname: user.nickname,
                    group: user.group,
                    restaurantId: findRestaurant?.restaurant_id ?? null,
                    restaurantAddress: findRestaurant?.address,
                    restaurantName: findRestaurant?.name,
                    restaurantTel: findRestaurant?.tel,
                    restaurantDesc: findRestaurant?.desc,
                    restaurantImage: findRestaurant?.image ?? 'https://img.freepik.com/free-icon/user_318-159711.jpg',
                    restaurantCategory: category,
                    restaurantKeywords: keywordList ?? '',
                    image: user.image ?? 'https://img.freepik.com/free-icon/user_318-159711.jpg',
                    defaultName: user.MemberInfos.name,
                    defaultPhone: user.MemberInfos.phone,
                    defaultAddress: user.MemberInfos.address,
                    title,
                    subtitle,
                    cartItems,
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
    orderAdmin = async () => {
        return {
            title: 'Toy Delivery Web',
            subtitle: '매장 주문관리',
            css: 'orderAdmin',
        };
    };
    menuAdmin = async () => {
        return {
            title: 'Toy Delivery Web',
            subtitle: '메뉴관리',
            css: 'menuAdmin',
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
