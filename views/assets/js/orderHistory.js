// window.onload = async () => {
//     //문제
//     // 이미지가 올라간다고 팝업이 뜨는데 바뀌지 않음 서버에 저장도 안됨
//     //리뷰 저장, 삭제 파트의 레포지토리를 수정해야힘
//     // 상세보기는 저는 버렸지만 누군가 좋은 아이디어가 떠오른다면 해주십샤.........
//     const cardBox = document.querySelector('.cardBox');
//     const imageBtn = document.getElementById('imageBtn');
//     const profileImage = document.getElementById('profileImage');
//     const imageDelBtn = document.getElementById('imageDelBtn');
//     const reviewDelBtn = document.querySelector('.reviewDelBtn');
//     const reviewSaveBtn = document.querySelector('.reviewSaveBtn');
//     const reviewText = document.querySelector('#floatingTextarea2');
//     // const restaurantNames = document.getElementById('restaurantNames');
//     // const itemLists = document.getElementById('itemLists');
//     // const sumPrices = document.getElementById('sumPrices');
//     const rate = document.querySelector('#rate');
//     let rateValue;

//     await fetch('/member/order', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             const orderList = data.data;
//             orderList.forEach((shop) => {
//                 console.log(shop);
//                 cardBox.innerHTML += `<div class="card orderCard mb-5">
//                 <div class="row g-0">
//                   <div class="col-md-4">
//                     <img src="${shop.Restaurant.image || 'assets/img/card.jpg'}" class="img-fluid rounded-start" alt="...">
//                   </div>
//                   <div class="col-md-8">
//                     <div class="card-body pb-2">
//                     <h5 id="restaurantId"class="card-title data-id="${shop.restaurant_id}">${shop.Restaurant.name}</h5>
//                       <p class="card-text" id="orderId" data-id="${shop.order_id}">${shop.Cart.CartItems.map((a) => {
//                     return a.Menu.name;
//                 }).join(',')}
//                       </p>
//                       <div class="btnList">
//                           <button type="button" class="btn btn-success btn-lg" data-bs-target="#modal"data-bs-toggle="modal">리뷰 수정</button>
//                       </div>
//                     </div>
//                   </div>
//                   </div>
//             </div>`;
//             });
//         })
//         .catch((err) => alert(err.errorMessage));

//     imageBtn.addEventListener('click', () => {
//         profileImage.click();
//     });

//     imageDelBtn.addEventListener('click', async () => {
//         const api = await fetch('/review/image', {
//             method: 'DELETE',
//         });
//         const { status } = await api;
//         const { result } = await api.json();

//         alert(result);

//         if (status == 200) {
//             window.location.reload();
//         }
//     });
//     rate.addEventListener('change', async (e) => {
//         rateValue = e.target.value;
//     });
//     profileImage.addEventListener('change', async (e) => {
//         const image = e.target.files[0];
//         const form = new FormData();
//         form.append('image', image);

//         const api = await fetch('/review/image', {
//             method: 'POST',
//             body: form,
//         });

//         const { status } = await api;
//         const { result } = await api.json();

//         if (status == 200) {
//             alert(result);
//             window.location.reload();
//         } else {
//             alert(result);
//         }
//     });
//     reviewDelBtn.addEventListener('click', async () => {
//         const orderBox = document.querySelector('#orderBox');
//         const order_id = orderBox.data.id;

//         const api = await fetch(`/review/order/${order_id}`, {
//             method: 'DELETE',
//             headers: { 'Content-Type': 'application/json' },
//         });
//         const { status } = await api;
//         const { result } = await api.json();

//         if (status == 200) {
//             alert(result);
//             window.location.reload();
//         } else {
//             alert(result);
//         }
//     });
//     reviewSaveBtn.addEventListener('click', async () => {
//         const orderBox = document.querySelector('#orderBox');
//         const order_id = orderBox.data.id;

//         const api = await fetch(`/review/order/${order_id}`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(new addReview()),
//         });
//         const { status } = await api;
//         const { result } = await api.json();

//         if (status == 200) {
//             alert(result);
//             window.location.reload();
//         } else {
//             alert(result);
//         }
//     });
//     class addReview {
//         constructor() {
//             this.review = reviewText.value;
//             this.rate = Number(rateValue);
//         }
//     }
//     // const api = await fetch('/getRecentCart');
//     // const { result } = await api.json();
//     // const [data, price] = result;

//     // restaurantNames.innerText = data.Restaurant.name;
//     // sumPrices.innerText = `${price.toLocaleString()}원`;

//     // data.CartItems.forEach((info) => {
//     //     itemLists.innerHTML += `<div class="d-flex justify-content-between">
//     //                           <span>${info.Menu.name}</span>
//     //                           <span>${info.count}개</span>
//     //                           <span>${info.Menu.price.toLocaleString()}원</span>
//     //                       </div>`;
//     // });
// };
const cardBox = document.querySelector('.cardBox');
const imageBtn = document.getElementById('imageBtn');
const profileImage = document.getElementById('profileImage');
const imageDelBtn = document.getElementById('imageDelBtn');
const cartModals = document.getElementById('cartModals');
const reviewModal = document.getElementById('modal');
const reviewDelBtn = document.querySelector('.reviewDelBtn');
const reviewSaveBtn = document.querySelector('.reviewSaveBtn');

window.addEventListener('load', async () => {
    orderApiGet();
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
        reviewApiGet(order[i].order_id);
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
imageBtn.addEventListener('click', () => {
    console.log('imageBtn click');
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

/** get review */
const reviewApiGet = async (orderId) => {
    //리뷰중 로그인한 멤버 전체 리뷰 조회 (리뷰 조회중 따로 order_id로 가져오는 것이 없음)
    //reviewId로도 찾고 싶으나 머리가 안돌아감.
    const api = await fetch(`/member/review`, {
        method: 'GET',
    });
    const { status } = await api;
    const { message, result } = await api.json();
    if (status == 200) {
        reviewModalHtml(result);
        reviewApiUpdate(result);
        reviewApiDel(result);
    } else {
        alert(message);
    }
};

/** review post */
const reviewApiUpdate = (review) => {
    reviewSaveBtn.addEventListener('click', async () => {
        const api = await fetch(`/review/order/${review.orderId}`, {
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
            this.review = review.review;
            this.rate = review.star;
        }
    }
};

/** review delete */

const reviewApiDel = (review) => {
    console.log('reviewDel', review.orderId);
    reviewDelBtn.addEventListener('click', async () => {
        console.log('reviewDel', review.orderId);
        const api = await fetch(`/review/order/${review.orderId}`, {
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
    reviewModal.innerHTML = '';
    let selectStar = '';
    if (review.star == 1) selectStar = '⭐️';
    else if (review.star == 2) selectStar = '⭐️⭐️';
    else if (review.star == 3) selectStar = '⭐️⭐️⭐️';
    else if (review.star == 4) selectStar = '⭐️⭐️⭐️⭐️';
    else if (review.star == 5) selectStar = '⭐️⭐️⭐️⭐️⭐️';
    const createReviewHtml = `<div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <div class="row mb-3 justify-content-center">
                                    <div class="col-md-8 col-lg-9 ">
                                        <img src="${review.image || 'assets/img/card.jpg'}" alt="Profile" id="reviewImg"class="rounded">
                                        <div class="pt-2">
                                        <a href="#" class="btn btn-primary btn" title="Upload new profile image"><i
                                            class="bi bi-upload" id="imageBtn"></i></a>
                                        <input type="file" style="display:none" id="profileImage"
                                            accept="image/gif, image/png, image/jpg, image/jpeg">
                                        <a href="#" class="btn btn-danger btn" title="Remove my profile image"
                                            id="imageDelBtn"><i class="bi bi-trash"></i></a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div class="modal-body d-flex flex-column w-100">
                                    <select class="form-select form-select-lg mb-3"id="rate" aria-label=".form-select-lg example">
                                        <option selected hidden>${selectStar || '별점을 선택해주세요'}</option>
                                        <option value="1">⭐️</option>
                                        <option value="2">⭐️⭐️</option>
                                        <option value="3">⭐️⭐️⭐️</option>
                                        <option value="4">⭐️⭐️⭐️⭐️</option>
                                        <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
                                        </select>
                                        
                                    <div class="form-floating">
                                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px">${
                                            review.review || ''
                                        }</textarea>
                                        <label for="floatingTextarea2">음식은 어떠셨나요?</label>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn modalBtn reviewDelBtn" style="background-color:#d62828;">삭제</button>
                                    <button type="button" class="btn modalBtn reviewSaveBtn"style="background-color:#2a9d8f;">저장</button>
                                </div>
                                </div>
                            </div>`;
    reviewModal.innerHTML = createReviewHtml;
};
