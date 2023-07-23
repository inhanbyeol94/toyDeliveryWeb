/** 대기 */
const pillsPendingList = document.getElementById('pills-pending');
const pendingModalTitle = document.getElementById('pending-modal-title');
const pendingModalSubTitle = document.getElementById('pending-modal-subtitle');
const pendingModalList = document.getElementById('pending-modal-list');
const pendingModalAllPrice = document.getElementById('pending-modal-all-price');
const pendingModalRefusalBtn = document.getElementById('pending-modal-order-refusal-btn');
const pendingModalBtn = document.getElementById('pending-modal-order-btn');
const timeInput = document.getElementById('timeInput');

/** 조리시작 */
const pillsCookingList = document.getElementById('pills-cooking');
const cookingModalTitle = document.getElementById('cooking-modal-title');
const cookingModalSubTitle = document.getElementById('cooking-modal-subtitle');
const cookingModalList = document.getElementById('cooking-modal-list');
const cookingModalAllPrice = document.getElementById('cooking-modal-all-price');
const cookingModalBtn = document.getElementById('cooking-modal-order-btn');

/** 배달시작 */
const pillsDeliveryList = document.getElementById('pills-delivery');

/** 배달완료 */
const pillsCompletedList = document.getElementById('pills-completed');

window.addEventListener('load', async () => {
    const api = await fetch('/restaurant/order');

    const { status } = await api;

    if (status == 200) {
        const { result } = await api.json();

        result.forEach((info) => {
            switch (info.status) {
                case 1:
                    pillsPendingList.innerHTML += `<div class="card orderCard my-5 d-flex justify-content-between flex-row">
                <div class="w-auto">
                  <div class="card-body p-3 ps-4">
                    <h4 class="card-title mb-0">메뉴 ${info.Cart.CartItems.length}개 ${info.Cart.CartItems.map((x) => x.Menu.price * x.count)
                        .reduce((a, b) => a + b)
                        .toLocaleString()}원</h4>
                    <ul>
                    ${info.Cart.CartItems.map((x) => `<li class="card-text">${x.Menu.name} ${x.count}개</li>`).join('')}
                    </ul>
                    <br>
                    <span>${info.MemberInfo.name} | ${info.MemberInfo.phone}</span><br>
                    <span style="color:gray; font-size:13px">${info.MemberInfo.address}</span>
                  </div>
                </div>
                <div class="w-auto">
                  <button class="orderBtn" data-bs-toggle="modal" data-bs-target="#ExtralargeModal" onclick="getPillsPending(${
                      info.order_id
                  })">접수 및 취소</button>
                </div>
              </div>`;
                    break;
                case 2:
                    pillsCookingList.innerHTML += `<div class="card orderCard my-5 d-flex justify-content-between flex-row">
                <div class="w-auto">
                  <div class="card-body p-3 ps-4">
                    <h4 class="card-title mb-0">메뉴 ${info.Cart.CartItems.length}개 ${info.Cart.CartItems.map((x) => x.Menu.price * x.count)
                        .reduce((a, b) => a + b)
                        .toLocaleString()}원</h4>
                    <ul>
                    ${info.Cart.CartItems.map((x) => `<li class="card-text">${x.Menu.name} ${x.count}개</li>`).join('')}
                    </ul>
                    <br>
                    <span>${info.MemberInfo.name} | ${info.MemberInfo.phone}</span><br>
                    <span style="color:gray; font-size:13px">${info.MemberInfo.address}</span>
                  </div>
                </div>
                <div class="w-auto">
                  <button class="orderBtn" data-bs-toggle="modal" data-bs-target="#cookingModal" onclick="getPillsCooking(${
                      info.order_id
                  })">배달시작</button>
                </div>
              </div>`;
                    break;
                case 3:
                    pillsDeliveryList.innerHTML += `<div class="card orderCard my-5 d-flex justify-content-between flex-row">
                <div class="w-auto">
                  <div class="card-body p-3 ps-4">
                    <h4 class="card-title mb-0">메뉴 ${info.Cart.CartItems.length}개 ${info.Cart.CartItems.map((x) => x.Menu.price * x.count)
                        .reduce((a, b) => a + b)
                        .toLocaleString()}원</h4>
                    <ul>
                    ${info.Cart.CartItems.map((x) => `<li class="card-text">${x.Menu.name} ${x.count}개</li>`).join('')}
                    </ul>
                    <br>
                    <span>${info.MemberInfo.name} | ${info.MemberInfo.phone}</span><br>
                    <span style="color:gray; font-size:13px">${info.MemberInfo.address}</span>
                  </div>
                </div>
                <div class="w-auto">
                  <button class="orderBtn" onclick="delivery(${info.order_id})">배달완료</button>
                </div>
              </div>`;
                    break;

                case 4:
                    pillsCompletedList.innerHTML += `<div class="card orderCard my-5 d-flex justify-content-between flex-row">
                <div class="w-auto">
                  <div class="card-body p-3 ps-4">
                    <h4 class="card-title mb-0">메뉴 ${info.Cart.CartItems.length}개 ${info.Cart.CartItems.map((x) => x.Menu.price * x.count)
                        .reduce((a, b) => a + b)
                        .toLocaleString()}원</h4>
                    <ul>
                    ${info.Cart.CartItems.map((x) => `<li class="card-text">${x.Menu.name} ${x.count}개</li>`).join('')}
                    </ul>
                    <br>
                    <span>${info.MemberInfo.name} | ${info.MemberInfo.phone}</span><br>
                    <span style="color:gray; font-size:13px">${info.MemberInfo.address}</span>
                  </div>
                </div>
              </div>`;
                    break;
            }
        });
    }
});

const delivery = async (orderId) => {
    const api = await fetch(`/restaurant/${orderId}/order`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new updateData(4, -1)),
    });

    const { status } = await api;
    const { message } = await api.json();

    alert(message);
    if (status == 200) return window.location.reload();
};

const getPillsCooking = async (orderId) => {
    const api = await fetch(`/restaurant/order/${orderId}`);

    const { status } = await api;
    const { result } = await api.json();

    if (status == 200) {
        cookingModalBtn.setAttribute('data-id', orderId);

        cookingModalList.innerHTML = '';

        cookingModalTitle.innerHTML = `메뉴 ${result.Cart.CartItems.length}개 ${result.Cart.CartItems.map((x) => x.Menu.price * x.count)
            .reduce((a, b) => a + b)
            .toLocaleString()}원`;

        cookingModalSubTitle.innerHTML = `<br>${result.MemberInfo.name} | ${result.MemberInfo.phone}<br><span style="font-size:13px; color:grey;">${result.MemberInfo.address}</span>`;
        cookingModalAllPrice.innerHTML = `${result.Cart.CartItems.map((x) => x.Menu.price * x.count)
            .reduce((a, b) => a + b)
            .toLocaleString()}원`;

        result.Cart.CartItems.forEach((info) => {
            cookingModalList.innerHTML += `<li class="list-group-item my-2">
                <div class="d-flex justify-content-between">
                  <h4>${info.Menu.name}</h4>
                  <h4>${(info.Menu.price * info.count).toLocaleString()}원</h4>
                </div>
              </li>`;
        });
    }
};

const getPillsPending = async (orderId) => {
    const api = await fetch(`/restaurant/order/${orderId}`);

    const { status } = await api;
    const { result } = await api.json();

    if (status == 200) {
        pendingModalRefusalBtn.setAttribute('data-id', orderId);
        pendingModalBtn.setAttribute('data-id', orderId);

        pendingModalList.innerHTML = '';

        pendingModalTitle.innerHTML = `메뉴 ${result.Cart.CartItems.length}개 ${result.Cart.CartItems.map((x) => x.Menu.price * x.count)
            .reduce((a, b) => a + b)
            .toLocaleString()}원`;

        pendingModalSubTitle.innerHTML = `<br>${result.MemberInfo.name} | ${result.MemberInfo.phone}<br><span style="font-size:13px; color:grey;">${result.MemberInfo.address}</span>`;
        pendingModalAllPrice.innerHTML = `${result.Cart.CartItems.map((x) => x.Menu.price * x.count)
            .reduce((a, b) => a + b)
            .toLocaleString()}원`;

        result.Cart.CartItems.forEach((info) => {
            pendingModalList.innerHTML += `<li class="list-group-item my-2">
                <div class="d-flex justify-content-between">
                  <h4>${info.Menu.name}</h4>
                  <h4>${(info.Menu.price * info.count).toLocaleString()}원</h4>
                </div>
              </li>`;
        });
    }
};

cookingModalBtn.addEventListener('click', async () => {
    const orderId = cookingModalBtn.getAttribute('data-id');

    const api = await fetch(`/restaurant/${orderId}/order`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new updateData(3, -1)),
    });

    const { status } = await api;
    const { message } = await api.json();

    alert(message);
    if (status == 200) return window.location.reload();
});

pendingModalRefusalBtn.addEventListener('click', async () => {
    const orderId = pendingModalRefusalBtn.getAttribute('data-id');

    const api = await fetch(`/restaurant/${orderId}/order`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new updateData(0, new Date())),
    });

    const { status } = await api;
    const { message } = await api.json();

    alert(message);
    if (status == 200) return window.location.reload();
});

pendingModalBtn.addEventListener('click', async () => {
    const orderId = pendingModalBtn.getAttribute('data-id');
    const arrivalDatetime = timeInput.value;

    const api = await fetch(`/restaurant/${orderId}/order`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new updateData(2, arrivalDatetime)),
    });

    const { status } = await api;
    const { message } = await api.json();

    alert(message);
    if (status == 200) return window.location.reload();
});

class updateData {
    constructor(status, addTime) {
        this.statusNum = status;
        this.addTime = addTime;
    }
}
