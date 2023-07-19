const userEmail = document.getElementById('userEmail');
const authBtn = document.getElementById('authBtn');
const authCode = document.getElementById('authCode');
const authCodeBox = document.getElementById('authCodeBox');
const userPassword = document.getElementById('userPassword');
const userConfirmPassword = document.getElementById('userConfirmPassword');
const userNickname = document.getElementById('userNickname');
const userName = document.getElementById('userName');
const userPhone = document.getElementById('userPhone');
const userAddress = document.getElementById('userAddress');
const userSubAddress = document.getElementById('userSubAddress');
const createBtn = document.getElementById('createBtn');
const reAuthCodeBtn = document.getElementById('reAuthCodeBtn');
const memberList = document.getElementById('memberList');

authBtn.addEventListener('click', async () => {
    if (authBtn.classList.contains('active')) return;

    authBtn.classList.toggle('active');
    authBtn.innerText = '발송중';

    const result = await authEmail();

    if (result.indexOf('인증번호가 발송되었습니다.') !== -1) {
        alert(result);
        authBtn.parentNode.removeChild(authBtn);
        authCodeBox.classList.remove('d-none');
        authCode.focus();

        return false;
    } else {
        authBtn.classList.toggle('active');
        authBtn.innerText = '인증';
        alert(result);
    }
});

reAuthCodeBtn.addEventListener('click', async () => {
    if (reAuthCodeBtn.classList.contains('active')) return;
    reAuthCodeBtn.classList.toggle('active');

    const result = await authEmail();

    alert(result);
});

createBtn.addEventListener('click', async () => {
    if (!memberList.value) return alert('구분을 선택해 주세요.');
    if (!userAddress.value) return alert('주소를 입력해 주세요.');
    if (!userSubAddress.value) return alert('상세주소를 입력해 주세요.');

    const apiUri = memberList.value == 1 ? '/user/signup' : '/admin/signup';

    const api = await fetch(apiUri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new createUser()),
    });

    const { result } = await api.json();
    alert(result);

    if (result == '회원가입이 완료되었습니다.') return (window.location.href = '/login');
});

userAddress.addEventListener('click', () => {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var jibunAddr = data.jibunAddress; // 지번 주소 변수
            // 우편번호와 주소 정보를 해당 필드에 넣는다.

            if (roadAddr !== '') {
                document.getElementById('userAddress').value = roadAddr;
            } else if (jibunAddr !== '') {
                document.getElementById('userAddress').value = jibunAddr;
            }
        },
    }).open();
});

async function authEmail() {
    const api = await fetch('/signup/emailvalid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail.value }),
    });

    const { result } = await api.json();

    return result;
}

class createUser {
    constructor() {
        this.email = userEmail.value.trim();
        this.password = userPassword.value.trim();
        this.confirmPassword = userConfirmPassword.value.trim();
        this.nickname = userNickname.value.trim();
        this.name = userName.value.trim();
        this.phone = userPhone.value.trim();
        this.address = `${userAddress.value} ${userSubAddress.value}`.trim();
        this.authCode = authCode.value.trim();
    }
}