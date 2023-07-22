const MenuRepository = require('../repositories/menus.repository');
const RestaurantRepository = require('../repositories/restaurants.repository');
const { CustomError, ServiceReturn } = require('../customClass');
const AWS = require('aws-sdk');
class MenuService {
    menuRepository = new MenuRepository();
    restaurantRepository = new RestaurantRepository();

    //** 레스토랑 전체 메뉴 불러오기 */
    findAllMenu = async (restaurant_id) => {
        const allMenu = await this.menuRepository.findAllMenu(restaurant_id);

        allMenu.sort((a, b) => {
            return b.createAt - a.createAt;
        });
        const menus = allMenu.map((menu) => {
            return {
                menu_id: menu.menu_id,
                name: menu.name,
                price: menu.price,
                image: menu.image,
                createdAt: menu.createdAt,
                updatedAt: menu.updatedAt,
            };
        });

        return new ServiceReturn('정상 반환되었습니다.', 200, menus);
    };

    //** 레스토랑 단일 메뉴 불러오기 */
    findMenu = async (restaurant_id, menu_id) => {
        const findmenu = await this.menuRepository.findMenuId(restaurant_id, menu_id);
        const menu = {
            menu_id: findmenu.menu_id,
            name: findmenu.name,
            price: findmenu.price,
            image: findmenu.image,
            createdAt: findmenu.createdAt,
            updatedAt: findmenu.updatedAt,
        };

        return new ServiceReturn('정상 반환되었습니다.', 200, menu);
    };

    //** 레스토랑 메뉴 생성 */
    createMenu = async (member_id, name, price, image) => {
        const findMyrestaurant = await this.restaurantRepository.findRestaurantId({ member_id: member_id });
        const restaurant_id = findMyrestaurant.restaurant_id;
        await this.menuRepository.createMenu(restaurant_id, member_id, name, price, image);

        return new ServiceReturn('메뉴가 정상 추가되었습니다.', 201, true);
    };

    //** 레스토랑 특정 메뉴 수정 */
    updateMenu = async (member_id, menu_id, name, price, image) => {
        const findMyrestaurant = await this.restaurantRepository.findRestaurantId({ member_id: member_id });
        const restaurant_id = findMyrestaurant.restaurant_id;

        const findMenu = await this.menuRepository.findMenuId(restaurant_id, menu_id);
        if (!findMenu) throw new CustomError('수정할 메뉴가 존재하지 않습니다.', 404);

        await this.menuRepository.updateMenu(restaurant_id, menu_id, name, price, image);

        return new ServiceReturn('메뉴 수정이 완료되었습니다.', 200, true);
    };

    //** 레스토랑 특정 메뉴 삭제 */
    deleteMenu = async (member_id, menu_id) => {
        const findMyrestaurant = await this.restaurantRepository.findRestaurantId({ member_id: member_id });
        const restaurant_id = findMyrestaurant.restaurant_id;

        const findMenu = await this.menuRepository.findMenuId(restaurant_id, menu_id);
        if (!findMenu) throw new CustomError('수정할 메뉴가 존재하지 않습니다.', 404);

        await this.menuRepository.deleteMenu(restaurant_id, menu_id);

        return new ServiceReturn('메뉴가 정상 삭제되었습니다.', 200, true);
    };
    //** 메뉴 사진 추가 */
    updateMenuImage = async ({ image, menu_id }) => {
        await this.menuRepository.updateMenuImage({ image, menu_id });
        return new ServiceReturn('메뉴 사진이 정상 저장되었습니다.', 200, true);
    };
    //** 메뉴 사진 삭제 */
    deleteMenuImage = async ({ menu_id }) => {
        const findUser = await this.menuRepository.findOne({ menu_id });
        const imageKey = findUser.image.replace('https://toydeliverycloud.s3.ap-northeast-2.amazonaws.com/', '');

        const s3 = new AWS.S3();

        s3.deleteObject(
            {
                Bucket: 'toydeliverycloud',
                Key: imageKey,
            },
            async (err) => {
                if (err) throw new CustomError('삭제에 실패하였습니다.', 500);
                await this.memberRepository.updateMenuImage({ menu_id, image: null });
            }
        );

        return new ServiceReturn('정상적으로 삭제되었습니다.', 200, true);
    };
}

module.exports = MenuService;
