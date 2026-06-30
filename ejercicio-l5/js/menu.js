document.addEventListener('DOMContentLoaded', function () {
    //1. MOSTRAR SALDO ACTUAL
    const balance = localStorage.getItem('walletBalance') || '60000';
    document.getElementById('balanceDisplay').innerText = `$${parseFloat(balance).toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

    //2. CAPTURAR BOTONES
    const btnDeposit = document.getElementById('btnDeposit');
    const btnSend = document.getElementById('btnSendMoney');
    const btnTx = document.getElementById('btnTeansactions') || document.getElementById('btnTransactions');
    const alertDiv = document.getElementById('redirectAlert');

    function handleNavigation(targetPage, pageName) {
        alertDiv.classList.remove('d-none');
        alertDiv.innerText = `Redirigiendo a ${pageName}...`;

        setTimeout(() => {
            window.location.href = targetPage;
        }, 700);
    }

    btnDeposit.addEventListener('click', () => handleNavigation('deposit.html', 'Depositar'));
    btnSend.addEventListener('click', () => handleNavigation('sendmoney.html', 'Enviar Dinero'));
    btnTx.addEventListener('click', () => handleNavigation('transactions.html', 'Últimos Movimientos'));
});