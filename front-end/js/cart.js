const url_server = `https://localhost:7037`;
const userId = 1; // Отримайте ID авторизованого користувача

async function loadCart() {
    try {
        const response = await fetch(`${url_server}/api/cart/${userId}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch cart items');
        }

        const cartItems = await response.json();
        const container = document.getElementById('cartItems');
        container.innerHTML = '';

        cartItems.forEach(item => {
            const cartRow = `
                <div class="cart-item">
                    <p>${item.product.name}</p>
                    <p>${item.product.price}$</p>
                    <p>Quantity: ${item.quantity}</p>
                    <button onclick="removeFromCart(${item.id})" class="btn btn-danger">Remove</button>
                </div>
            `;
            container.innerHTML += cartRow;
        });
    } catch (error) {
        console.error('Error loading cart:', error);
    }
}

async function removeFromCart(cartId) {
    try {
        const response = await fetch(`${url_server}/api/cart/${cartId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });

        if (!response.ok) {
            throw new Error('Failed to remove item');
        }

        alert('Item removed from cart');
        loadCart();
    } catch (error) {
        console.error('Error removing item:', error);
    }
}

// Завантажити корзину при завантаженні сторінки
loadCart();
