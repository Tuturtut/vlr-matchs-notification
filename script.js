fetch("http://127.0.0.1:8000/match/449012")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    let content = document.getElementById("content");
    let title = document.createElement("h1");
    title.innerText = `${data.score_named_with_dash}`;

    content.appendChild(title);

    let games = document.createElement("div");
    games.classList.add("games");
    let gamesArray = Object.values(data.games);

    for (let game of gamesArray) {
      console.log(
        `Manche ${game.game} : ${game.team_1_score} - ${game.team_2_score}`
      );

      let gameElement = document.createElement("p");
      gameElement.innerText = `Manche ${game.game} : ${game.team_1_score} - ${game.team_2_score}`;
      games.appendChild(gameElement);
    }
    content.appendChild(games);
  })
  .catch((error) => console.error("Error:", error));
