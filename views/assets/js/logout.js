async function logout() {
    const api = await fetch('/logout');
    const { status } = await api;

    if (status == 200) return (window.location.href = '/');
}
