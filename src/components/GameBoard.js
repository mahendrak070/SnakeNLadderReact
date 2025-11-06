import React from 'react';
import './GameBoard.css';
import Player from './Player';

const GameBoard = ({ players, snakes, ladders, isMoving }) => {
  const board = [];
  let currentNumber = 100;

  // Create board from 100 to 1 (snake pattern)
  for (let row = 0; row < 10; row++) {
    const rowCells = [];
    const isEvenRow = row % 2 === 0;

    for (let col = 0; col < 10; col++) {
      const cellNumber = isEvenRow ? currentNumber - col : currentNumber - (9 - col);
      rowCells.push(cellNumber);
    }

    board.push(rowCells);
    currentNumber -= 10;
  }

  const getCellPosition = (number) => {
    for (let row = 0; row < 10; row++) {
      const col = board[row].indexOf(number);
      if (col !== -1) {
        return { row, col };
      }
    }
    return null;
  };

  const getSnakePath = (start, end) => {
    const startPos = getCellPosition(start);
    const endPos = getCellPosition(end);
    if (!startPos || !endPos) return '';

    const cellSize = 50;
    const startX = startPos.col * cellSize + cellSize / 2;
    const startY = startPos.row * cellSize + cellSize / 2;
    const endX = endPos.col * cellSize + cellSize / 2;
    const endY = endPos.row * cellSize + cellSize / 2;

    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2 - 30;

    return `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;
  };

  const getLadderPath = (start, end) => {
    const startPos = getCellPosition(start);
    const endPos = getCellPosition(end);
    if (!startPos || !endPos) return '';

    const cellSize = 50;
    const startX = startPos.col * cellSize + cellSize / 2;
    const startY = startPos.row * cellSize + cellSize / 2;
    const endX = endPos.col * cellSize + cellSize / 2;
    const endY = endPos.row * cellSize + cellSize / 2;

    return `M ${startX} ${startY} L ${endX} ${endY}`;
  };

  const getPlayersInCell = (cellNumber) => {
    return players.filter(player => player.position === cellNumber);
  };

  return (
    <div className="game-board-wrapper">
      <svg className="snakes-ladders-overlay" viewBox="0 0 500 500" preserveAspectRatio="none">
        {Object.entries(snakes).map(([start, end]) => (
          <g key={`snake-${start}-${end}`}>
            <path
              d={getSnakePath(parseInt(start), parseInt(end))}
              stroke="#e74c3c"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              className="snake-path"
            />
            <circle
              cx={getCellPosition(parseInt(start))?.col * 50 + 25}
              cy={getCellPosition(parseInt(start))?.row * 50 + 25}
              r="4"
              fill="#e74c3c"
            />
          </g>
        ))}
        {Object.entries(ladders).map(([start, end]) => (
          <g key={`ladder-${start}-${end}`}>
            <path
              d={getLadderPath(parseInt(start), parseInt(end))}
              stroke="#27ae60"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              className="ladder-path"
            />
            <circle
              cx={getCellPosition(parseInt(start))?.col * 50 + 25}
              cy={getCellPosition(parseInt(start))?.row * 50 + 25}
              r="4"
              fill="#27ae60"
            />
          </g>
        ))}
      </svg>
      <div className="game-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((cellNumber) => {
              const isStart = cellNumber === 1;
              const isEnd = cellNumber === 100;
              const hasSnake = snakes[cellNumber];
              const hasLadder = ladders[cellNumber];
              const cellPlayers = getPlayersInCell(cellNumber);

              return (
                <div
                  key={cellNumber}
                  className={`board-cell ${isStart ? 'start-cell' : ''} ${isEnd ? 'end-cell' : ''} ${hasSnake ? 'snake-cell' : ''} ${hasLadder ? 'ladder-cell' : ''}`}
                >
                  <div className="cell-number">{cellNumber}</div>
                  {cellPlayers.length > 0 && (
                    <div className="cell-players">
                      {cellPlayers.map((player) => (
                        <Player
                          key={player.id}
                          player={player}
                          cellNumber={cellNumber}
                          isMoving={isMoving}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;

