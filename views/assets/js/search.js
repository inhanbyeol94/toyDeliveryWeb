const searchKeyword = document.getElementById('searchKeyword');
const searchType = document.getElementById('search_type');
const searchBtn = document.getElementById('searchBtn');
let cards = document.getElementById('cards');

searchBtn.addEventListener('click', async () => {
    let selectType = '';
    if (searchType.value == 'keyword') selectType = 'keyword';
    else if (searchType.value == 'menuName') selectType = 'menu';
    else if (searchType.value == 'category') selectType = 'category';
    const api = await fetch(`/search/${selectType}/${searchKeyword.value}`, {
        method: 'GET',
    });
    const { status } = await api;
    const { search, errorMessage } = await api.json();

    if (status == 200) {
        alert('search', search);
        window.location.href = '/search';
    } else {
        alert(errorMessage);
    }
});

// function getRestaurants(restaurants) {
//     // cards.innerHTML = '';
//     restaurants.forEach((r) => {
//         let createHTML = `<div class="card" style="margin-right: 3%;">
//                             <img src="${r.image}" class="card-img-top" alt="...">
//                             <div class="card-body">
//                             <h5 class="card-title">${r.restaurant_name}</h5>
//                             <p class="card-text">${r.restaurant_number}</p>
//                             <p class="card-text">${r.restaurant_address}</p>
//                             <p class="card-text">${r.desc}</p>
//                             </div>
//                         </div>`;
//         cards.innerHTML += createHTML;
//     });
// }
