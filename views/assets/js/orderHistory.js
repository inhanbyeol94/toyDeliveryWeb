window.onload = async () => {
    await fetch('/member/order', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => response.json())
        .then((data) => {
            const temp_html = `            
        <div class="card orderCard mb-5">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="assets/img/card.jpg" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body pb-2">
                  <h5 class="card-title">${data.restaurantName}</h5>
                  <p class="card-text">${data.menuName}</p>
                  <div class="btnList">
                      <button type="button" class="btn btn-success btn-lg" data-bs-target="#modal"data-bs-toggle="modal">리뷰 수정</button>
                      <button type="button" class="btn btn-secondary btn-lg" data-bs-target="#exampleModal"data-bs-toggle="modal" >상세보기</button>
                  </div>
                </div>
              </div>
              </div>
        </div>`;
        })
        .catch((err) => alert(err.errorMessage));
    await fetch('/member/review', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => response.json())
        .then((data) => {
            return console.log('리뷰내용', data);
        })
        .catch((err) => alert(err.errorMessage));
};
