import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";
import './App.css'
import { useState } from 'react';

const actions = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

function randomAction() {

  const keys = Object.keys(actions);
  const index = Math.floor(Math.random() * keys.length);

  return keys[index];
}

function calculateWinner(action1, action2) {
  if(action1 === action2) {
    return 0;
  } else if (actions[action1] .includes(action2)) {
  return -1;
  } else if (actions[action2].includes(action1)){
    return 1;
  }

  return null;
}

function ActionIcon({ action, ...props }) {
  const icons = {
    rock: FaHandRock,
    paper: FaHandPaper,
    scissors: FaHandScissors,
  };
  const Icon = icons[action];

  return <Icon {...props} />;
}

function Player({ name = "Player", score = 0, action = "rock" }) {
  return (
    <div className="player">
      <div className='score'>{`${name}: ${score}`}</div>
      <div className='action'>
        {action && <ActionIcon action={action} size={100}/>}
      </div>
    </div>
  );
}

function ActionButton({action = "rock", onActionSelected}){
  return(
    <button className="round-btn" onClick={()=>onActionSelected(action)}> 
      <ActionIcon action={action} size={40}/>
    </button>
  );
}

function ShowWinner({winner = 0}) {
  const text = {
    "-1": "Você venceu!",
    0: "Empate!",
    1: "Você perdeu..",
  };

  return (
    <h2>{text[winner]}</h2>
  )
}


function App() {
  const [playerAction, setPlayerAction] = useState("");
  const [computerAction, setComputerAction] = useState("");

  const [playerScore, setPlayerScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)
  const [winner, setWinner] = useState(0)
  const [gameOver, setGameOver] = useState(false);

  const onActionSelected = (selectedAction) => {
    if (!gameOver) {
      const newComputerAction = randomAction();

      setPlayerAction(selectedAction);
      setComputerAction(newComputerAction);

      const newWinner = calculateWinner(selectedAction, newComputerAction);
      setWinner(newWinner);

      if (newWinner === -1) {
        setPlayerScore(playerScore + 1);
      } else if (newWinner === 1) {
        setComputerScore(computerScore + 1);
      }

      setGameOver(true);
    }
  };

  function Modal({ onPlayAgain }) {
    return (
      <div className="modal">
        <div className="modal-content">
        <ShowWinner winner={winner}/>
          <button onClick={onPlayAgain}>Jogar Novamente</button>
        </div>
      </div>
    );
  }

  const playAgain = () => {
    setPlayerAction("");
    setComputerAction("");
    setWinner(0);
    setGameOver(false);
  }

  return (
    <>
      <h1>Jokenpô</h1>
      <div className="card">
        <Player name="Player" score={playerScore} action={playerAction}/>
        <Player name="Computer" score={computerScore} action={computerAction}/>
      </div>
      <div>
        <ActionButton action="rock" onActionSelected={onActionSelected} disabled={gameOver} />
        <ActionButton action="paper" onActionSelected={onActionSelected} disabled={gameOver} />
        <ActionButton action="scissors" onActionSelected={onActionSelected} disabled={gameOver} />
      </div>
      {gameOver && <Modal onPlayAgain={playAgain} />}
    </>
  )
}

export default App

