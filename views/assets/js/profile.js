const fullName = document.getElementById('fullName');
const Address = document.getElementById('Address');
const nickname = document.getElementById('nickname');
const Phone = document.getElementById('Phone');
const currentPassword = document.getElementById('currentPassword');
const SaveChangesBtn = document.getElementById('SaveChanges');
const newPassword = document.getElementById('newPassword');
const renewPassword = document.getElementById('renewPassword');
const changePwdBtn = document.getElementById('changePwdBtn');
const imageBtn = document.getElementById('imageBtn');
const profileImage = document.getElementById('profileImage');
const imageDelBtn = document.getElementById('imageDelBtn');
const point = document.getElementById('point');
const addPoint = document.getElementById('addPoint');
const addPointBtn = document.getElementById('addPointBtn');
const pointHistory = document.getElementById('pointHistory');

imageBtn.addEventListener('click', () => {
    profileImage.click();
});

imageDelBtn.addEventListener('click', async () => {
    const api = await fetch('/member_info/image', {
        method: 'DELETE',
    });
    const { status } = await api;
    const { message } = await api.json();

    alert(message);

    if (status == 200) {
        window.location.reload();
    }
});

profileImage.addEventListener('change', async (e) => {
    const image = e.target.files[0];
    const form = new FormData();
    form.append('image', image);

    const api = await fetch('/member_info/image', {
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

SaveChangesBtn.addEventListener('click', async () => {
    const api = await fetch(`/member_info`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new updateUser()),
    });
    const { status } = await api;
    const { message } = await api.json();

    if (status == 200) {
        alert(message);
        window.location.href = '/profile';
    } else {
        alert(message);
    }
});

class updateUser {
    constructor() {
        this.name = fullName.value;
        this.address = Address.value;
        this.nickname = nickname.value;
        this.phone = Phone.value;
    }
}

changePwdBtn.addEventListener('click', async () => {
    if (!currentPassword.value) return alert('현재 비밀번호를 입력해주세요.');
    if (!newPassword.value) return alert('변경할 비밀번호를 입력해주세요.');
    if (!renewPassword.value) return alert('변경 확인 비밀번호를 입력해주세요.');

    const api = await fetch(`/member_info/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new changePassword()),
    });
    const { status } = await api;
    const { message } = await api.json();

    if (status == 200) {
        alert(message);
        window.location.href = '/profile';
    } else {
        alert(message);
    }
});
class changePassword {
    constructor() {
        this.password = currentPassword.value;
        this.changePwd = newPassword.value;
        this.confirmPwd = renewPassword.value;
    }
}

/** point 부분 */
/** point get */
window.addEventListener('load', () => {
    getPoint();
    getPointHistory();
});
const getPoint = async () => {
    const api = await fetch(`/member_info/point`, {
        method: 'GET',
    });
    const { status } = await api;
    const { message, result } = await api.json();

    if (status == 200) {
        getPointHtml(result);
    } else {
        alert(message);
    }
};

const getPointHtml = (p) => {
    console.log(p.point);
    point.innerHTML = `<p>${p.point.toLocaleString()}</p>`;
};

/** point post */
addPointBtn.addEventListener('click', async () => {
    if (!addPoint.value) return alert('추가할 포인트를 입력해주세요.');

    const api = await fetch(`/member_info/point`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new changePoint()),
    });
    const { status } = await api;
    const { message } = await api.json();

    if (status == 201) {
        alert(message);
        window.location.reload();
    } else {
        alert(message);
    }
});

class changePoint {
    constructor() {
        this.point = Number(addPoint.value);
        this.point_status_code = 1;
        this.reason = '포인트를 추가하였습니다.';
    }
}

/** point history */
const getPointHistory = async () => {
    const api = await fetch(`/member_info/point/history`, {
        method: 'GET',
    });
    const { status } = await api;
    const { message, result } = await api.json();

    if (status == 200) {
        getPointHistoryHtml(result);
    } else {
        alert(message);
    }
};

const getPointHistoryHtml = (points) => {
    console.log(points);
    pointHistory.innerHTML = '';
    for (let point of points) {
        let createPointHTML = '';
        let pointCreateDate = point.created_at.split('T');
        if (point.point_status_code == 0) {
            createPointHTML = `<div class="row mb-3">
                                    <label for="addPoint" style="color:red;">${point.reason}</label>
                                    <div class="col-md-8 col-lg-9">
                                    - ${point.point.toLocaleString()}
                                    </div>
                                    <div class="col-md-8 col-lg-9">
                                    - ${pointCreateDate[0]}
                                    </div>
                                </div>`;
        } else {
            createPointHTML = `<div class="row mb-3">
                                    <label for="addPoint" >${point.reason}</label>
                                    <div class="col-md-8 col-lg-9">
                                    + ${point.point.toLocaleString()}
                                    </div>
                                    <div class="col-md-8 col-lg-9">
                                    - ${pointCreateDate[0]}
                                    </div>
                                </div>`;
        }

        pointHistory.innerHTML += createPointHTML;
    }
};
