const cardBox = document.querySelector('.cardBox');
const imageBtn = document.getElementById('imageBtn');
const profileImage = document.getElementById('profileImage');
const imageDelBtn = document.getElementById('imageDelBtn');
const cartModals = document.getElementById('cartModals');
const reviewDelBtn = document.querySelector('.reviewDelBtn');
const reviewSaveBtn = document.querySelector('.reviewSaveBtn');
const reviewImage = document.getElementById('reviewImg');
const reviewText = document.querySelector('#floatingTextarea2');
const rate = document.querySelector('#rate');

window.addEventListener('load', async () => {
    orderApiGet();
    imageClickBtn();
});

/** get order */
const orderApiGet = async () => {
    const api = await fetch(`/member/order`, {
        method: 'GET',
    });
    const { status } = await api;
    const { message, result } = await api.json();
    if (status == 200) {
        orderHtml(result);
    } else {
        alert(message);
    }
};

/** get order HTML */
const orderHtml = (order) => {
    for (let i in order) {
        const createOrderHtml = `<div class="card orderCard mb-5">
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src="${order[i].Restaurant.image || 'assets/img/card.jpg'}" class="img-fluid rounded-start" alt="...">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body pb-2">
                        <h5 id="restaurantId"class="card-title data-id="${order[i].restaurant_id}">${order[i].Restaurant.name}</h5>
                          <p class="card-text" id="orderId" data-id="${order[i].order_id}">${order[i].Cart.CartItems.map((a) => {
            return a.Menu.name;
        }).join(',')}
                          </p>
                          <div class="btnList">
                              <button type="button" class="btn btn-success btn-lg" data-bs-target="#cartModals"data-bs-toggle="modal">상세 정보</button>
                              <button type="button" class="btn btn-success btn-lg" data-bs-target="#modal"data-bs-toggle="modal">리뷰 수정</button>
                          </div>
                        </div>
                      </div>
                      </div>
                </div>`;

        cardBox.innerHTML += createOrderHtml;
        orderViewDetailModal(order[i]);
        reviewApiGet(order[i]);
    }
};

/** 주문 상세보기 모달 */
const orderViewDetailModal = (order) => {
    cartModals.innerHTML = '';
    let viewMenuHtml = '';
    let allPrice = 0;
    for (let i of order.Cart.CartItems) {
        allPrice += i.Menu.price * i.count;
        viewMenuHtml += `<li class="list-group-item my-2" id="itemLists">${i.Menu.name} (${i.count} 개)</li>`;
    }
    const createOrderDetailHtml =
        `<div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <div class="titleList mt-4">
                                                    <h5 class="cart-title" id="restaurantNames">${order.Restaurant.name}</h5>
                                                </div>
                                                <button type="button" class="btn-close" id="modal-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div>
                                                <!-- List group with active and disabled items -->
                                                <ul class="list-group list-group-flush">` +
        viewMenuHtml +
        `</ul>
                                                <!-- End Clean list group -->
                                            </div>
                                            <div class="modal-footer px-4 my-2 flex-column">
                                                <div class="d-flex justify-content-between">
                                                    <h4 style="font-weight: 600">총 결제금액</h4>
                                                    <h4 id="sumPrices"> ${allPrice.toLocaleString()}원</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;
    cartModals.innerHTML = createOrderDetailHtml;
};

/** 사진 수정 */
function imageClickBtn() {
    imageBtn.addEventListener('click', () => {
        profileImage.click();
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
        const { message } = await api.json();

        if (status == 200) {
            alert(message);
            window.location.reload();
        } else {
            alert(message);
        }
    });

    /** 사진 삭제 */
    imageDelBtn.addEventListener('click', async () => {
        const api = await fetch('/review/image', {
            method: 'DELETE',
        });
        const { status } = await api;
        const { message } = await api.json();

        alert(message);

        if (status == 200) {
            window.location.reload();
        }
    });
}

/** get review */
const reviewApiGet = async (order) => {
    //리뷰중 로그인한 멤버 전체 리뷰 조회 (리뷰 조회중 따로 order_id로 가져오는 것이 없음)
    //reviewId로도 찾고 싶으나 머리가 안돌아감.
    const api = await fetch(`/member/review`, {
        method: 'GET',
    });
    const { status } = await api;
    const { message, result } = await api.json();
    if (status == 200) {
        if (result) reviewModalHtml(result);
        reviewApiPost(order, result);
        reviewApiDel(order, result);
    } else {
        alert(message);
    }
};

/** review post */
const reviewApiPost = (order, review) => {
    let reviewData;
    if (review.reviewId) reviewData = review.reviewId;
    else reviewData = null;
    reviewSaveBtn.addEventListener('click', async () => {
        const api = await fetch(`/restaurant/${order.restaurant_id}/review/order/${order.order_id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new addReview()),
        });
        const { status } = await api;
        const { result } = await api.json();

        if (status == 201) {
            alert(result);
            window.location.reload();
        } else {
            alert(result);
        }
    });

    class addReview {
        constructor() {
            this.review_id = reviewData;
            this.image = null;
            this.review = reviewText.value;
            this.star = Number(rate.value);
        }
    }
};

/** review delete */
const reviewApiDel = (order, review) => {
    reviewDelBtn.addEventListener('click', async () => {
        const api = await fetch(`/restaurant/${order.restaurant_id}/review/${review.reviewId}`, {
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
};

/** 리뷰 모달 */
const reviewModalHtml = (review) => {
    reviewImage.src = review.image || 'assets/img/card.jpg';
    reviewText.value = review.review || '';
    rate.value = review.star || '';
};
