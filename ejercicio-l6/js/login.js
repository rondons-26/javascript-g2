//CREDENCIALES PARA SIMULACIÓN
const VALID_EMAIL = "user@wallet.com";
const VALID_PASS = "1234";

$('#loginForm').submit(function (e) {
    e.preventDefault();

    const email = $('#email').val().trim();
    const password = $('#password').val();
    const $alertDiv = $('#loginAlert');

    $alertDiv.empty().removeClass('alert alert-danger alert-success');

    //PROCESO DE VALIDACIÓN
    if (email === VALID_EMAIL && password === VALID_PASS) {

        if (!localStorage.getItem('walletBalance')) {
            localStorage.setItem('walletBalance', '60000');
        }
        if (!localStorage.getItem('walletTransactions')) {
            const initialTx = [
                { tipo: 'compra', title: 'Compra en línea', amount: -50.00, date: 'Hace 2 horas' },
                { tipo: 'despósito', title: 'Depósito', amount: 100.00, date: 'Ayer' },
                { tipo: 'transferencia recibida', title: 'Transferencia recibida', amount: 75.00, date: '24 Jun 2026' }
            ];
            localStorage.setItem('walletTransactions', JSON.stringify(initialTx));
        }

        $alertDiv.addClass('alert alert-success').text("¡Inicio de sesión exitoso! Redirigiendo...");

        setTimeout(() => {
            window.location.href = 'menu.html';
        }, 1000);

    } else {
        $alertDiv.addClass('alert alert-danger').text("Credenciales incorrectas. Intente de nuevo.");
    }
});