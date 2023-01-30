import React, { useState, useMemo } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  //logica para tic-tac-toe

  const [tic_tac_toe, setTic_tac_toe] = useState(false);

  function openTicTacToe() {
    setTic_tac_toe(true);
  }

  function closeTicTacToe() {
    setTic_tac_toe(false);
    restartGame();
  }

  const defaultPlayer = "X";
  const [board, setBoard] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState(defaultPlayer);
  const [playerTurn, setPlayerTurn] = useState(defaultPlayer);
  const [hasWon, setHasWon] = useState(false);
  const [placarX, setPlacarX] = useState("-");
  const [placarO, setPlacarO] = useState("-");
  let endGameScreen = document.getElementById("endGame");

  const winningCombinations = useMemo(
    () => [
      [0, 1, 2],
      [0, 4, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8],
    ],
    []
  );

  /*
        verifica cada clique fazendo a troca entre X e O 
        além de não deixar preencher campos já preenchidos
      */
  function click(e, index) {
    if (!hasWon)
      if (e.target.innerText == "") {
        board[index] = playerTurn;
        e.target.innerText = playerTurn;
        ifYouWon();
        setPlayerTurn(playerTurn == "X" ? "O" : "X");
      }
  }

  /*
        Verifica toda vez se a combinação de possíveis ganhadores bate
        além de arrumar o placar conforme existam ganhadores
     */
  function ifYouWon() {
    winningCombinations.forEach(function (value) {
      if (!hasWon) {
        const [pos1, pos2, pos3] = value;

        if (
          board[pos1] != "" &&
          board[pos1] == board[pos2] &&
          board[pos1] == board[pos3]
        ) {
          setHasWon(true);

          showEndGameScreen();
          if (playerTurn == "X") {
            setWinner("X");
            if (placarX == "-") setPlacarX(parseInt(1));
            else setPlacarX((i) => i + 1);
          } else {
            setWinner("O");
            if (placarO == "-") setPlacarO(parseInt(1));
            else setPlacarO((i) => i + 1);
          }
        }
      }
    });
    //Condição para empate
    if (!board.includes("") && !hasWon) {
      nobodyWon();
    }
  }

  // Função responsável por mostrar aviso de empate
  function nobodyWon() {
    showEndGameScreen();
  }

  // Função para reiniciar o jogo completo incluindo placar
  function restartGame() {
    setPlayerTurn(defaultPlayer);
    setBoard(Array(9).fill(""));
    setHasWon(false);
    setPlacarO("-");
    setPlacarX("-");
    endGameScreen.classList.remove("showEndGame");
    //Para evitar que após o empate, todos os avisos de endGame sejam empate também
  }

  //Função para reiniciar o jogo completo sem alterar o placar
  function tryAgain() {
    setPlayerTurn(defaultPlayer);
    setBoard(Array(9).fill(""));
    setHasWon(false);
    endGameScreen.classList.remove("showEndGame");
    //Para evitar que após o empate, todos os avisos de endGame sejam empate também
  }

  function showEndGameScreen() {
    endGameScreen.classList.add("showEndGame");
  }

  return (
    <div id="conteudoGeral">
      <div className="menuContainer">
        <div className="menuTitulo">
          <h1 className="tituloBemVindo">Welcome to Marcel's game</h1>
          <h2 className="subTituloBemVindo">Have fun!</h2>
        </div>

        <div className="menuBtns">
          <button className="btn" onClick={openTicTacToe}>
            Tic Tac Toe
          </button>
        </div>
      </div>

      <Modal
        isOpen={tic_tac_toe}
        contentLabel="contentLabel"
        overlayClassName="fundoTicTacToe"
        className="conteudoTela"
      >
        <section id="tituloJogo">
          <h1>Tic-Tac-Toe</h1>
          <button onClick={closeTicTacToe} id="exitBtn">
            <img id="imgBtn" src="/src/assets/blue-exit-icon-18.jpg" />
          </button>
        </section>

        <section className="informacoesJogoAtual">
          <div className="placarJogo">
            <div className="placarX">
              <h3>X</h3>
              <h3 id="placarAtualX">{placarX}</h3>
            </div>

            <div className="placarO">
              <h3>O</h3>
              <h3 id="placarAtualO">{placarO}</h3>
            </div>
          </div>
          <div id="controladorTurn">Vez de {playerTurn}</div>
        </section>

        <section className="tabuleiroJogo">
          {board.map((item, index) => (
            <div
              onClick={(e) => click(e, index)}
              className="tabuleiroJogoBox"
              key={index}>
              {item}
            </div>
          ))}
          <div id="endGame" className="endGame">
            <span id="messageEndGame">
              {hasWon ? `Player ${winner} won the game!` : "It's a draw"}
            </span>
            <button id="buttonTryAgain" onClick={tryAgain}>
              Try again
            </button>
          </div>
        </section>

        <section className="footer">
          <button id="restartBtn" className="botao" onClick={restartGame}>
            Restart game
          </button>
        </section>
      </Modal>
    </div>
  );
}

export default App;
