window.onload = async () => {
    //문제
    // 이미지가 올라간다고 팝업이 뜨는데 바뀌지 않음 서버에 저장도 안됨
    //리뷰 저장, 삭제 파트의 레포지토리를 수정해야힘
    // 상세보기는 저는 버렸지만 누군가 좋은 아이디어가 떠오른다면 해주십샤.........
    const cardBox = document.querySelector('.cardBox');
    const imageBtn = document.getElementById('imageBtn');
    const profileImage = document.getElementById('profileImage');
    const imageDelBtn = document.getElementById('imageDelBtn');
    const reviewDelBtn = document.querySelector('.reviewDelBtn');
    const reviewSaveBtn = document.querySelector('.reviewSaveBtn');
    const reviewText = document.querySelector('#floatingTextarea2');
    // const restaurantNames = document.getElementById('restaurantNames');
    // const itemLists = document.getElementById('itemLists');
    // const sumPrices = document.getElementById('sumPrices');
    const rate = document.querySelector('#rate');
    let rateValue;

    await fetch('/member/order', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => response.json())
        .then((data) => {
            const orderList = data.data;
            orderList.forEach((shop) => {
                console.log(shop);
                cardBox.innerHTML += `<div class="card orderCard mb-5">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${shop.Restaurant.image || 'assets/img/card.jpg'}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body pb-2">
                    <h5 id="restaurantId"class="card-title data-id="${shop.restaurant_id}">${shop.Restaurant.name}</h5>
                      <p class="card-text" id="orderId" data-id="${shop.order_id}">${shop.Cart.CartItems.map((a) => {
                    return a.Menu.name;
                }).join(',')}
                      </p>
                      <div class="btnList">
                          <button type="button" class="btn btn-success btn-lg" data-bs-target="#modal"data-bs-toggle="modal">리뷰 수정</button>
                      </div>
                    </div>
                  </div>
                  </div>
            </div>`;
            });
        })
        .catch((err) => alert(err.errorMessage));

    imageBtn.addEventListener('click', () => {
        profileImage.click();
    });

    imageDelBtn.addEventListener('click', async () => {
        const api = await fetch('/review/image', {
            method: 'DELETE',
        });
        const { status } = await api;
        const { result } = await api.json();

        alert(result);

        if (status == 200) {
            window.location.reload();
        }
    });
    rate.addEventListener('change', async (e) => {
        rateValue = e.target.value;
    });
    profileImage.addEventListener('change', async (e) => {
        const image = e.target.files[0];
        const form = new FormData();
        form.append('image', image);

        const api = await fetch('/review/image', {
            method: 'POST',
            body: form,
        });

        const { status } = await api;
        const { result } = await api.json();

        if (status == 200) {
            alert(result);
            window.location.reload();
        } else {
            alert(result);
        }
    });
    reviewDelBtn.addEventListener('click', async () => {
        const orderBox = document.querySelector('#orderBox');
        const order_id = orderBox.data.id;

        const api = await fetch(`/review/order/${order_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        const { status } = await api;
        const { result } = await api.json();

        if (status == 200) {
            alert(result);
            window.location.reload();
        } else {
            alert(result);
        }
    });
    reviewSaveBtn.addEventListener('click', async () => {
        const orderBox = document.querySelector('#orderBox');
        const order_id = orderBox.data.id;

        const api = await fetch(`/review/order/${order_id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new addReview()),
        });
        const { status } = await api;
        const { result } = await api.json();

        if (status == 200) {
            alert(result);
            window.location.reload();
        } else {
            alert(result);
        }
    });
    class addReview {
        constructor() {
            this.review = reviewText.value;
            this.rate = Number(rateValue);
        }
    }
    // const api = await fetch('/getRecentCart');
    // const { result } = await api.json();
    // const [data, price] = result;

    // restaurantNames.innerText = data.Restaurant.name;
    // sumPrices.innerText = `${price.toLocaleString()}원`;

    // data.CartItems.forEach((info) => {
    //     itemLists.innerHTML += `<div class="d-flex justify-content-between">
    //                           <span>${info.Menu.name}</span>
    //                           <span>${info.count}개</span>
    //                           <span>${info.Menu.price.toLocaleString()}원</span>
    //                       </div>`;
    // });
};
