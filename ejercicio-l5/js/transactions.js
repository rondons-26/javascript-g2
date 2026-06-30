document.addEventListener('DOMContentLoaded', function() {
    const transactionsList = document.getElementById('transactionsList');
    const transactions = JSON.parse(localStorage.getItem('walletTransactions') || '[]');

    if(transactions.length === 0) {
        transactionsList.innerHTML = '<div class="text-center p-3 text-muted">No hay movimientos registrados todavía.</div>';
        return;
    }

    transactionsList.innerHTML = transactions.map(tx => {
        const isIncome = tx.amount > 0;
        const badgeClass = isIncome ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger';
        const sign = isIncome ? '+' : '-';

        return `
            <div class="list-group-item d-flex justify-content-between align-items-center py-3">
                <div>
                    <h6 class="mb-0 fw-semibold">${tx.title}</h6>
                    <small class="text-muted">${tx.date}</small>
                </div>
                <span class="badge ${badgeClass} rounded-pill fw-bold">
                    ${sign}$${Math.abs(tx.amount).toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
            </div>
        `;
    }).join('');
})