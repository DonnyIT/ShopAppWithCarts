document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const url_server = `https://localhost:7037`;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${url_server}/api/apiuser/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token); // Зберігаємо токен
            window.location.href = 'index.html'; // Перенаправляємо на головну сторінку
        } else {
            alert('Invalid credentials');
        }
    } catch (error) {
        console.error('Error logging in:', error);
    }
});
