document.getElementById('newContactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('modalName').value;
    const cbu = document.getElementById('modalCbu').value;
    const alias = document.getElementById('modalAlias').value;
    const bank = document.getElementById('modalBank').value;
    
    alert(`Contacto "${name}" agregado con éxito de forma interna.`);

    const modalElement = document.getElementById('addContactModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();

    document.getElementById('newContactForm').reset();
});

//ENVIO DEL DINERO
document.getElementById('sendMoneyForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const sendAmount = parseFloat(document.getElementById('sendAmount').value);
    const selectedContact = document.querySelector('input[name="contactSelect"]:checked').value;
    const alertDiv = document.getElementById('sendAlert');

    let currentBalance = parseFloat(localStorage.getItem('walletBalance') || '60000');

    alertDiv.classList.remove('d-none', 'alert-danger', 'alert-success');

    if(sendAmount > currentBalance) {
        alertDiv.classList.add('alert', 'alert-danger');
        alertDiv.innerText = "Fondos insuficientes para realizar esta operación.";
        return;
    }

    //DESCONTAR
    currentBalance -= sendAmount;
    localStorage.setItem('walletBalance', currentBalance.toString());

    //REGISTRO HISTORIAL
    let transactions = JSON.parse(localStorage.getItem('walletTransactions') || '[]');
    transactions.unshift({
        title: `Envio a ${selectedContact}`,
        amount: -sendAmount,
        date: 'Hoy'
    });
    localStorage.setItem('walletTransactions', JSON.stringify(transactions));

    alertDiv.classList.add('alert', 'alert-success');
    alertDiv.innerText = `¡Transferencia confirmada a ${selectedContact}!`;

    setTimeout(() => {
        window.location.href = 'menu.html';
    }, 1000);

})