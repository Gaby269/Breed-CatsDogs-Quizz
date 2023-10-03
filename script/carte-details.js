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
  url: "https://api.thecatapi.com/v1/breeds",
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

    // DESCRITPTION
    // Assurez-vous que l'élément avec la classe "description" existe avant de le sélectionner
    var description = document.querySelector(".description");
    if (description) {
      // Créez l'élément <p> et attribuez-lui le contenu de "item.description"
      var desc = document.createElement("p");
      desc.classList.add("texte-description");
      desc.textContent = result[i].description; // Utilisation de textContent pour éviter l'injection de code potentiellement dangereux
      // Ajoutez l'élément <p> au conteneur "description"
      description.appendChild(desc);
    } else {
      console.error(
        "L'élément avec la classe 'description' n'a pas été trouvé."
      );
    }

    // AGE
    var age = document.querySelector(".age");
    if (age) {
      var a = document.createElement("p");
      a.textContent = result[i].life_span + " ans";
      age.appendChild(a);
    } else {
      console.error("L'élément avec la classe 'age' n'a pas été trouvé.");
    }

    // CARACTERISTIQUES
    var adaptabilite = document.querySelector(".caracteristiques_score_adap");
    var energie = document.querySelector(".caracteristiques_score_energy");
    var enfant = document.querySelector(".caracteristiques_score_enf");
    var social = document.querySelector(".caracteristiques_score_social");
    var perte = document.querySelector(".caracteristiques_score_perte");
    var toilettage = document.querySelector(".caracteristiques_score_toil");
    var sante = document.querySelector(".caracteristiques_score_sante");
    var etrange = document.querySelector(".caracteristiques_score_etran");
    var affectif = document.querySelector(".caracteristiques_score_affe");
    var chien = document.querySelector(".caracteristiques_score_dog");
    var intelligence = document.querySelector(".caracteristiques_score_intel");
    var vocalisations = document.querySelector(".caracteristiques_score_voca");

    if (
      adaptabilite &&
      energie &&
      enfant &&
      social &&
      perte &&
      toilettage &&
      sante &&
      etrange &&
      affectif &&
      chien &&
      intelligence &&
      vocalisations
    ) {
      var adap = result[i].adaptability; // Utilisation de textContent pour éviter l'injection de code potentiellement dangereux
      var ener = result[i].energy_level;
      var enfa = result[i].child_friendly;
      var soci = result[i].social_needs;
      var pert = result[i].shedding_level;
      var toil = result[i].grooming;
      var sant = result[i].health_issues;
      var etra = result[i].stranger_friendly;
      var affe = result[i].affection_level;
      var chie = result[i].dog_friendly;
      var inte = result[i].intelligence;
      var voca = result[i].vocalisation;
      for (var i = 0; i < 5; i++) {
        var spanAdapt = document.createElement("span");
        spanAdapt.classList.add("caracteristiques_dot");
        // Vérifiez si l'indice actuel est inférieur à "adaptability" pour rendre les éléments actifs
        if (i < adap) {
          spanAdapt.classList.add("active");
        }
        adaptabilite.appendChild(spanAdapt); // Utilisation de appendChild pour ajouter chaque span à l'élément adaptabilite

        var spanEnergie = document.createElement("span");
        spanEnergie.classList.add("caracteristiques_dot");
        if (i < ener) {
          spanEnergie.classList.add("active");
        }
        energie.appendChild(spanEnergie);

        var spanEnfant = document.createElement("span");
        spanEnfant.classList.add("caracteristiques_dot");
        if (i < enfa) {
          spanEnfant.classList.add("active");
        }
        enfant.appendChild(spanEnfant);

        var spanSocial = document.createElement("span");
        spanSocial.classList.add("caracteristiques_dot");
        if (i < soci) {
          spanSocial.classList.add("active");
        }
        social.appendChild(spanSocial);

        var spanPerte = document.createElement("span");
        spanPerte.classList.add("caracteristiques_dot");
        if (i < pert) {
          spanPerte.classList.add("active");
        }
        perte.appendChild(spanPerte);

        var spanToil = document.createElement("span");
        spanToil.classList.add("caracteristiques_dot");
        if (i < toil) {
          spanToil.classList.add("active");
        }
        toilettage.appendChild(spanToil);

        var spanSante = document.createElement("span");
        spanSante.classList.add("caracteristiques_dot");
        if (i < sant) {
          spanSante.classList.add("active");
        }
        sante.appendChild(spanSante);

        var spanEtrange = document.createElement("span");
        spanEtrange.classList.add("caracteristiques_dot");
        if (i < etra) {
          spanEtrange.classList.add("active");
        }
        etrange.appendChild(spanEtrange);

        var spanAffec = document.createElement("span");
        spanAffec.classList.add("caracteristiques_dot");
        if (i < affe) {
          spanAffec.classList.add("active");
        }
        affectif.appendChild(spanAffec);

        var spanChien = document.createElement("span");
        spanChien.classList.add("caracteristiques_dot");
        if (i < chie) {
          spanChien.classList.add("active");
        }
        chien.appendChild(spanChien);

        var spanVocal = document.createElement("span");
        spanVocal.classList.add("caracteristiques_dot");
        if (i < voca) {
          spanVocal.classList.add("active");
          console.log("coucou");
        }
        vocalisations.appendChild(spanVocal);

        var spanIntel = document.createElement("span");
        spanIntel.classList.add("caracteristiques_dot");
        if (i < inte) {
          spanIntel.classList.add("active");
        }
        intelligence.appendChild(spanIntel);
      }
    } else {
      console.error(
        "L'élément avec la classe 'caracteristiques_score_adap' n'a pas été trouvé."
      );
    }
  },
  error: function ajaxError(jqXHR) {
    console.error("Error: ", jqXHR.responseText);
  },
});

// Utilisez l'URL correcte pour récupérer les images par race
$.ajax({
  method: "GET",
  url: `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${cardId}&api_key=REPLACE_ME`, // Remplacez REPLACE_ME par votre clé API
  contentType: "application/json",
  success: function (result) {
    // Récupérez le conteneur du carrousel
    var carousel = document.querySelector(".carousel");

    result.forEach(function (imageUrl, index) {
      var cardItem = document.createElement("div");
      cardItem.classList.add("carousel-item");

      // Marquez la première image comme active
      if (index === 0) {
        cardItem.classList.add("active");
      }

      cardItem.innerHTML = `
                          <img src=${imageUrl.url} alt=Image ${index + 1}>
                    `;

      carousel.appendChild(cardItem);
    });
  },
  error: function ajaxError(jqXHR) {
    console.error("Error: ", jqXHR.responseText);
  },
});
