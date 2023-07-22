let cards = document.getElementById('cards');
const searchKeywordBtn = document.getElementById('searchKeywordBtn');

function getRestaurant(restaurants, searchType, keyword) {
    searchKeywordBtn.innerHTML = '';
    searchKeywordBtn.innerHTML = `<h3 class="title ps-5">${keyword}에 대한 ${searchType} 검색 결과입니다</h3>`;
    cards.innerHTML = '';

    for (let r in restaurants) {
        let createKeywordList = '';
        for (let i in restaurants[r].restaurantKeyword[r]) {
            let item = restaurants[r].restaurantKeyword[r][i].keyword;
            createKeywordList += `<span class="badge rounded-pill text-bg-secondary">${item}</span>`;
        }
        /** 별점 계산 */
        let allStar = 0;
        let count = 0;
        for (let i in restaurants[r].restaurantStar[r]) {
            allStar += restaurants[r].restaurantStar[r][i].star;
            count++;
        }
        allStar = Math.round((allStar / count) * 10) / 10;
        let createHTML =
            `<div class="card storeCard m-3">
                                    <img src="${restaurants[r].restaurantImage || ''}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                    <a  href="/restaurant/page/${restaurants[r].restaurantId}">
                                    <h5 class="card-title">${restaurants[r].restaurantName}</h5>
                                    </a>
                                    <div class="d-flex">
                                    <p class="card-rate">⭐️ ${allStar}</p>
                                    <div class="keyword-list ms-3">` +
            createKeywordList +
            `
                                    </div>
                                    </div>
                                    <p class="card-text">${restaurants[r].restaurantNumber}</p>
                                    <p class="card-text">${restaurants[r].restaurantAddress}</p>
                                    <p class="card-text">${restaurants[r].desc}</p>
                                    </div>
                                </div>`;

        cards.innerHTML += createHTML;
    }
}

window.addEventListener('load', async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const value = urlParams.get('value').split(' ');

    //한글깨짐은 인코딩, 디코딩으로 처리
    const encodeSearch = encodeURI(encodeURIComponent(value[1]));
    const api = await fetch(`/search/${value[0]}/${encodeSearch}`, {
        method: 'GET',
    });
    const { status } = await api;
    const { message, result } = await api.json();
    if (status == 200) {
        const decodeSearch = decodeURI(decodeURIComponent(value[1]));
        getRestaurant(result, value[0], decodeSearch);
    } else {
        alert(message);
    }
});
