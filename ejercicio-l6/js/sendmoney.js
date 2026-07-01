$(document).ready(function () {
    //AGENDA ESTÁTICA PARA SIMULACIÓN
    let contactosIn = [
        { nombre: "John Doe", alias: "john.doe", cbu: "1234567890123456", banco: "ABC Bank" },
        { nombre: "Jane Smith", alias: "jane.smith", cbu: "6543210987654321", banco: "XYZ Bank" }
    ];

    if (!localStorage.getItem('walletContacts')) {
        localStorage.setItem('walletContacts', JSON.stringify(contactosIn))
    }

    let contactos = JSON.parse(localStorage.getItem('walletContacts'));

    function renderContactos(lista) {
        const $contenedor = $('#agendaContacts');
        $contenedor.empty();

        if (lista.length === 0) {
            $contenedor.append('<div class="text-muted text-center p-2 small">No se encontraron contactos</div>');
            return;
        }

        lista.forEach((c, idx) => {
            const itemHtml = `
                <label class="list-group-item list-group-item-action d-flex align-items-center raw-contact" style="cursor: pointer;">
                    <input class="form-check-input me-2 radio-contact" type="radio" name="contactSelect" value="${c.nombre}">
                    <div>
                        <strong class="contact-name-text">${c.nombre}</strong>
                        <small class="text-muted d-block">Alias: ${c.alias} | ${c.banco}</small>
                    </div>
                </label>
            `;
            $contenedor.append(itemHtml);
        });
    }

    renderContactos(contactos);

    //1. MOSTRAR Y OCULTAR FORMULARIO CONTACTO NUEVO
    $('#btnToggleContactForm').click(function () {
        $('#addContactFormContainer').slideDown();
        $(this).fadeOut(300);
    })

    $('#btnCancelContact').click(() => {
        $('#addContactFormContainer').slideUp();
        $('#newContactForm')[0].reset();
        $('#contactValidationAlert').empty();
        $('#btnToggleContactForm').fadeIn(300);
    });

    //2. SE VALIDA EL FORMULARIO
    $('#newContactForm').submit(function (e) {
        e.preventDefault();

        const name = $('#modalName').val().trim();
        const cbu = $('#modalCbu').val().trim();
        const alias = $('#modalAlias').val().trim();
        const bank = $('#modalBank').val().trim();
        const $vAlert = $('#contactValidationAlert');

        if (!name || !cbu || !alias || !bank) {
            $vAlert.html('<span class="text-danger">Todos los campos son obligatorios.</span>');
            return;
        }
        if (isNaN(cbu) || cbu.length < 10 || cbu.length > 22) {
            $vAlert.html('<span class="text-danger">El CBU debe contener solo números (entre 10 y 22 dígitos).</span>');
            return;
        }

        contactos.push({ nombre: name, alias: alias, cbu: cbu, banco: bank });
        localStorage.setItem('walletContacts', JSON.stringify(contactos));

        renderContactos(contactos);

        $vAlert.html('<span class="text-success">¡Contacto guardado!</span>');

        setTimeout(() => {
            $('#addContactFormContainer').slideUp();
            $('#newContactForm')[0].reset();
            $vAlert.empty();
            $('#btnToggleContactForm').fadeIn(300);
        }, 1000);
    });

    //3. BUSQUEDA POR NOMBRE O ALIAS (AGENDA)
    $('#searchForm').submit(function (e) {
        e.preventDefault();

        const term = $('#searchContact').val().toLowerCase().trim();
        const filtrados = contactos.filter(c =>
            c.nombre.toLowerCase().includes(term) ||
            c.alias.toLowerCase().includes(term) ||
            c.cbu.toLowerCase().includes(term)
        );
        renderContactos(filtrados);
    });

    //4. OCULTAR/MOSTRAR BOTÓN ENVIAR
    $(document).on('change', '.radio-contact', function () {
        $('.raw-contact').removeClass('contact-selected');
        if ($(this).is(':checked')) {
            $(this).closest('.raw-contact').addClass('contact-selected');
            $('#btnSendMoneyAction').fadeIn();
        }
    });

    //5. ENVIO DE DINERO + MENSAJE DE CONFIRMACIÓN
    $('#sendMoneyForm').submit(function (e) {
        e.preventDefault();

        const sendAmount = parseFloat($('#sendAmount').val());
        const selectedContact = $('input[name="contactSelect"]:checked').val();

        let currentBalance = parseFloat(localStorage.getItem('walletBalance') || '60000');

        if (sendAmount > currentBalance) {
            $('#sendConfirmationContainer').html('<div class="alert alert-danger py-2 small">Saldo insuficiente para esta operación.</div>');
            return;
        }

        currentBalance -= sendAmount;
        localStorage.setItem('walletBalance', currentBalance.toString());

        let transactions = JSON.parse(localStorage.getItem('walletTransactions') || '[]');
        transactions.unshift({
            tipo: 'compra',
            title: `Envio de dinero a ${selectedContact}`,
            amount: -sendAmount,
            date: 'Hoy'
        });
        localStorage.setItem('walletTransactions', JSON.stringify(transactions));

        $('#sendConfirmationContainer').html(`
            <div class="alert alert-success text-center py-2 small fw-medium">
                ¡Envío realizado con éxito a ${selectedContact}! Redirigiendo...
            </div>
        `);

        setTimeout(() => {
            window.location.href = 'menu.html';
        }, 2000);
    });
});