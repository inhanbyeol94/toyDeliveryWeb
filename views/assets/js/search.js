const searchKeyword = document.getElementById('searchKeyword');
const searchType = document.getElementById('search_type');
const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', async () => {
    let selectType = '';
    if (searchType.value == 'keyword') selectType = 'keyword';
    else if (searchType.value == 'menuName') selectType = 'menu';
    else if (searchType.value == 'category') selectType = 'category';
    const api = await fetch(`/search/${selectType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new searchData()),
    });
    const { status } = await api;
    const { search, errorMessage } = await api.json();

    if (status == 200) {
        alert(JSON.stringify(search));
        window.location.href = '/search';
    } else {
        alert(errorMessage);
    }
});
class searchData {
    constructor() {
        this.search = searchKeyword.value;
    }
}
