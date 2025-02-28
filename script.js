fetch("http://127.0.0.1:8000/matchs/results")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    let content = document.getElementById("content");

    let title = document.createElement("h1");
    title.innerText = "Liste des matchs";
    content.appendChild(title);

    let matchList = document.createElement("div");
    matchList.classList.add("match-list");

    for (const matchId in data) {
      let match = data[matchId];

      let matchContainer = document.createElement("div");
      matchContainer.classList.add("match-container");

      let matchTitle = document.createElement("p");
      matchTitle.innerText = `${match.formatted_scores.score_named_with_dash}`;
      matchContainer.appendChild(matchTitle);

      // Redirige vers match.html en passant l'ID dans l'URL
      let matchLink = document.createElement("a");
      matchLink.href = `match.html?id=${match.match_id}`;
      matchLink.innerText = "Voir les détails du match";
      matchContainer.appendChild(matchLink);

      matchList.appendChild(matchContainer);
    }

    content.appendChild(matchList);
  })
  .catch((error) => console.error("Erreur:", error));
