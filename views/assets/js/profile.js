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

imageBtn.addEventListener('click', () => {
    profileImage.click();
});

imageDelBtn.addEventListener('click', async () => {
    const api = await fetch('/member_info/image', {
        method: 'DELETE',
    });
    const { status } = await api;
    const { result } = await api.json();

    alert(result);

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
