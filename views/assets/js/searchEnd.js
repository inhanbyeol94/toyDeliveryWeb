let cards = document.getElementById('cards');
const searchKeywordBtn = document.getElementById('searchKeywordBtn');

function getRestaurant(restaurants, searchType, keyword) {
    searchKeywordBtn.innerHTML = '';
    searchKeywordBtn.innerHTML = `<h3 class="title ps-5">${keyword}에 대한 ${searchType} 검색 결과입니다</h3>`;
    cards.innerHTML = '';

    for (let r of restaurants[0]) {
        console.log(r.restaurant_keyword[0]);
        let keywordHtml = '';
        for (let k in r.restaurant_keyword[0]) {
            keywordHtml += `<span class="badge rounded-pill text-bg-secondary">${r.restaurant_keyword[0][k].keyword}</span>`;
        }
        console.log(r.restaurant_id);
        let createHTML =
            `<div class="card storeCard m-3">
                                <img src="${r.image}" class="card-img-top" alt="...">
                                <div class="card-body">
                                <h5 class="card-title">${r.restaurant_name}</h5>
                                <div class="d-flex">
                                <p class="card-rate">⭐️ 5.0</p>
                                <div class="keyword-list ms-3">` +
            keywordHtml +
            `
                                </div>
                                </div>
                                <p class="card-text">${r.restaurant_number}</p>
                                <p class="card-text">${r.restaurant_address}</p>
                                <p class="card-text">${r.desc}</p>
                                </div>
                            </div>`;

        cards.innerHTML += createHTML;
    }
}

window.addEventListener('load', async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const value = urlParams.get('value').split(' ');

    const api = await fetch(`/search/${value[0]}/${value[1]}`, {
        method: 'GET',
    });
    const { status } = await api;
    const { search, errorMessage } = await api.json();
    if (status == 200) {
        getRestaurant([search], value[0], value[1]);
    } else {
        alert(errorMessage);
    }
});
