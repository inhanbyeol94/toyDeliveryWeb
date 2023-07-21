let cards = document.getElementById('cards');
const searchKeywordBtn = document.getElementById('searchKeywordBtn');

function getRestaurant(restaurants, searchType, keyword) {
    searchKeywordBtn.innerHTML = '';
    searchKeywordBtn.innerHTML = `<h3 class="title ps-5">${keyword}에 대한 ${searchType} 검색 결과입니다</h3>`;
    cards.innerHTML = '';

    for (let allRestaurant in restaurants) {
        for (let r of restaurants[allRestaurant]) {
            let keywordHtml = '';
            let allStar = 0;
            let count = 0;

            for (let i in r.restaurant_keyword[allRestaurant]) {
                keywordHtml += `<span class="badge rounded-pill text-bg-secondary">${r.restaurant_keyword[allRestaurant][i].keyword}</span>`;
                count++;
                //star를 가져올 수 없음
                // allStar += r.restaurant_star[allRestaurant][i].star;
            }
            if (allStar > 0) allStar = Math.round((allStar / count) * 10) / 10;
            else allStar = 0;
            // console.log(r.restaurant_star);
            // console.log(r.restaurant_star.length);
            let createHTML =
                `<div class="card storeCard m-3">
                                    <img src="${r.image}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                    <a  href="/restaurant/page/126?page=${r.restaurant_id}">
                                    <h5 class="card-title">${r.restaurant_name}</h5>
                                    </a>
                                    <div class="d-flex">
                                    <p class="card-rate">⭐️${allStar}</p>
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
