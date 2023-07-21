window.onload = async () => {
    const cardBox = document.querySelector('.cardBox');
    const imageBtn = document.getElementById('imageBtn');
    const profileImage = document.getElementById('profileImage');
    const imageDelBtn = document.getElementById('imageDelBtn');
    const reviewDelBtn = document.querySelector('.reviewDelBtn');
    const reviewSaveBtn = document.querySelector('.reviewSaveBtn');
    const reviewText = document.querySelector('#floatingTextarea2');
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
                    <h5 class="card-title data-id="${shop.restaurant_id}">${shop.Restaurant.name}</h5>
                      <p class="card-text">${shop.Cart.CartItems.map((a) => {
                          return a.Menu.name;
                      }).join(',')}
                      </p>
                      <div class="btnList">
                          <button type="button" class="btn btn-success btn-lg" data-bs-target="#modal"data-bs-toggle="modal">리뷰 수정</button>
                          <button type="button" class="btn btn-secondary btn-lg" data-bs-target="#exampleModal"data-bs-toggle="modal" >상세보기</button>
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
        const api = await fetch(`/restaurant/:${re}/review/:review_id`, {
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
        const api = await fetch(`/restaurant/${restaurant_id}/review/order/${order_id}`, {
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
};
