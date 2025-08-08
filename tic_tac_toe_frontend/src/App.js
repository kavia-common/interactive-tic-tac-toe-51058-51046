import React, { useState } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * Minimal, light-themed two-player Tic Tac Toe board using React.
 * Features: Centered 3x3 grid, player indicator, win/draw detection, restart button, and minimalistic style.
 */
function App() {
  // State: squares, 'X'/'O', winner, and draw
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);

  // PUBLIC_INTERFACE
  function handleClick(i) {
    // Ignore if won or square taken
    if (squares[i] || winner) return;
    const next = squares.slice();
    next[i] = xIsNext ? 'X' : 'O';
    setSquares(next);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  // UI: Current/Win/Draw message
  let status;
  if (winner) {
    status = (
      <span>
        Winner:&nbsp;
        <span className={winner === 'X' ? 'player-x' : 'player-o'}>
          {winner}
        </span>
      </span>
    );
  } else if (isDraw) {
    status = <span>Draw!</span>;
  } else {
    status = (
      <span>
        Current turn:&nbsp;
        <span className={xIsNext ? 'player-x' : 'player-o'}>
          {xIsNext ? 'X' : 'O'}
        </span>
      </span>
    );
  }

  return (
    <div className="tictactoe-app">
      <div className="ttt-status">{status}</div>
      <div className="ttt-board">
        {squares.map((val, i) => (
          <button
            key={i}
            className="ttt-cell"
            onClick={() => handleClick(i)}
            aria-label={`Cell ${i + 1}: ${val || 'empty'}`}
          >
            {val}
          </button>
        ))}
      </div>
      <button className="ttt-restart-btn" onClick={handleRestart}>
        Restart Game
      </button>
    </div>
  );
}

// PUBLIC_INTERFACE
function calculateWinner(sq) {
  /**
   * Returns 'X', 'O', or null depending on win state.
   */
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6], // diagonals
  ];
  for (const [a, b, c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
      return sq[a];
    }
  }
  return null;
}

export default App;
