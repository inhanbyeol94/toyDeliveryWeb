const restaurantName = document.getElementById('restaurantName');
const itemList = document.getElementById('itemList');
const sumPrice = document.getElementById('sumPrice');
const footerModal = document.getElementById('footerModal');

window.addEventListener('load', async () => {
    const api = await fetch('/getCurrentCart');

    const { status } = await api;
    if (status == 200) {
        const { result } = await api.json();
        const [data, price] = result;

        restaurantName.innerText = data.Restaurant.name;
        sumPrice.innerText = `${price.toLocaleString()}원`;

        data.CartItems.forEach((info) => {
            itemList.innerHTML += `<div class="d-flex justify-content-between">
                              <span>${info.Menu.name}</span>
                              <span>${info.count}개</span>
                              <span>${info.Menu.price.toLocaleString()}원</span>
                              <span>${(info.Menu.price * info.count).toLocaleString()}원</span>
                              <a href="#" onclick="delItems(${info.cart_item_id})">X</a>
                          </div>`;
        });
    } else {
        restaurantName.innerText = '장바구니';
        itemList.innerHTML = '장바구니가 비어있습니다.';
        footerModal.remove();
    }
});

const delItems = async (cartItemId) => {
    const api = await fetch(`/restaurant/${cartItemId}/cart`, {
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
};
