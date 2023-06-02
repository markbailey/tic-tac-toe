import { Fragment, useState } from 'react';

import { Player, WinningCombos } from './common';
import Square, { SquareValue } from './components/Square';
import GameOver, { Winner } from './components/GameOver';
import './app.css';

function App() {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9));
  const [player, setPlayer] = useState<keyof typeof Player>(Player.X);
  const [winner, setWinner] = useState<Winner | null>(null);

  const onSquareClick = (index: number) => {
    if (squares[index] !== undefined || winner !== null) return;

    const newSquares = [...squares];
    newSquares[index] = player;
    setSquares(newSquares);

    for (const combo of WinningCombos) {
      const [a, b, c] = combo;
      const isMatch =
        newSquares[a] !== undefined &&
        newSquares[a] === newSquares[b] &&
        newSquares[a] === newSquares[c];

      if (isMatch) {
        setWinner(player);
        break;
      }
    }

    setPlayer(player === Player.X ? Player.O : Player.X);
    if (newSquares.every((square) => square !== undefined)) setWinner('draw');
  };

  const onResetClick = () => {
    setSquares(Array(9));
    setPlayer(Player.X);
    setWinner(null);
  };

  return (
    <Fragment>
      <GameOver winner={winner} />
      <table className="board">
        <tbody>
          <tr>
            <Square index={0} value={squares[0]} onClick={onSquareClick} />
            <Square index={1} value={squares[1]} onClick={onSquareClick} />
            <Square index={2} value={squares[2]} onClick={onSquareClick} />
          </tr>
          <tr>
            <Square index={3} value={squares[3]} onClick={onSquareClick} />
            <Square index={4} value={squares[4]} onClick={onSquareClick} />
            <Square index={5} value={squares[5]} onClick={onSquareClick} />
          </tr>
          <tr>
            <Square index={6} value={squares[6]} onClick={onSquareClick} />
            <Square index={7} value={squares[7]} onClick={onSquareClick} />
            <Square index={8} value={squares[8]} onClick={onSquareClick} />
          </tr>
        </tbody>
      </table>

      <button className="reset" onClick={onResetClick}>
        Reset Game
      </button>
    </Fragment>
  );
}

export default App;
