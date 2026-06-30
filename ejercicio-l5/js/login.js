//CREDENCIALES PARA SIMULACIÓN
const VALID_EMAIL = "user@wallet.com";
const VALID_PASS = "1234";

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const alertDiv = document.getElementById('loginAlert');

    alertDiv.classList.remove('d-none', 'alert-danger', 'alert-success');

    //PROCESO DE VALIDACIÓN
    if (email === VALID_EMAIL && password === VALID_PASS) {

        if (!localStorage.getItem('walletBalance')) {
            localStorage.setItem('walletBalance', '60000');
        }
        if (!localStorage.getItem('walletTransactions')) {
            const initialTx = [
                { title: 'Compra en línea', amount: -50.00, date: 'Hace 2 horas' },
                { title: 'Depósito', amount: 100.00, date: 'Ayer' },
                { title: 'Transferencia recibida', amount: 75.00, date: '24 Jun 2026' }
            ];
            localStorage.setItem('walletTransactions', JSON.stringify(initialTx));
        }

        alertDiv.classList.add('alert', 'alert-success');
        alertDiv.innerText = "¡Inicio de sesión exitoso! Redirigiendo...";

        setTimeout(() => {
            window.location.href = 'menu.html';
        }, 1000);

    } else {
        alertDiv.classList.add('alert', 'alert-danger');
        alertDiv.innerText = "Credenciales incorrectas. Intente de nuevo.";
    }
});