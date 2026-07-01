$(document).ready(function () {
    //OBTENER SALDO PREVIO
    let currentBalance = parseFloat(localStorage.getItem('walletBalance') || '60000');
    $('#currentBalanceDisplay').text(`$${currentBalance.toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`);

    $('#depositForm').submit(function (e) {
        e.preventDefault();

        const amount = parseFloat($('#depositAmount').val());
        if (isNaN(amount) || amount <= 0) return;

        //ACTUALIZA LOS DATOS
        currentBalance += amount;
        localStorage.setItem('walletBalance', currentBalance.toString());

        //REGISTRAR EN EL HISTORIAL
        let transactions = JSON.parse(localStorage.getItem('walletTransactions') || '[]');
        transactions.unshift({
            tipo: 'depósito',
            title: 'Depósito Realizado',
            amount: amount,
            date: 'Hoy'
        });
        localStorage.setItem('walletTransactions', JSON.stringify(transactions));

        $('#depositLegend').text(`Monto despositado con éxito: $${Math.round(amount).toLocaleString('es-CL')}`);

        const alertHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                ¡Depósito procesado correctamente! Tu saldo se ha actualizado.
            </div>
        `;
        $('#alert-container').html(alertHTML);

        setTimeout(() => {
            window.location.href = 'menu.html';
        }, 2000);
    });
});