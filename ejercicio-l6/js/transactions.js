$(document).ready(function () {
    const listaTransacciones = JSON.parse(localStorage.getItem('walletTransactions')) || [];

    function getTipoTransaccion(tipo) {
        const tipos = {
            'compra': 'Compra',
            'depósito': 'Depósito',
            'transferencia recibida': 'Transferencia Recibida'
        };
        return tipos[tipo] || tipo;
    }

    function mostrarUltimosMovimientos(filtro) {
        const $listContainer = $('#transactionsList');
        $listContainer.empty();

        const movimientosFiltrados = listaTransacciones.filter(tx => {
            if (filtro === 'all') return true;
            return tx.tipo === filtro;
        });

        if (movimientosFiltrados.length === 0) {
            $listContainer.append('<div class="text-center p-3 text-muted small">No hay operaciones de este tipo.</div>');
            return;
        }

        //LISTADO
        movimientosFiltrados.forEach(tx => {
            const isIncome = tx.amount > 0;
            const badgeClass = isIncome ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger';
            const sign = isIncome ? '+' : '-';

            const itemHtml = `
                <div class="list-group-item d-flex justify-content-between align-items-center py-3">
                    <div>
                        <h6 class="mb-0 fw-semibold">${tx.title}</h6>
                        <small class="text-muted">${getTipoTransaccion(tx.tipo)} • ${tx.date}</small>
                    </div>
                    <span class="badge ${badgeClass} rounded-pill fw-bold">
                        ${sign}$${Math.abs(tx.amount).toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </span>
                </div>
            `;
            $listContainer.append(itemHtml);
        });

    }

    mostrarUltimosMovimientos('all');

    $('#filterType').change(function () {
        const filtroSeleccionado = $(this).val();
        mostrarUltimosMovimientos(filtroSeleccionado);
    });
});