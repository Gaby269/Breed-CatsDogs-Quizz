// Nombre aleatoire pour savoir ou mettre la vrai image
const randomPlace = Math.floor(Math.random() * 2);
console.log(randomPlace);

$.ajax({
  method: "GET",
  url: "https://api.thecatapi.com/v1/breeds",
  contentType: "application/json",
  success: function (resultRace) {
    //TROUVER LE NOM D'UN CHAT AU HASARD
    var raceChat = document.querySelector(".race-chat");
    var tailleResult = resultRace.length;

    // nombre aleatoire pour trouver les races aleatoires
    const itemRandomVrai = Math.floor(Math.random() * tailleResult); // Génère un nb aléatoire
    const itemRandomFaux = Math.floor(Math.random() * tailleResult); // Génère un nb aléatoire

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
        const itemRandomVrai = Math.floor(Math.random() * tailleResult); // Génère un nb aléatoire

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
        const itemRandomFaux = Math.floor(Math.random() * tailleResult); // Génère un nb aléatoire

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

function validate() {}
