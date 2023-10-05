//Liste des indications :
var bien = [
  "Bravo ! ",
  "Bien joué !",
  "Great ! ",
  "Trop bien !",
  "Trop fort !",
  "Oui ! ",
];
var nul = [
  "Courage ! ",
  "Réessaye !",
  "Dommage ! ",
  "Tu va y arrivé !",
  "Triste ! ",
];

function chercher2Race() {
  // Nombre aleatoire pour savoir ou mettre la vrai image
  var randomPlace = Math.floor(Math.random() * 2);

  $.ajax({
    method: "GET",
    url: "https://api.thecatapi.com/v1/breeds",
    contentType: "application/json",
    success: function (resultRace) {
      //TROUVER LE NOM D'UN CHAT AU HASARD
      var raceChat = document.querySelector(".race-chat");
      var tailleResult = resultRace.length;

      // nombre aleatoire pour trouver les races aleatoires
      var itemRandomVrai = Math.floor(Math.random() * tailleResult); // Génère un nb aléatoire
      var itemRandomFaux = Math.floor(Math.random() * tailleResult); // Génère un nb aléatoire
      while (itemRandomVrai == itemRandomFaux) {
        itemRandomFaux = Math.floor(Math.random() * tailleResult); // Génère un nb aléatoire
      }
      console.log(itemRandomVrai, itemRandomFaux);
      // Modifcation de la question
      raceChat.textContent = resultRace[itemRandomVrai].name;

      // id des race pour trouver les photos
      var raceIdVrai = resultRace[itemRandomVrai].id;
      var raceIdFaux = resultRace[itemRandomFaux].id;

      //TROUVER UNE PHOTO ASSOCIE AU VRAI
      $.ajax({
        method: "GET",
        url: `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${raceIdVrai}&api_key=REPLACE_ME`,
        contentType: "application/json",
        success: function (resultImage) {
          var tailleResult = resultImage.length;
          var itemRandomVrai = Math.floor(Math.random() * tailleResult); // Génère un nb aléatoire

          // Récupérez le conteneur de l'image
          var cardChoix = null;
          if (randomPlace == 0) {
            //si 0 on le place en premier
            cardChoix = document.querySelector(".premier");
          } else {
            // si c'est 1 on le place en deuxieme
            cardChoix = document.querySelector(".deuxieme");
          }
          cardChoix.innerHTML = `
            <img class="card-img" src=${resultImage[itemRandomVrai].url} alt="Image choix 1" />
            <img class="card-img-wide" src=${resultImage[itemRandomVrai].url} alt="Image choix 1" />
              `;
        },
        error: function ajaxError(jqXHR) {
          console.error("Error: ", jqXHR.responseText);
        },
      });
      //TROUVER UNE PHOTO ASSOCIE AU FAUX
      $.ajax({
        method: "GET",
        url: `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${raceIdFaux}&api_key=REPLACE_ME`,
        contentType: "application/json",
        success: function (resultImage) {
          var tailleResult = resultImage.length;
          var itemRandomFaux = Math.floor(Math.random() * tailleResult); // Génère un nb aléatoire

          // Récupérez le conteneur de l'image
          var cardChoix = null;
          if (randomPlace == 0) {
            //si 0 on le place en premier
            cardChoix = document.querySelector(".deuxieme");
          } else {
            // si c'est 1 on le place en deuxieme
            cardChoix = document.querySelector(".premier");
          }
          cardChoix.innerHTML = `
              <img class="card-img" src=${resultImage[itemRandomFaux].url} alt="Image choix 2" />
              <img class="card-img-wide" src=${resultImage[itemRandomFaux].url} alt="Image choix 2" />
                `;

          var premierCard = document.querySelector(".premier");
          var deuxiemeCard = document.querySelector(".deuxieme");
          premierCard.onclick = function () {
            validatePremier(randomPlace);
          };
          deuxiemeCard.onclick = function () {
            validateDeuxieme(randomPlace);
          };
        },
        error: function ajaxError(jqXHR) {
          console.error("Error: ", jqXHR.responseText);
        },
      });
    },
    error: function ajaxError(jqXHR) {
      console.error("Error: ", jqXHR.responseText);
    },
  });
}

chercher2Race();

function validatePremier(randomPlace) {
  var premierCard = document.querySelector(".premier");
  var deuxiemeCard = document.querySelector(".deuxieme");
  var isDisabled = premierCard.getAttribute("data-disabled");

  //APARITION DU BOUTON
  var boutonSuivant = document.querySelector(".suivantQuestion");
  boutonSuivant.style.display = "flex";

  if (isDisabled === "false") {
    // C'est la bonne solution
    if (randomPlace == 0) {
      // AFFICHAGE COUTOUR
      premierCard.style.border = "10px solid green";
      //AFFICHAGE DU FILTRE
      // Créez un élément ::before pour la carte
      var beforeElement = document.createElement("div");
      // Ajoutez une classe à l'élément ::before
      beforeElement.classList.add("card-filter");
      // Ajoutez l'élément ::before comme premier enfant de la carte
      premierCard.insertBefore(beforeElement, premierCard.firstChild);
      // Stylez l'élément ::before avec un filtre
      beforeElement.style.content = "";
      beforeElement.style.position = "absolute";
      beforeElement.style.top = "0";
      beforeElement.style.left = "0";
      beforeElement.style.width = "100%";
      beforeElement.style.height = "100%";
      beforeElement.style.opacity = "30%";
      beforeElement.style.backgroundColor = "green"; // Couleur du filtre (ici rouge semi-transparent)
      beforeElement.style.pointerEvents = "none"; // Empêche l'élément ::before de capturer les événements

      // AFFICHAGE DU SCORE
      var bonScore = document.querySelector(".nb-score-bon");
      var scoreVrai = bonScore.textContent;
      var nouveauScore = parseInt(scoreVrai) + 1;
      bonScore.textContent = nouveauScore.toString();

      // AFFICHAGE DU RECORD
      var record = document.querySelector(".nb-best");
      var scoreBest = record.textContent;
      var nouveauScore = parseInt(scoreBest) + 1;
      record.textContent = nouveauScore.toString();

      //AFFICHAGE DE LINDICATION
      var indiqBien = document.querySelector(".indication");
      indiqBien.style.display = "flex";
      var itemIndiq = Math.floor(Math.random() * bien.length); // Génère un nb aléatoire
      indiqBien.textContent = bien[itemIndiq];
    } else {
      premierCard.style.border = "10px solid red";
      // Créez un élément ::before pour la carte
      var beforeElement = document.createElement("div");
      // Ajoutez une classe à l'élément ::before
      beforeElement.classList.add("card-filter");
      // Ajoutez l'élément ::before comme premier enfant de la carte
      premierCard.insertBefore(beforeElement, premierCard.firstChild);
      // Stylez l'élément ::before avec un filtre
      beforeElement.style.content = "";
      beforeElement.style.position = "absolute";
      beforeElement.style.top = "0";
      beforeElement.style.left = "0";
      beforeElement.style.width = "100%";
      beforeElement.style.height = "100%";
      beforeElement.style.opacity = "40%";
      beforeElement.style.backgroundColor = "red"; // Couleur du filtre (ici rouge semi-transparent)
      beforeElement.style.pointerEvents = "none"; // Empêche l'élément ::before de capturer les événements

      // AFFICHAGE DU SCORE
      var mauvaisScore = document.querySelector(".nb-score-mauvais");
      var scoreFaux = mauvaisScore.textContent;
      var nouveauScore = parseInt(scoreFaux) + 1;
      mauvaisScore.textContent = nouveauScore.toString();

      // AFFICHAGE DU RECORD
      var record = document.querySelector(".nb-best");
      record.textContent = "0";

      //AFFICHAGE DE LINDICATION
      var indiqNul = document.querySelector(".indication");
      indiqNul.style.display = "flex";
      var itemIndiq = Math.floor(Math.random() * nul.length); // Génère un nb aléatoire
      indiqNul.textContent = nul[itemIndiq];
    }
    console.log("jai appuyer sur le premier");
    premierCard.setAttribute("data-disabled", "true");
    deuxiemeCard.setAttribute("data-disabled", "true");
  } else {
    console.log("deja appuyer");
  }
}
function validateDeuxieme(randomPlace) {
  var deuxiemeCard = document.querySelector(".deuxieme");
  var premierCard = document.querySelector(".premier");
  var isDisabled = deuxiemeCard.getAttribute("data-disabled");

  //APARITION DU BOUTON
  var boutonSuivant = document.querySelector(".suivantQuestion");
  boutonSuivant.style.display = "flex";

  if (isDisabled === "false") {
    if (randomPlace == 1) {
      deuxiemeCard.style.border = "10px solid green";
      // Créez un élément ::before pour la carte
      var beforeElement = document.createElement("div");
      // Ajoutez une classe à l'élément ::before
      beforeElement.classList.add("card-filter");
      // Ajoutez l'élément ::before comme premier enfant de la carte
      deuxiemeCard.insertBefore(beforeElement, deuxiemeCard.firstChild);
      // Stylez l'élément ::before avec un filtre
      beforeElement.style.content = "";
      beforeElement.style.position = "absolute";
      beforeElement.style.top = "0";
      beforeElement.style.left = "0";
      beforeElement.style.width = "100%";
      beforeElement.style.height = "100%";
      beforeElement.style.opacity = "30%";
      beforeElement.style.backgroundColor = "green"; // Couleur du filtre (ici rouge semi-transparent)
      beforeElement.style.pointerEvents = "none"; // Empêche l'élément ::before de capturer les événements

      // AFFICHAGE DU SCORE
      var bonScore = document.querySelector(".nb-score-bon");
      var scoreVrai = bonScore.textContent;
      var nouveauScore = parseInt(scoreVrai) + 1;
      bonScore.textContent = nouveauScore.toString();

      // AFFICHAGE DU RECORD
      var record = document.querySelector(".nb-best");
      var scoreBest = record.textContent;
      var nouveauScore = parseInt(scoreBest) + 1;
      record.textContent = nouveauScore.toString();

      //AFFICHAGE DE LINDICATION
      var indiqBien = document.querySelector(".indication");
      indiqBien.style.display = "flex";
      var itemIndiq = Math.floor(Math.random() * bien.length); // Génère un nb aléatoire
      indiqBien.textContent = bien[itemIndiq];
    } else {
      deuxiemeCard.style.border = "10px solid red";
      // Créez un élément ::before pour la carte
      var beforeElement = document.createElement("div");
      // Ajoutez une classe à l'élément ::before
      beforeElement.classList.add("card-filter");
      // Ajoutez l'élément ::before comme premier enfant de la carte
      deuxiemeCard.insertBefore(beforeElement, deuxiemeCard.firstChild);
      // Stylez l'élément ::before avec un filtre
      beforeElement.style.content = "";
      beforeElement.style.position = "absolute";
      beforeElement.style.top = "0";
      beforeElement.style.left = "0";
      beforeElement.style.width = "100%";
      beforeElement.style.height = "100%";
      beforeElement.style.opacity = "40%";
      beforeElement.style.backgroundColor = "red"; // Couleur du filtre (ici rouge semi-transparent)
      beforeElement.style.pointerEvents = "none"; // Empêche l'élément ::before de capturer les événements

      // AFFICHAGE DU SCORE
      var mauvaisScore = document.querySelector(".nb-score-mauvais");
      var scoreFaux = mauvaisScore.textContent;
      var nouveauScore = parseInt(scoreFaux) + 1;
      mauvaisScore.textContent = nouveauScore.toString();

      // AFFICHAGE DU RECORD
      var record = document.querySelector(".nb-best");
      record.textContent = "0";

      //AFFICHAGE DE LINDICATION
      var indiqNul = document.querySelector(".indication");
      indiqNul.style.display = "flex";
      var itemIndiq = Math.floor(Math.random() * nul.length); // Génère un nb aléatoire
      indiqNul.textContent = nul[itemIndiq];
    }
    console.log("jai appuyer sur le deuxieme");

    deuxiemeCard.setAttribute("data-disabled", "true");
    premierCard.setAttribute("data-disabled", "true");
  } else {
    console.log("deja appuyer");
  }
}

// Ajoutez un gestionnaire d'événements au bouton "Nouvelles cartes"
var buttonSuivant = document.getElementById("suivant-question");
buttonSuivant.addEventListener("click", function () {
  // on doit rechercher deux race
  chercher2Race();

  // remettre les deux card à la possibilité d'appuyer dessus
  var premierCard = document.querySelector(".premier");
  var deuxiemeCard = document.querySelector(".deuxieme");
  premierCard.setAttribute("data-disabled", "false");
  deuxiemeCard.setAttribute("data-disabled", "false");

  // bouton il doit redisparaitre
  buttonSuivant.style.display = "none";

  // retoru des card à la normal sans contour
  premierCard.style.border = "none";
  deuxiemeCard.style.border = "none";
  //var cardBeforeElement1 = window.getComputedStyle(premierCard, "::before");
  premierCard.style.content = "none";
  //var cardBeforeElement2 = window.getComputedStyle(deuxiemeCard, "::before");
  deuxiemeCard.style.content = "none"; // Pour masquer le contenu de l'élément ::before

  // rendre l'indication non visible
  var indiq = document.querySelector(".indication");
  indiq.style.display = "none";
});

// Ajoutez un gestionnaire d'événements pour les touches "Entrée" (13) ou "Espace" (32)
document.addEventListener("keydown", function (event) {
  if (event.keyCode === 13 || event.keyCode === 32) {
    // Pas de comportement par default
    event.preventDefault();
    // Simulez un clic sur le bouton
    buttonSuivant.click();
  }
});

//RELOAD
// Ajoutez un gestionnaire d'événements au bouton "Nouvelles cartes"
var buttonReload = document.getElementById("reload-chat");
buttonReload.addEventListener("click", function () {
  // on doit rechercher deux race
  chercher2Race();

  // remettre les deux card à la possibilité d'appuyer dessus
  var premierCard = document.querySelector(".premier");
  var deuxiemeCard = document.querySelector(".deuxieme");
  premierCard.setAttribute("data-disabled", "false");
  deuxiemeCard.setAttribute("data-disabled", "false");

  // bouton il doit redisparaitre
  buttonSuivant.style.display = "none";

  // retoru des card à la normal sans contour
  premierCard.style.border = "none";
  deuxiemeCard.style.border = "none";
  //var cardBeforeElement1 = window.getComputedStyle(premierCard, "::before");
  premierCard.style.content = "none";
  //var cardBeforeElement2 = window.getComputedStyle(deuxiemeCard, "::before");
  deuxiemeCard.style.content = "none"; // Pour masquer le contenu de l'élément ::before

  // rendre l'indication non visible
  var indiq = document.querySelector(".indication");
  indiq.style.display = "none";
});

//RECOMMENCER
// Ajoutez un gestionnaire d'événements au bouton "Nouvelles cartes"
var buttonRecommencer = document.getElementById("recommencer-chat");
buttonRecommencer.addEventListener("click", function () {
  // on doit rechercher deux race
  chercher2Race();

  // remettre les deux card à la possibilité d'appuyer dessus
  var premierCard = document.querySelector(".premier");
  var deuxiemeCard = document.querySelector(".deuxieme");
  premierCard.setAttribute("data-disabled", "false");
  deuxiemeCard.setAttribute("data-disabled", "false");

  // bouton il doit redisparaitre
  buttonSuivant.style.display = "none";

  // retoru des card à la normal sans contour
  premierCard.style.border = "none";
  deuxiemeCard.style.border = "none";
  //var cardBeforeElement1 = window.getComputedStyle(premierCard, "::before");
  premierCard.style.content = "none";
  //var cardBeforeElement2 = window.getComputedStyle(deuxiemeCard, "::before");
  deuxiemeCard.style.content = "none"; // Pour masquer le contenu de l'élément ::before

  // rendre l'indication non visible
  var indiq = document.querySelector(".indication");
  indiq.style.display = "none";

  //POINT A 0
  var bonScore = document.querySelector(".nb-score-bon");
  bonScore.textContent = "0";
  var nulScore = document.querySelector(".nb-score-mauvais");
  nulScore.textContent = "0";
  var bestScore = document.querySelector(".nb-best");
  bestScore.textContent = "0";
});
