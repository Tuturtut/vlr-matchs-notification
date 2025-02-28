// Récupérer l'ID du match depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const matchId = urlParams.get("id");

// Vérifier si un ID est présent
if (!matchId) {
  document.getElementById("content").innerHTML =
    "<h1>Aucun match sélectionné</h1>";
} else {
  fetch(`http://127.0.0.1:8000/match/${matchId}`)
    .then((res) => res.json())
    .then((match) => {
      console.log(match);

      let content = document.getElementById("content");
      content.innerHTML = ""; // Nettoyer le contenu

      // Titre principal
      let title = document.createElement("h1");
      title.innerText = `Match : ${match.team_1} vs ${match.team_2}`;
      title.classList.add("match-title");
      content.appendChild(title);

      // Score final
      let matchScore = document.createElement("h2");
      matchScore.innerText = `${match.score_named_with_dash}`;
      matchScore.classList.add("match-score");
      content.appendChild(matchScore);

      // Conteneur des détails du match
      let matchDetails = document.createElement("div");
      matchDetails.classList.add("match-details");

      // Détails des équipes
      let teamsContainer = document.createElement("div");
      teamsContainer.classList.add("teams-container");

      let team1Element = document.createElement("div");
      team1Element.classList.add("team");
      team1Element.innerHTML = `<h3>${match.team_1}</h3><p>Score total: ${match.team_1_score}</p>`;

      let team2Element = document.createElement("div");
      team2Element.classList.add("team");
      team2Element.innerHTML = `<h3>${match.team_2}</h3><p>Score total: ${match.team_2_score}</p>`;

      teamsContainer.appendChild(team1Element);
      teamsContainer.appendChild(team2Element);
      matchDetails.appendChild(teamsContainer);
      content.appendChild(matchDetails);

      // Détails des manches (games)
      let roundsList = document.createElement("div");
      roundsList.classList.add("rounds");

      let roundsTitle = document.createElement("h3");
      roundsTitle.innerText = "Détails des manches";
      roundsList.appendChild(roundsTitle);

      Object.values(match.games).forEach((game) => {
        let roundElement = document.createElement("div");
        roundElement.classList.add("round");

        roundElement.innerHTML = `
                <p>Manche ${game.game} : ${game.team_1_score} - ${game.team_2_score}</p>
            `;

        roundsList.appendChild(roundElement);
      });

      content.appendChild(roundsList);

      // Bouton retour à la liste des matchs
      let backButton = document.createElement("a");
      backButton.href = "index.html";
      backButton.innerText = "Retour à la liste des matchs";
      backButton.classList.add("back-button");
      content.appendChild(backButton);
    })
    .catch((error) => {
      document.getElementById("content").innerHTML =
        "<h1>Match introuvable</h1>";
      console.error("Erreur:", error);
    });
}
