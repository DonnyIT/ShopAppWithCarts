const url_server = `https://localhost:7037`;

// Отримуємо токен з localStorage
const token = localStorage.getItem('token');

// Функція для оновлення статусу авторизації
function updateAuthStatus() {
    const isAuthenticated = !!token; // Перевіряємо, чи є токен

    // Відображаємо або приховуємо кнопки на основі авторизації
    document.getElementById("loginButton").style.display = isAuthenticated ? 'none' : 'block';
    document.getElementById("registerButton").style.display = isAuthenticated ? 'none' : 'block';
    document.getElementById("logoutButton").style.display = isAuthenticated ? 'block' : 'none';

    // Якщо користувач авторизований, завантажуємо продукти
    if (isAuthenticated) {
        loadProducts();
    }
}

// Функція для завантаження продуктів
async function loadProducts() {
    const url_product = `${url_server}/api/apiproduct/`;

    try {
        const response = await fetch(url_product, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to get products');
        }

        const products = await response.json();

        // Очищаємо контейнер перед додаванням продуктів
        const container = document.getElementById("parent_products");
        container.innerHTML = '';

        // Додаємо продукти на сторінку
        products.forEach(p => {
            const card = `
                <div class="card" style="width: 18rem;">
                    <img src="/img/product.jpg" class="card-img-top" alt="${p.name}">
                    <div class="card-body">
                        <h5 class="titleId">${p.name}</h5>
                        <p class="descriptionId">${p.description}</p>
                        <p class="priceId">${p.price}$</p>
                        <a href="#" class="btn btn-primary" onclick="addToCart(${p.id})">Buy</a>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

async function addToCart(productId) {
    const userId = 1; // Отримайте ID авторизованого користувача
    try {
        const response = await fetch(`${url_server}/api/cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ userId, productId, quantity: 1 })
        });

        if (!response.ok) {
            throw new Error('Failed to add to cart');
        }

        alert('Product added to cart');
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
}


// Обробник події для кнопки виходу
document.getElementById("logoutButton").addEventListener("click", () => {
    localStorage.removeItem('token');
    alert('Logged out successfully');
    location.reload(); // Оновлюємо сторінку для застосування змін
});

// Оновлюємо статус авторизації при завантаженні сторінки
updateAuthStatus();
