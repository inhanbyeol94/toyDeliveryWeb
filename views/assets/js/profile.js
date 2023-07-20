const fullName = document.getElementById('fullName');
const Address = document.getElementById('Address');
const nickname = document.getElementById('nickname');
const Phone = document.getElementById('Phone');
const currentPassword = document.getElementById('currentPassword');
const SaveChangesBtn = document.getElementById('SaveChanges');
const newPassword = document.getElementById('newPassword');
const renewPassword = document.getElementById('renewPassword');
const changePwdBtn = document.getElementById('changePwdBtn');

SaveChangesBtn.addEventListener('click', async () => {
    const api = await fetch(`/member_info`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new updateUser()),
    });
    const { status } = await api;
    const { result } = await api.json();

    if (status == 200) {
        alert(result);
        window.location.href = '/profile';
    } else {
        alert(result);
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
    const { result } = await api.json();

    if (status == 200) {
        alert(result);
        window.location.href = '/profile';
    } else {
        alert(result);
    }
});
class changePassword {
    constructor() {
        this.password = currentPassword.value;
        this.changePwd = newPassword.value;
        this.confirmPwd = renewPassword.value;
    }
}
