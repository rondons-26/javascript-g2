$(document).ready(function () {
    //1. MOSTRAR SALDO ACTUAL
    const balance = localStorage.getItem('walletBalance') || '60000';
    $('#balanceDisplay').text(`$${parseFloat(balance).toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`);

    //2. CAPTURAR BOTONES
    function redirigirA(url, pageName) {
        $('#redirectAlert').removeClass('d-none').text(`Redirigiendo a ${pageName}...`)
        setTimeout(() => {
            window.location.href = url;
        }, 1000);
    }

    $('#btnDeposit').click(() => redirigirA('../html/deposit.html', 'Depositar'));
    $('#btnSendMoney').click(() => redirigirA('../html/sendmoney.html', 'Enviar Dinero'));
    $('#btnTransactions').click(() => redirigirA('../html/transactions.html', 'Últimos Movimientos'));
});