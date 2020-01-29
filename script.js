const gameController = (doc => {

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

  const checkGameState = (doc) => {
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
    currentTurn++;
  };

  const gameOver = (gameResult) => {
    console.log(`Game over: ${gameResult} wins`);
  };

  const gameBoard = (() => {
    let boardContainer = doc.getElementById("board-container");
    let board = [];
    for (let i = 0; i < 9; i++) {
      board[i] = doc.createElement("div");
      board[i].classList.add("game-square");
      board[i].addEventListener("click", e => {
          if(e.target.textContent == ''){
            e.target.textContent = currentTurn % 2 !== 0 ? "X" : "O";
            checkGameState();
            if (currentTurn > 9) gameOver();
          }
      });
      boardContainer.appendChild(board[i]);
    }
  })(doc);
  const currentBoard = doc.getElementsByClassName("game-square");
 })(document);
