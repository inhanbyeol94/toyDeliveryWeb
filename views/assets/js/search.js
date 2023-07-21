const searchKeyword = document.getElementById('searchKeyword');
const searchType = document.getElementById('search_type');
const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', async () => {
    let selectType = '';
    if (searchType.value == 'keyword') selectType = 'keyword';
    else if (searchType.value == 'menuName') selectType = 'menu';

    const api = await fetch(`/search/${selectType}/${searchKeyword.value}`, {
        method: 'GET',
    });
    const { status } = await api;
    const { search, errorMessage } = await api.json();
    console.log(status, [search]);
    console.log([search].length);
    console.log([search][0][0]);
    if (status == 200) {
        window.location.href = `/storeList?value=${selectType} ${searchKeyword.value}`;
    } else {
        alert(errorMessage);
    }
});
