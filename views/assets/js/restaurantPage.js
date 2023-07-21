const cardTop = document.getElementById('card-top');
const descBox = document.getElementById('descBox');
const menuOverview = document.getElementById('profile-overview');
const reviewOverview = document.getElementById('profile-edit');

window.addEventListener('load', async () => {
    const api = await fetch(`/restaurant/${window.location.pathname.split('/')[3]}`);
    const { status } = await api;
    const { restaurant } = await api.json();

    console.log(restaurant.Menus);

    if (status !== 200) return alert('데이터를 불러오는데 실패하였습니다.');

    restaurant.Menus.forEach((menu) => {
        menuOverview.innerHTML += `<div class="card mb-3">
                                    <div class="row g-0">
                                    <div class="col-md-2">
                                        <img src="${menu.image}" class="img-fluid rounded-start" alt="...">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                        <h5 class="card-title">${menu.name}</h5>
                                        <p class="card-text">${menu.price}원</p>
                                        <div class="input-group mb-3" style="max-width: 190px;">
                                            <input type="number" class="form-control" style="width: 50px;" value="0">
                                            <button type="button" class="btn btn-dark">장바구니 담기</button>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>`;
    });
});
