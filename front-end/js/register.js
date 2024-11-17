document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const url_server = `https://localhost:7037`;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${url_server}/api/apiuser/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            alert('Registration successful. Please log in.');
            window.location.href = 'auth.html'; // Перенаправляємо на сторінку входу
        } else {
            alert('Registration failed');
        }
    } catch (error) {
        console.error('Error registering:', error);
    }
});


