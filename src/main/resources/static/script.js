// Array to store tickets
let billettArray = [];

// Function to purchase a ticket
function kjopBillett() {
    // Input validation
    let valgtFilm = document.getElementById('velgFilm').value;
    let antallInput = document.getElementById('antall').value;
    let navnInput = document.getElementById('navn').value;
    let etterNavnInput = document.getElementById('etterNavn').value;
    let telefonInput = document.getElementById('telefon').value;
    let epostInput = document.getElementById('epost').value;

    const antallRegex = /^[1-9]$/;
    const telefonRegex = /^[0-9]{8}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Clear existing error messages
    clearErrorMessages();

    // Array to store error messages
    let errorMessages = [];

    // Check and accumulate specific error messages
    if (valgtFilm === "") {
        errorMessages.push({inputId: 'velgFilm', message: "Vennligst velg en film."});
    }

    if (!antallRegex.test(antallInput)) {
        errorMessages.push({inputId: 'antall', message: "Vennligst skriv inn et gyldig billet antall."});
    }

    if (navnInput === "") {
        errorMessages.push({inputId: 'navn', message: "Vennligst fyll ut Fornavn."});
    }

    if (etterNavnInput === "") {
        errorMessages.push({inputId: 'etterNavn', message: "Vennligst fyll ut Etternavn."});
    }

    if (!telefonRegex.test(telefonInput)) {
        errorMessages.push({inputId: 'telefon', message: "Vennligst skriv inn et gyldig telefonnummer."});
    }

    if (!emailRegex.test(epostInput)) {
        errorMessages.push({inputId: 'epost', message: "Vennligst skriv inn en gyldig e-postadresse."});
    }

    // Display all accumulated error messages
    if (errorMessages.length > 0) {
        errorMessages.forEach(({inputId, message}) => {
            displayErrorMessage(message, `${inputId}Error`);
        });
        return;
    }

    // Create ticket object
    let nyBillett = {
        film: valgtFilm,
        antall: antallInput,
        navn: navnInput,
        etterNavn: etterNavnInput,
        telefon: telefonInput,
        epost: epostInput
    };

    // Add ticket object to the array
    billettArray.push(nyBillett);

    // Update the ticket list table
    oppdaterBillettListeTable();

    // Clear input fields
    document.getElementById('velgFilm').value = "";
    document.getElementById('antall').value = "";
    document.getElementById('navn').value = "";
    document.getElementById('etterNavn').value = "";
    document.getElementById('telefon').value = "";
    document.getElementById('epost').value = "";
}

/*Function to update the ticket list as a table*/
function oppdaterBillettListeTable() {
    let billettTabellElement = document.getElementById('billettListe').getElementsByTagName('tbody')[0];

    if (billettListe.getElementsByTagName('thead').length === 0) {
        let thead = document.createElement('thead');
        thead.innerHTML = "<tr><th>Film</th><th>Antall</th><th>Navn</th><th>Etternavn</th><th>Telefon</th><th>Epost</th></tr>";
        billettListe.appendChild(thead);
    }

    billettTabellElement.innerHTML = ""; // Clear the table

    // Add tickets to the table
    for (let i = 0; i < billettArray.length; i++) {
        let billett = billettArray[i];
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${billett.film}</td><td>${billett.antall}</td><td>${billett.navn}</td><td>${billett.etterNavn}</td><td>${billett.telefon}</td><td>${billett.epost}</td>`;
        billettTabellElement.appendChild(tr);
    }
}

// Function to delete all tickets
function slettAlleBilletter() {
    // Clear the array
    billettArray = [];

    // Update the ticket list table
    oppdaterBillettListeTable();
}

function displayErrorMessage(message, errorId) {
    let errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
}

// Function to remove all existing error messages
function clearErrorMessages() {
    let errorMessages = document.getElementsByClassName('error-message');
    for (let i = 0; i < errorMessages.length; i++) {
        errorMessages[i].textContent = "";
    }
}
