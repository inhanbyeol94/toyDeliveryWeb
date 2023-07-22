const searchKeyword = document.getElementById('searchKeyword');
const searchType = document.getElementById('search_type');
const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', async () => {
    let selectType = '';
    if (searchType.value == 'keyword') selectType = 'keyword';
    else if (searchType.value == 'menuName') selectType = 'menu';

    //한글깨짐은 인코딩, 디코딩으로 처리
    const encodeSearch = encodeURI(encodeURIComponent(searchKeyword.value));
    const api = await fetch(`/search/${selectType}/${encodeSearch}`, {
        method: 'GET',
    });

    const { status } = await api;
    const { message, result } = await api.json();
    console.log(status, result);
    if (status == 200) {
        window.location.href = `/storeList?value=${selectType} ${searchKeyword.value}`;
    } else {
        alert(message);
    }
});
