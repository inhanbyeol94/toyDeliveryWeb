const userEmail = document.getElementById('userEmail');
const userPassword = document.getElementById('userPassword');
const userGroup = document.getElementById('userGroup');
const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', async () => {
    if (!userGroup.value) return alert('구분을 선택해 주세요.');

    const apiUri = userGroup.value == 1 ? '/user/login' : '/admin/login';
    const api = await fetch(apiUri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new loginUser()),
    });
    const { status } = await api;
    const { message } = await api.json();

    if (status == 200) {
        window.location.href = '/';
    } else {
        alert(message);
    }
});

class loginUser {
    constructor() {
        this.email = userEmail.value;
        this.password = userPassword.value;
    }
}
