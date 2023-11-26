inputDataNascita();
// if the user press enter, generate the codice fiscale
document.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    generaCodiceFiscale();
    comuneChecks();
  }
});

var codiceFiscaleCopy = document.getElementById("codiceFiscaleContainer");
var copyPopUp = document.getElementById("copyPopUp");
codiceFiscaleCopy.addEventListener("click", function () {
  comuneChecks();
});

var emojiCounter = 0;
function comuneChecks() {
  var codiceFiscale = document.getElementById("codiceFiscale");
  console.log(codiceFiscale.textContent.length);
  if (codiceFiscale.textContent.length == 16 && codiceFiscale.textContent != "Comune non trovato") {
    navigator.clipboard.writeText(codiceFiscale.textContent);
    var message = "Copiato!";
    var emoji = "👍";
    copy(message, emoji);
  } else {
    emojiCounter++;
    var messageList = [
      "Cosa dovrei copiare?",
      "Non hai generato il codice fiscale",
      "Non ho nulla da copiare",
      "Hmmm cosa dovrei copiare?",
      "Sicuro di aver generato il codice fiscale?",
      "Se non generi il codice fiscale non posso copiare nulla",
      "Dovrei copiare cosa?",
      "Se generi il codice fiscale prima, lo copio",
      "Senza codice fiscale non posso copiare nulla",
      "Vorrei copiare qualcosa, ma non posso",
      "Non credo di poter copiare nulla",
      "Secondo me dovresti generare il codice fiscale prima",
      "Non posso copiare nulla senza il codice fiscale",
      "Non posso copiare nulla",
      "Sai? Se generi il codice fiscale, lo copio",
      "Se tu non generi, allora io non copio",
      "Perché non generi il codice fiscale?",
      "E vabbè, non copio nulla",
      "Nah, non copio nulla",
      "Se fai cosi, non copio nulla",
      "Prima il codice fiscale, poi copio",
      "Secondo te, cosa dovrei copiare?",
      "Sei serio? Non posso copiare nulla",
      "Non ho tutto il giorno per copiare",
      "Copiare cosa?",
      "Non possum imitari",
      "Vorrei copiare, ma non posso",
      "ERRORE: impossibile copiare",
      "AIUTO NON POSSO COPIARE",
      "COME FACCIO A COPIARE?",
      "Non cliccarmi 100 volte, non copio nulla",
      "Non copio nulla",
      "Non copio nulla, non insistere",
      "Smettila di cliccarmi, non copio nulla",
      "Non copio nulla, gne gne gne",
      "AAAAAAAH NON COPIO NULLA",
      "Basta, non copio nulla",
      "Ma io cosa dovrei copiare?",
      "Codice fiscale? Inesistente. Copia? Anche.",
      "Copiatelo da solo il codice fiscale se lo vedi",
      "bruh",
      "Credi che sia un gioco? Non copio nulla",
    ];
    var emojiList = ["🤔", "🤨", "😠"];
    var message = messageList[Math.floor(Math.random() * messageList.length)];
    if(emojiCounter < 3) {
      var emoji = emojiList[0];
    } else if(emojiCounter < 6) {
      var emoji = emojiList[1];
    } else if (emojiCounter < 100){
      var emoji = emojiList[2];
    } else {
      rickroll();
    }
    copy(message, emoji);
    console.log(emojiCounter);
  }
}

function copy(message, emoji) {
  copyPopUp.classList.add("fadeIn");
  copyPopUp.classList.remove("fadeOut");
  copyPopUp.textContent = message + emoji;
  setTimeout(function () {
    copyPopUp.classList.remove("fadeIn");
    copyPopUp.classList.add("fadeOut");
  }, 1000);
}

async function generaCodiceFiscale() {
  var nome = document.getElementById("nome").value.toUpperCase();
  var cognome = document.getElementById("cognome").value.toUpperCase();
  var giornoNascita = document.getElementById("giorno_nascita").value;
  var meseNascita = document.getElementById("mese_nascita").value;
  var annoNascita = document.getElementById("anno_nascita").value.toUpperCase();
  var sesso = document.getElementById("sesso").value.toUpperCase();
  var comune = document.getElementById("comune").value.toUpperCase();

  try {
    var codiceNome = calcolaNomeCognome(nome, true);
    var codiceCognome = calcolaNomeCognome(cognome, false);
    var codiceAnno = annoNascita.substring(2, 4);
    //console.log('anno ' + codiceAnno);
    var codiceMese = calcolaMese(meseNascita);
    var codiceGiorno = calcolaGiorno(giornoNascita, sesso);
    var codiceComune = await calcolaComune(comune);

    var codiceFiscale = codiceCognome + codiceNome + codiceAnno + codiceMese + codiceGiorno + codiceComune;
    //console.log('codice fiscale senza carattere di controllo: ' + codiceFiscale);
    var carattereControllo = calcolaCarattereControllo(codiceFiscale);
    codiceFiscale += carattereControllo;
    if (codiceFiscale.length != 16) {
      codiceFiscale = "Comune non trovato";
      document.getElementById("codiceFiscale").textContent = codiceFiscale;
      throw new Error("Errore nella generazione del codice fiscale");
    }
    //console.log('codice fiscale con carattere di controllo: ' + codiceFiscale);
    document.getElementById("codiceFiscale").textContent = codiceFiscale;
  } catch (error) {
    console.error(error);
  }

}
function calcolaNomeCognome(input, isNome) {
  const CONSONANTI = "BCDFGHJKLMNPQRSTVWXYZ";
  let nomeConsonanti = "";
  let nomeVocali = "";

  for (let i = 0; i < input.length; i++) {
    const carattere = input[i];
    if (CONSONANTI.includes(carattere)) {
      nomeConsonanti += carattere;
    } else {
      nomeVocali += carattere;
    }
  }

  let nomeRisultato = "";
  if (isNome) {
    if (nomeConsonanti.length < 4) {
      nomeRisultato = nomeConsonanti + nomeVocali.substring(0, 3 - nomeConsonanti.length);
    } else {
      nomeRisultato = nomeConsonanti[0] + nomeConsonanti[2] + nomeConsonanti[3];
    }
  } else {
    if (nomeConsonanti.length < 3) {
      nomeRisultato = nomeConsonanti + nomeVocali.substring(0, 3 - nomeConsonanti.length);
    } else {
      nomeRisultato = nomeConsonanti.slice(0, 3);
    }
  }
  ////console.log('nome' + nomeRisultato);
  return nomeRisultato;
}
function calcolaMese(mese) {
  var meseMap = {
    Gennaio: "A",
    Febbraio: "B",
    Marzo: "C",
    Aprile: "D",
    Maggio: "E",
    Giugno: "H",
    Luglio: "L",
    Agosto: "M",
    Settembre: "P",
    Ottobre: "R",
    Novembre: "S",
    Dicembre: "T"
  };
  //console.log('mese' + meseMap[mese]);
  return meseMap[mese];
}
function calcolaGiorno(giorno, sesso) {
  var giornoRisultato = "";
  if (sesso == "F") {
    giornoRisultato = parseInt(giorno) + 40;
  } else {
    giornoRisultato = parseInt(giorno);
  }
  // giornoRisultato sempre 2 cifre, se < 10 aggiungo uno 0 davanti
  if (giornoRisultato < 10) {
    giornoRisultato = "0" + giornoRisultato.toString();
  }
  return giornoRisultato;
}
function calcolaComune(comuneInput) {
  var comuneMap = {};

  return fetch('script/comuni.json')
    .then(response => response.json())
    .then(data => {
      // Mappa solo nome e codice catastale
      for (var i = 0; i < data.length; i++) {
        var comune = data[i];
        comuneMap[comune.nome.toUpperCase()] = comune.codiceCatastale;
      }
      if(!comuneMap[comuneInput.toUpperCase()]) {
        throw new Error("Comune non trovato");
      } else {
        var codiceCatastale = comuneMap[comuneInput.toUpperCase()];
        ////console.log('codice catastale' + codiceCatastale);
        return codiceCatastale;
      }
    })
    .catch(error => console.error("Errore nel caricamento dei dati JSON:", error));
}
function calcolaCarattereControllo(codiceFiscale) {
  const caratteriDispariMap = {
    '0': 1, '1': 0, '2': 5, '3': 7, '4': 9, '5': 13, '6': 15, '7': 17, '8': 19, '9': 21,
    'A': 1, 'B': 0, 'C': 5, 'D': 7, 'E': 9, 'F': 13, 'G': 15, 'H': 17, 'I': 19, 'J': 21,
    'K': 2, 'L': 4, 'M': 18, 'N': 20, 'O': 11, 'P': 3, 'Q': 6, 'R': 8, 'S': 12, 'T': 14,
    'U': 16, 'V': 10, 'W': 22, 'X': 25, 'Y': 24, 'Z': 23
  };
  const caratteriPariMap = {
    '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
    'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9,
    'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18, 'T': 19,
    'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25
  };
  const restoLetteraMap = {
    0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J',
    10: 'K', 11: 'L', 12: 'M', 13: 'N', 14: 'O', 15: 'P', 16: 'Q', 17: 'R', 18: 'S', 19: 'T',
    20: 'U', 21: 'V', 22: 'W', 23: 'X', 24: 'Y', 25: 'Z'
  };


  // seprara i caratteri pari e dispari
  var caratteriDispari = "";
  var caratteriPari = "";
  for (var i = 0; i < codiceFiscale.length; i++) {
    var carattere = codiceFiscale[i];
    if (i % 2 == 0) {
      caratteriDispari += carattere;
    } else {
      caratteriPari += carattere;
    }
  }
  //console.log('caratteri dispari ' + caratteriDispari);
  //console.log('caratteri pari ' + caratteriPari);
  // ASSEGNA I VALORI AI CARATTERI PARI E DISPARI
  var sommaDispari = 0;
  for (var i = 0; i < caratteriDispari.length; i++) {
    var carattere = caratteriDispari[i];
    sommaDispari += caratteriDispariMap[carattere];
  }
  //console.log('somma dispari ' + sommaDispari);
  var sommaPari = 0;
  for (var i = 0; i < caratteriPari.length; i++) {
    var carattere = caratteriPari[i];
    sommaPari += caratteriPariMap[carattere];
  }
  //console.log('somma pari ' + sommaPari);
  var somma = sommaDispari + sommaPari;
  //console.log('somma ' + somma);
  var resto = somma % 26;

  var carattereControllo = restoLetteraMap[resto];
  //console.log('carattere controllo ' + carattereControllo);
  return carattereControllo;
}
function inputDataNascita() {
  var meseNascitaSelect = document.getElementById("mese_nascita");
  var giornoNascitaSelect = document.getElementById("giorno_nascita");
  var annoNascitaSelect = document.getElementById("anno_nascita");
  var annoCorrente = new Date().getFullYear();

  var giorniPerMese = [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre',
  ];

  // Popola il menu a tendina del mese
  for (var i = 0; i < giorniPerMese.length; i++) {
    var option = document.createElement("option");
    option.text = giorniPerMese[i];
    option.value = giorniPerMese[i];
    meseNascitaSelect.add(option);
  }
  // popola il menu a tendina del giorno
  for (var i = 1; i <= 31; i++) {
    var option = document.createElement("option");
    option.text = i;
    option.value = i;
    giornoNascitaSelect.add(option);
  }
  // popola il menu a tendina dell'anno con gli ultimi 150 anni, partendo da quello corrente'
  for (var i = annoCorrente; i >= annoCorrente - 150; i--) {
    var option = document.createElement("option");
    option.text = i;
    option.value = i;
    annoNascitaSelect.add(option);
  }
}



// easter eggs super segreti
var giornoNascita = document.getElementById("giorno_nascita");
var meseNascita = document.getElementById("mese_nascita");
var annoNascita = document.getElementById("anno_nascita");
var giornoOdierno = new Date().getDate();
var meseOdierno = new Date().getMonth() + 1;
var meseMap = {
  1: "Gennaio",
  2: "Febbraio",
  3: "Marzo",
  4: "Aprile",
  5: "Maggio",
  6: "Giugno",
  7: "Luglio",
  8: "Agosto",
  9: "Settembre",
  10: "Ottobre",
  11: "Novembre",
  12: "Dicembre"
};

giornoNascita.addEventListener("change", function () {
  // bisestile
  if (giornoNascita.value == 29 && meseNascita.value == "Febbraio") {
    document.getElementById("codiceFiscale").textContent = "Bisestile!!! 😋";
  }
  // compleanno
  if (giornoNascita.value == giornoOdierno && meseNascita.value == meseMap[meseOdierno]) {
    document.getElementById("codiceFiscale").textContent = "Buon compleanno!!! 🥳";
  }
  // natale
  if (giornoNascita.value == 25 && meseNascita.value == "Dicembre") {
    document.getElementById("codiceFiscale").textContent = "Buon Natale!!! 🎅";
  }

});
meseNascita.addEventListener("change", function () {
  // bisestile
  if (giornoNascita.value == 29 && meseNascita.value == "Febbraio") {
    document.getElementById("codiceFiscale").textContent = "Bisestile!!! 😋";
  }
  // compleanno
  if (giornoNascita.value == giornoOdierno && meseNascita.value == meseMap[meseOdierno]) {
    document.getElementById("codiceFiscale").textContent = "Buon compleanno!!! 🥳";
  }
  // natale
  if (giornoNascita.value == 25 && meseNascita.value == "Dicembre") {
    document.getElementById("codiceFiscale").textContent = "Buon Natale!!! 🎅";
  }
});

function rickroll() {
  window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
}


