// Fonction pour extraire un paramètre de requête de l'URL
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Récupérez la valeur de l'argument "id" de l'URL
var cardId = getParameterByName("id");

// Utilisez l'URL correcte pour récupérer les images par race
$.ajax({
  method: "GET",
  url: "https://api.thedogapi.com/v1/breeds",
  contentType: "application/json",
  success: function (result) {
    var i = 0;
    result.forEach((item, index) => {
      if (item.id == cardId) {
        i = index;
        console.log(i, result[i].name, result[i].origin);
      }
    });
    var origine = result[i].origin;
    // TITRE DE LA PAGE
    document.title = `Details sur ${result[i].name}`;
    var elementTitre = document.querySelector(".titre"); // Sélectionnez l'élément avec la classe "titre"
    elementTitre.textContent = `Details sur ${result[i].name}`; // Modifiez le contenu de l'élément

    // RACE
    var race_chat = document.querySelector(".race");
    if (race_chat) {
      var race = document.createElement("p");
      race.classList.add("texte-race");
      race.textContent = result[i].name;
      race_chat.appendChild(race);
    } else {
      console.error("L'élément avec la classe 'nrace' n'a pas été trouvé.");
    }

    // ORIGIN
    var origin = document.querySelector(".origin");
    if (origin) {
      // DRAPEAU
      $.ajax({
        method: "GET",
        url: "https://restcountries.com/v3.1/all",
        contentType: "application/json",
        success: function (resultDrapeau) {
          //console.log(resultDrapeau);

          var i2 = 0;
          resultDrapeau.forEach((item, index) => {
            if (origine == item.name.common) {
              i2 = index;
              console.log(origine, item.name.common);
            }
          });
          var flag = document.createElement("p");
          flag.classList.add("flag-origin");
          flag.textContent =
            resultDrapeau[i2].flag +
            "  " +
            resultDrapeau[i2].translations.fra.common;
          origin.appendChild(flag);
        },

        error: function ajaxError(jqXHR) {
          console.error("Error: ", jqXHR.responseText);
        },
      });
    } else {
      console.error("L'élément avec la classe 'norigin' n'a pas été trouvé.");
    }

    // TEMPERAMENT
    var temperament = document.querySelector(".temperament");
    if (temperament) {
      var temp = document.createElement("p");
      temp.classList.add("texte-temperament");
      temp.textContent = result[i].temperament;
      temperament.appendChild(temp);
    } else {
      console.error(
        "L'élément avec la classe 'temperament' n'a pas été trouvé."
      );
    }

    // ELEVE POUR
    // Assurez-vous que l'élément avec la classe "eleve-pour" existe avant de le sélectionner
    var elevage = document.querySelector(".eleve-pour");
    if (elevage) {
      // Créez l'élément <p> et attribuez-lui le contenu de "item.bred-for"
      var desc = document.createElement("p");
      desc.classList.add("texte-elevage");
      desc.textContent = result[i].bred_for; // Utilisation de textContent pour éviter l'injection de code potentiellement dangereux
      // Ajoutez l'élément <p> au conteneur "eleve-pour"
      elevage.appendChild(desc);
    } else {
      console.error(
        "L'élément avec la classe 'eleve-pour' n'a pas été trouvé."
      );
    }

    // AGE
    var age = document.querySelector(".age");
    if (age) {
      var a = document.createElement("p");
      a.textContent = result[i].life_span;
      age.appendChild(a);
    } else {
      console.error("L'élément avec la classe 'age' n'a pas été trouvé.");
    }
  },
  error: function ajaxError(jqXHR) {
    console.error("Error: ", jqXHR.responseText);
  },
});

// Utilisez l'URL correcte pour récupérer les images par race
$.ajax({
  method: "GET",
  url: `https://api.thedogapi.com/v1/images/search?limit=10&breed_ids=${cardId}&api_key=REPLACE_ME`,
  contentType: "application/json",
  success: function (result) {
    // Récupérez le conteneur du carrousel
    var affichage = document.querySelector("#affichage-chat-detail");

    result.forEach(function (imageUrl, index) {
      // Créez un élément pour chaque image
      var affichageItem = document.createElement("img");
      affichageItem.src = imageUrl.url;
      affichageItem.alt = "Image chat";
      affichageItem.style = "width:300px; height:auto;";

      // Ajoutez l'élément au carrousel
      affichage.appendChild(affichageItem);
    });
  },
  error: function ajaxError(jqXHR) {
    console.error("Error: ", jqXHR.responseText);
  },
});
