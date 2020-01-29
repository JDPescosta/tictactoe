const gameController = (doc => {
  let modal = doc.getElementById("myModal");
  let closeBtn = doc.getElementsByClassName("close")[0];
  let gameOverText = doc.getElementById("gameover-text");
  let currentTurn = 1;
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const checkGameState = doc => {
    for (let i = 0; i < winConditions.length; i++) {
      if (
        currentBoard[winConditions[i][0]].innerHTML &&
        currentBoard[winConditions[i][1]].innerHTML &&
        currentBoard[winConditions[i][2]].innerHTML
      ) {
        if (
          currentBoard[winConditions[i][0]].innerHTML ==
            currentBoard[winConditions[i][1]].innerHTML &&
          currentBoard[winConditions[i][0]].innerHTML ==
            currentBoard[winConditions[i][2]].innerHTML
        ) {
          gameOver(currentBoard[winConditions[i][0]].innerHTML);
          break;
        }
      }
    }
    if (++currentTurn > 9) {
      gameOver("Draw");
    }
  };

  const gameOver = gameResult => {
    gameOverText.innerText =
      gameResult === "Draw"
        ? `Game over: ${gameResult}`
        : `Game over: Player ${gameResult} wins!`;
    modal.style.display = "block";
  };

  const gameBoard = (() => {
    let boardContainer = doc.getElementById("board-container");
    let board = [];
    for (let i = 0; i < 9; i++) {
      board[i] = doc.createElement("div");
      board[i].classList.add("game-square");
      board[i].addEventListener("click", e => {
        if (e.target.textContent == "") {
          e.target.textContent = currentTurn % 2 !== 0 ? "X" : "O";
          checkGameState();
        }
      });
      boardContainer.appendChild(board[i]);
    }
  })(doc);
  const currentBoard = doc.getElementsByClassName("game-square");

  closeBtn.onclick = function() {
    modal.style.display = "none";
    gameReset();
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      gameReset();
    }
  };

  const gameReset = () =>{
    for(i = 0; i < currentBoard.length; i++){
      currentBoard[i].textContent = '';
      currentTurn = 1;
    }
  };
})(document);
