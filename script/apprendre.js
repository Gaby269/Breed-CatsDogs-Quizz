$.ajax({
  method: "GET",
  url: "https://api.thecatapi.com/v1/breeds",
  contentType: "application/json",
  success: function (result) {
    // Traitez la réponse ici, "result" contient les données
    const cardContainer = document.getElementById("cards");

    result.forEach((item, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.classList.add("carte-chat");

      // Utilisez l'URL correcte pour récupérer les images par race
      $.ajax({
        method: "GET",
        url: `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${item.id}&api_key=REPLACE_ME`, // Remplacez REPLACE_ME par votre clé API
        contentType: "application/json",
        success: function (result2) {
          // Nombre aléatoire pour avoir l'id d'une photo différente à chaque fois
          const randomIndex = Math.floor(Math.random() * result2.length); // Génère un nb aléatoire
          const item2 = result2[randomIndex]; // Sélectionne une image aléatoire

          // Créez l'élément <img> avec des styles CSS pour la taille
          const img = document.createElement("img");
          img.src = item2.url;
          img.alt = item.name;

          // Vérifiez l'orientation de l'image
          if (item2.height > item2.width) {
            // Si la hauteur est plus grande que la largeur (portrait)
            img.style.width = "auto"; // Ajustez la largeur automatiquement
            img.style.height = "200px"; // Définissez une hauteur fixe
          } else {
            // Si la largeur est plus grande que la hauteur (paysage)
            img.style.width = "200px"; // Définissez une largeur fixe
            img.style.height = "auto"; // Ajustez la hauteur automatiquement
          }

          // Modifiez le style de la carte pour définir l'image du chat en tant que fond
          card.style.backgroundImage = `url('${item2.url}')`;

          card.innerHTML = `
                        <h2>${item.name}</h2>
                    `;

          //card.appendChild(img);
          cardContainer.appendChild(card);
        },
        error: function ajaxError(jqXHR) {
          console.error("Error: ", jqXHR.responseText);
        },
      });
    });
  },
  error: function ajaxError(jqXHR) {
    console.error("Error: ", jqXHR.responseText);
  },
});
