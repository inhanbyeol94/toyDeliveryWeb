const cardTop = document.getElementById('card-top');
const descBox = document.getElementById('descBox');
const menuOverview = document.getElementById('profile-overview');
const reviewOverview = document.getElementById('profile-edit');

// /restaurant/:restaurant_id/cart

async function addCart(menuId) {
    const countInput = document.getElementById(`countInput${menuId}`);

    const api = await fetch(`/restaurant/${window.location.pathname.split('/')[3]}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ menu_id: menuId, count: countInput.value }),
    });

    const { status } = await api;
    const { message } = await api.json();

    if (status == 200) {
        alert(message);
        window.location.reload();
    } else {
        alert(message);
    }
}

window.addEventListener('load', async () => {
    const api = await fetch(`/restaurant/${window.location.pathname.split('/')[3]}`, {
        method: 'GET',
    });
    const { status } = await api;
    const { restaurant, errorMessage } = await api.json();
    if (status == 200) {
        getMenuPage(restaurant);
        const { resultStar, count } = await getReviewPage(restaurant);
        getRestaurantPage(restaurant, resultStar, count);
    } else {
        alert(errorMessage);
    }
});

const getRestaurantPage = (restaurant, resultStar, count) => {
    cardTop.innerHTML = '';
    descBox.innerHTML = '';

    let categoryName = '';
    if (restaurant.category == 0) categoryName = '한식';
    else if (restaurant.category == 1) categoryName = '분식';
    else if (restaurant.category == 2) categoryName = '카페 & 디저트';
    else if (restaurant.category == 3) categoryName = '치킨';
    else if (restaurant.category == 4) categoryName = '피자';
    else if (restaurant.category == 5) categoryName = '아시안';
    else if (restaurant.category == 6) categoryName = '양식';
    else if (restaurant.category == 7) categoryName = '일식';
    else if (restaurant.category == 8) categoryName = '중국집';

    console.log(resultStar, Number(count) + 1);
    resultStar = Math.round((resultStar / (Number(count) + 1)) * 10) / 10;
    console.log(resultStar);
    const createCardHTML = `<div class="card info-card sales-card">

                                <div class="card-body" id="card-top">
                                <h5 class="card-title">${restaurant.name} <span>| ${categoryName}</span></h5>

                                <div class="d-flex align-items-center">
                                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                    <i class="bi bi-star-fill"></i>
                                    </div>
                                    <div class="ps-3">
                                    <h6>${resultStar}</h6>
                                    <span class="text-success small pt-1 fw-bold">리뷰 평점</span>
                                    </div>
                                </div>
                                <p class="small pt-1" style="margin-left: 30px; margin-top: 20px;">${restaurant.address}</p>
                                <p class="small pt-1" style="margin-left: 30px;">${restaurant.tel}</p>
                                </div>

                            </div>`;

    cardTop.innerHTML = createCardHTML;

    const createDesc = `${restaurant.desc}`;

    descBox.innerHTML = createDesc;
};

const getMenuPage = async (restaurant) => {
    const api = await fetch(`/restaurant/${restaurant.restaurant_id}/menu`, {
        method: 'GET',
    });
    const { status } = await api;
    const { menus, errorMessage } = await api.json();
    if (status == 200) {
        // console.log(menus);
        menuPageHtml(menus);
    } else {
        alert(errorMessage);
    }
};

const menuPageHtml = async (menus) => {
    menuOverview.innerHTML = '';

    for (let menu of menus) {
        const createMenuHTML = `<div class="card mb-3">
                                    <div class="row g-0">
                                    <div class="col-md-2">
                                        <img src="${menu.image || ''}" class="img-fluid rounded-start" alt="...">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                        <h5 class="card-title">${menu.name}</h5>
                                        <p class="card-text">${menu.price}원</p>
                                        <div class="input-group mb-3" style="max-width: 190px;">
                                            <input type="number" class="form-control" style="width: 50px;" value="0" id="countInput${menu.menu_id}">
                                            <button type="button" class="btn btn-dark" onclick="addCart(${menu.menu_id})">장바구니 담기</button>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>`;

        menuOverview.innerHTML += createMenuHTML;
    }
};

const getReviewPage = async (restaurant) => {
    const api = await fetch(`/restaurant/${restaurant.restaurant_id}/review`, {
        method: 'GET',
    });
    const { status } = await api;
    const { data, errorMessage } = await api.json();
    let resultStar = 0;
    let count = 0;
    if (status == 200) {
        console.log('data : ', data);
        reviewPageHtml(data);
        for (count in data) {
            resultStar += data[count].star;
        }
        return { resultStar, count };
    } else {
        alert(errorMessage);
    }
};

const reviewPageHtml = (reviews) => {
    reviewOverview.innerHTML = '';
    for (let review of reviews) {
        console.log(review);
        let starHtml = '';

        if (review.star == 1) starHtml = '★☆☆☆☆';
        else if (review.star == 2) starHtml = '★★☆☆☆';
        else if (review.star == 3) starHtml = '★★★☆☆';
        else if (review.star == 4) starHtml = '★★★★☆';
        else if (review.star == 5) starHtml = '★★★★';
        const createReviewHtml = `<div class="card mb-3">
                                        <div class="row g-0">
                                        <div class="col-md-1" style="text-align: center;">
                                            <img src="/assets/img/card.jpg" class="img-fluid rounded-circle"
                                            style="width: 100px; height: 100px; object-fit: cover;" alt="...">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                            <p class="card-text">${starHtml}</p>
                                            <a href="#">수정</a>
                                            <a href="#">삭제</a>
                                            <h5 class="card-title">리뷰평</h5>
                                            <p class="card-text">${review.review}</p>
                                            </div>
                                        </div>
                                        </div>
                                    </div>`;

        reviewOverview.innerHTML += createReviewHtml;
    }
};
