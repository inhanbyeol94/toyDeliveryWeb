const menuList = document.getElementById('menuList');

const showmenuList = async () => {
    await fetch('/myrestaurant', { method: 'GET' }).then((data) => {
        const { restaurant } = data;
        const restaurant_id = restaurant.restaurant_id;
        fetchData(`/restaurant/${restaurant_id}/menu`, { method: 'GET' }).then((data) => {
            const { menus } = data;
            menuList.innerHTML = '';
            menus.forEach((menu) => {
                let menuImage = '';
                if (menu.image) {
                    menuImage = `<img src="/${menu.image.replace(/\\/g, '/')}" alt="음식 이미지">`;
                } else {
                    menuImage = `<img src="assets/img/card.jpg" class="img-fluid rounded-start" alt="...">`;
                }
                const menuHtml = `<div class="card my-3 menuCard" data-bs-toggle="modal" data-bs-target="#largeModal">
                <a herf="/restaurant/${menu.restaurant_id}/menu/${menu.menu_id}"
                                        <div class="row g-0">
                                        <div class="col-md-4">
                                            ${menuImage}
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                            <h5 class="card-title menuTitle">${menu.name}</h5>
                                            <p class="card-text">메뉴상세내용 완전 맛있는 00맛 00000</p>
                                            <h5 class="card-sub-title">가격: ${menu.price}</h5>
                                            </div>
                                        </div>
                                        </div>
                                    </div>`;
                menuList.innerHTML += menuHtml;
            });
        });
    });
};

async function fetchData(url, options) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

showmenuList();
