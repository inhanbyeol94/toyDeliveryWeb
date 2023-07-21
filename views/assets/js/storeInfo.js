window.addEventListener('load', () => {
    const fullName = document.getElementById('fullName');
    const address = document.getElementById('address');
    const phone = document.getElementById('phone');
    const SaveChangesBtn = document.getElementById('SaveChanges');
    const imageBtn = document.getElementById('imageBtn');
    const profileImage = document.getElementById('profileImage');
    const imageDelBtn = document.getElementById('imageDelBtn');
    const intro = document.getElementById('intro');
    const category = document.getElementById('category');
    const main = document.getElementById('main');
    const deleteBtn = document.getElementById('deleteBtn');
    const editKeywordBtn = document.querySelectorAll('.editKeywordBtn');
    const deleteKeywordBtn = document.querySelectorAll('.deleteKeywordBtn');
    const addKeywordBtn = document.getElementById('addKeywordBtn');

    const restaurantId = JSON.parse(main.dataset.restaurantId);
    let categoryVal;

    SaveChangesBtn.addEventListener('click', async () => {
        if (restaurantId === null) {
            const StoreApi = await fetch(`/restaurant`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(new addStore()),
            });

            const { status } = await StoreApi;
            const { result } = await StoreApi.json();
            if (status == 200) {
                alert(result);
                window.location.reload();
            } else {
                alert(result);
            }
        } else {
            const StoreApi = await fetch(`/restaurant/${restaurantId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(new addStore()),
            });
            const { status } = await StoreApi;
            const { result } = await StoreApi.json();

            if (status == 200) {
                alert(result);
                window.location.reload();
            } else {
                alert(result);
            }
        }
    });

    imageBtn.addEventListener('click', () => {
        profileImage.click();
    });

    imageDelBtn.addEventListener('click', async () => {
        const api = await fetch(`/restaurant/${restaurantId}/image`, {
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

        const api = await fetch(`/restaurant/${restaurantId}/image`, {
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

    deleteBtn.addEventListener('click', async () => {
        const api = await fetch(`/restaurant/${restaurantId}`, {
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

    category.addEventListener('change', async (e) => {
        categoryVal = e.target.value;
    });
    editKeywordBtn.forEach((item) => {
        item.addEventListener('click', async (e) => {
            const keyword = e.target.previousElementSibling.value;
            const keyword_id = e.target.dataset.id;
            await fetch(`/restaurant/${restaurantId}/keyword/${keyword_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ keyword }),
            })
                .then((response) => response.json())
                .then((data) => {
                    alert(data.message);
                    window.location.reload();
                })
                .catch((err) => alert(err.errorMessage));
        });
    });
    deleteKeywordBtn.forEach((item) => {
        item.addEventListener('click', async (e) => {
            const keyword_id = e.target.dataset.id;
            await fetch(`/restaurant/${restaurantId}/keyword/${keyword_id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })
                .then((response) => response.json())
                .then((data) => {
                    alert(data.message);
                    window.location.reload();
                })
                .catch((err) => alert(err.errorMessage));
        });
    });
    addKeywordBtn.addEventListener('click', async (e) => {
        const keyword = e.target.previousElementSibling.value;
        await fetch(`/restaurant/${restaurantId}/keyword`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ keyword }),
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                window.location.reload();
            })
            .catch((err) => alert(err.errorMessage));
    });

    class addStore {
        constructor() {
            this.name = fullName.value;
            this.address = address.value;
            this.tel = phone.value;
            this.desc = intro.value;
            this.category = Number(categoryVal);
        }
    }
});
