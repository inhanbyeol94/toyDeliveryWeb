const menuList = document.getElementById('menuList');
const menuName = document.getElementById('menuName');
const menuPrice = document.getElementById('menuPrice');
const createBtn = document.getElementById('createBtn');
const largeModal = document.getElementById('largeModal');
const modalName = document.getElementById('modalName');
const modalPrice = document.getElementById('modalPrice');
const deleteBtn = document.getElementById('deleteBtn');
const updateBtn = document.getElementById('updateBtn');
const imageBtn = document.getElementById('imageBtn');
const imageDelBtn = document.getElementById('imageDelBtn');
const profileImage = document.getElementById('profileImage');
const imgMenu = document.getElementById('imgMenu');
let menuImage = '';
let menu_id = '';
const showmenuList = async () => {
    await fetchData('/myrestaurant', { method: 'GET' }).then((data) => {
        const { restaurant_id } = data.result;
        fetchData(`/restaurant/${restaurant_id}/menu`, { method: 'GET' }).then((data) => {
            const menus = data.result;
            console.log(menus);
            menuList.innerHTML = '';
            menus.forEach((menu) => {
                if (menu.image) {
                    menuImage = `<img src="${menu.image}" alt="음식 이미지" id="menuImg" class="modal-image img-fluid rounded-start">`;
                } else {
                    menuImage = `<img src="/assets/img/card.jpg"id="menuImg" class="img-fluid rounded-start" alt="...">`;
                }
                const menuHtml = `<div class="card my-3 menuCard" data-bs-toggle="modal" data-bs-target="#largeModal">
                                        <div >
                                        <div class="row g-0"  id="cards" value="${menu.menu_id}">
                                        <div class="col-md-4"  alt="">
                                            ${menuImage}
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                            <h5 class="card-title menuTitle" id="menuname">${menu.name}</h5>
                                            <h5 class="card-sub-title" >가격: <span id="menuprice">${menu.price}</span></h5>
                                            </div>
                                        </div>
                                        </div>
                                        </div>
                                    </div>`;
                menuList.innerHTML += menuHtml;
            });
            const menuCards = document.querySelectorAll('#cards');
            menuCards.forEach((card) => {
                card.addEventListener('click', (event) => {
                    const element = event.currentTarget;
                    const name = element.querySelector('#menuname').innerHTML;
                    const price = element.querySelector('#menuprice').innerHTML;
                    const image = element.querySelector('#menuImg').src;
                    console.log(image);
                    console.log(name, price);
                    document.getElementById('modalName').value = name;
                    document.getElementById('modalPrice').value = Number(price);
                    imgMenu.src = image;
                    menu_id = card.getAttribute('value');
                    updateBtn.addEventListener('click', async () => {
                        if (!modalName.value) return alert('이름을 작성해 주세요.');
                        if (!modalPrice.value) return alert('가격을 입력해주세요.');

                        const api = await fetch(`/restaurant/menu/${menu_id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(new updateMenu()),
                        });
                        const { status } = await api;
                        const { message } = await api.json();
                        if (status == 200) {
                            alert(message);
                            window.location.reload();
                        } else {
                            alert(message);
                        }
                    });

                    deleteBtn.addEventListener('click', async () => {
                        const menu_id = card.getAttribute('value');
                        const api = await fetch(`/restaurant/menu/${menu_id}`, {
                            method: 'DELETE',
                        });
                        const { status } = await api;
                        const { message } = await api.json();
                        if (status == 200) {
                            alert(message);
                            window.location.reload();
                        } else {
                            alert(message);
                        }
                    });
                    imageBtn.addEventListener('click', () => {
                        profileImage.click();
                    });

                    imageDelBtn.addEventListener('click', async () => {
                        const api = await fetch(`/menu/${menu_id}/image`, {
                            method: 'DELETE',
                        });
                        const { status } = await api;
                        const { message } = await api.json();
                        if (status == 200) {
                            alert(message);
                            window.location.reload();
                        } else {
                            alert(message);
                        }
                    });

                    profileImage.addEventListener('change', async (e) => {
                        const image = e.target.files[0];
                        const form = new FormData();
                        form.append('image', image);

                        const api = await fetch(`/menu/${menu_id}/image`, {
                            method: 'POST',
                            body: form,
                        });

                        const { status } = await api;
                        const { message } = await api.json();

                        if (status == 200) {
                            alert(message);
                            window.location.reload();
                        } else {
                            alert(message);
                        }
                    });
                });
            });
        });
    });
};

class updateMenu {
    constructor() {
        this.name = modalName.value;
        this.price = modalPrice.value;
    }
}

createBtn.addEventListener('click', async () => {
    if (!menuName.value) return alert('이름을 작성해 주세요.');
    if (!menuPrice.value) return alert('가격을 입력해주세요.');

    const api = await fetch('/restaurant/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new createMenu()),
    });
    const { status } = await api;
    const { message } = await api.json();
    if (status == 201) {
        alert(message);
        window.location.reload();
    } else {
        alert(message);
    }
});

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

class createMenu {
    constructor() {
        this.name = menuName.value.trim();
        this.price = menuPrice.value.trim();
    }
}

showmenuList();
