document.getElementById('depositForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const amountInput = document.getElementById('depositAmount');
    const amount = parseFloat(amountInput.value);
    const alertDiv = document.getElementById('depositAlert');

    if (isNaN(amount) || amount <= 0) return;

    //OBTENER SALDO PREVIO Y SUMAR
    let currentBalance = parseFloat(localStorage.getItem('walletBalance') || '60000');
    currentBalance += amount;
    localStorage.setItem('walletBalance', currentBalance.toString());

    //REGISTRAR EN EL HISTORIAL
    let transactions = JSON.parse(localStorage.getItem('walletTransactions') || '[]');
    transactions.unshift({
        title: 'Depósito Realizado',
        amount: amount,
        date: 'Hoy'
    });
    localStorage.setItem('walletTransactions', JSON.stringify(transactions));

    alertDiv.classList.remove('d-none');
    alertDiv.classList.add('alert', 'alert-success');
    alertDiv.innerText = `¡Depósito exitoso! Nuevo saldo registrado`;

    setTimeout(() => {
        window.location.href = 'menu.html';
    }, 700);
});