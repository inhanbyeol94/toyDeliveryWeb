/** 기본 배송지 영역 */
const deliveryUserName = document.getElementById('deliveryUserName');
const deliveryUserPhone = document.getElementById('deliveryUserPhone');
const deliveryUserAddress = document.getElementById('deliveryUserAddress');

/** 총 결제금액 */
const allPrice = document.getElementById('allPrice');

/** 장바구니 목록 테이블 */
const cartItemList = document.getElementById('cartItemList');
const orderRestaurantName = document.getElementById('orderRestaurantName');

/** 배송지 선택 테이블 */
const userAddressList = document.getElementById('userAddressList');
const closeSelectModalBtn = document.getElementById('closeSelectModalBtn');

/** 새로운 배송지 정보 */
const newUserName = document.getElementById('newUserName');
const newUserPhone = document.getElementById('newUserPhone');
const newUserAddress = document.getElementById('newUserAddress');
const newUserSubAddress = document.getElementById('newUserSubAddress');
const newDeliveryBtn = document.getElementById('newDeliveryBtn');

/** 주문하기 */
const createOrder = document.getElementById('createOrder');

window.addEventListener('load', async () => {
    const api = await fetch('/getCurrentCart');

    const { status } = await api;
    const { result } = await api.json();

    const [data, allPriceData] = result;

    if (status == 200) {
        /** 사용자 배달 주소지 목록 호출 */
        data.Member.MemberInfos.forEach((info) => {
            /** 기본 받는사람 정보 입력 */
            if (info.default == true) {
                deliveryUserName.value = info.name;
                deliveryUserPhone.value = info.phone;
                deliveryUserAddress.value = info.address;
                createOrder.setAttribute('data-delivery-info', info.member_info_id);

                userAddressList.innerHTML += `<tr>
                  <th scope="row" id="deliveryInfoName${info.member_info_id}">${info.name}</th>
                  <td id="deliveryInfoPhone${info.member_info_id}">${info.phone}</td>
                  <td id="deliveryInfoAddress${info.member_info_id}">${info.address}</td>
                  <td><a href="#" onclick="selectDeliveryInfo(${info.member_info_id})">선택</a></td>
                </tr>`;
            } else {
                userAddressList.innerHTML += `<tr>
                  <th scope="row" id="deliveryInfoName${info.member_info_id}">${info.name}</th>
                  <td id="deliveryInfoPhone${info.member_info_id}">${info.phone}</td>
                  <td id="deliveryInfoAddress${info.member_info_id}">${info.address}</td>
                  <td><a href="#" onclick="selectDeliveryInfo(${info.member_info_id})">선택</a> | <a href="#" onclick="defaultDeliveryInfo(${info.member_info_id})">설정</a></td>
                </tr>`;
            }
        });

        /** 장바구니 목록 호출 */
        data.CartItems.forEach((info) => {
            cartItemList.innerHTML += `<tr>
                      <th scope="row">${info.Menu.name}</th>
                      <td>${info.Menu.price.toLocaleString()}원</td>
                      <td>${info.count}개</td>
                      <td>${(info.Menu.price * info.count).toLocaleString()}원</td>
                      <td><a href="#" onclick="delCartItems(${info.cart_item_id})">X</a></td>
                    </tr>`;
        });

        /** 총 결제금액 호출 */
        allPrice.innerText = `${allPriceData.toLocaleString()}원`;
        orderRestaurantName.innerText = data.Restaurant.name;

        createOrder.setAttribute('data-cart', data.cart_id);
    }
});

const selectDeliveryInfo = (id) => {
    deliveryUserName.value = document.getElementById(`deliveryInfoName${id}`).innerText;
    deliveryUserPhone.value = document.getElementById(`deliveryInfoPhone${id}`).innerText;
    deliveryUserAddress.value = document.getElementById(`deliveryInfoAddress${id}`).innerText;
    createOrder.setAttribute('data-delivery-info', id);
    closeSelectModalBtn.click();
    alert('배송지를 변경하였습니다.');
};

const defaultDeliveryInfo = async (id) => {
    if (confirm('선택한 주소를 기본 주소지로 설정하시겠습니까?')) {
        const api = await fetch('/deliveryinfo', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ memberInfoId: id }),
        });

        const { status } = await api;
        const { message } = await api.json();

        alert(message);

        if (status == 200) return window.location.reload();
    }
};

createOrder.addEventListener('click', async () => {
    const cartId = createOrder.getAttribute('data-cart');
    const deliveryinfo = createOrder.getAttribute('data-delivery-info');
    const api = await fetch(`/restaurant/cart/${cartId}/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deliveryInfoId: deliveryinfo }),
    });

    const { status } = await api;
    const { message } = await api.json();

    alert(message);

    if (status == 200) return window.location.reload();
});

const delCartItems = async (cartItemId) => {
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

newDeliveryBtn.addEventListener('click', async () => {
    if (!newUserAddress.value) return alert('주소를 입력해 주세요.');
    if (!newUserSubAddress.value) return alert('상세주소를 입력해 주세요.');

    const api = await fetch('/deliveryinfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new createDeliveryInfo()),
    });

    const { status } = await api;
    const { message } = await api.json();

    alert(message);

    if (status == 200) return window.location.reload();
});

newUserAddress.addEventListener('click', () => {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var jibunAddr = data.jibunAddress; // 지번 주소 변수
            // 우편번호와 주소 정보를 해당 필드에 넣는다.

            if (roadAddr !== '') {
                document.getElementById('newUserAddress').value = roadAddr;
            } else if (jibunAddr !== '') {
                document.getElementById('newUserAddress').value = jibunAddr;
            }
        },
    }).open();
});

class createDeliveryInfo {
    constructor() {
        this.name = newUserName.value.trim();
        this.phone = newUserPhone.value.trim();
        this.address = `${newUserAddress.value} ${newUserSubAddress.value}`.trim();
    }
}
