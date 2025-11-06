import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import Dice from './components/Dice';
import Player from './components/Player';

function App() {
  const [players, setPlayers] = useState([
    { id: 1, name: 'Player 1', position: 1, color: '#FF6B6B' },
    { id: 2, name: 'Player 2', position: 1, color: '#4ECDC4' }
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceValue, setDiceValue] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [gameStatus, setGameStatus] = useState('');
  const [winner, setWinner] = useState(null);
  const [isMoving, setIsMoving] = useState(false);

  // Snake and Ladder positions
  const snakes = {
    16: 6, 46: 25, 49: 11, 62: 19, 64: 60, 74: 53, 89: 68, 92: 88, 95: 75, 99: 80
  };

  const ladders = {
    2: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100
  };

  const rollDice = () => {
    if (isRolling || isMoving || winner) return;

    setIsRolling(true);
    setDiceValue(0);
    setGameStatus('Rolling dice...');

    // Animate dice roll
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
    }, 100);

    setTimeout(() => {
      clearInterval(rollInterval);
      const finalValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(finalValue);
      setIsRolling(false);
      movePlayer(finalValue);
    }, 1000);
  };

  const movePlayer = (steps) => {
    setIsMoving(true);
    const player = players[currentPlayer];
    let newPosition = player.position + steps;

    if (newPosition > 100) {
      newPosition = 100 - (newPosition - 100);
    }

    // First move to the new position
    setTimeout(() => {
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayer] = {
        ...player,
        position: newPosition
      };
      setPlayers(updatedPlayers);

      // Check for ladders after initial move
      if (ladders[newPosition]) {
        setGameStatus(`${player.name} found a ladder! Climbing up...`);
        setTimeout(() => {
          const finalPosition = ladders[newPosition];
          const finalUpdatedPlayers = [...updatedPlayers];
          finalUpdatedPlayers[currentPlayer] = {
            ...player,
            position: finalPosition
          };
          setPlayers(finalUpdatedPlayers);
          checkWin(finalPosition, player);
        }, 800);
      }
      // Check for snakes after initial move
      else if (snakes[newPosition]) {
        setGameStatus(`${player.name} encountered a snake! Sliding down...`);
        setTimeout(() => {
          const finalPosition = snakes[newPosition];
          const finalUpdatedPlayers = [...updatedPlayers];
          finalUpdatedPlayers[currentPlayer] = {
            ...player,
            position: finalPosition
          };
          setPlayers(finalUpdatedPlayers);
          checkWin(finalPosition, player);
        }, 800);
      } else {
        checkWin(newPosition, player);
      }
    }, 600);
  };

  const checkWin = (position, player) => {
    setIsMoving(false);
    
    if (position === 100) {
      setWinner(player);
      setGameStatus(`🎉 ${player.name} wins! 🎉`);
    } else {
      setCurrentPlayer((prev) => {
        const nextPlayer = (prev + 1) % players.length;
        setGameStatus(`It's ${players[nextPlayer].name}'s turn`);
        return nextPlayer;
      });
    }
  };

  const resetGame = () => {
    setPlayers([
      { id: 1, name: 'Player 1', position: 1, color: '#FF6B6B' },
      { id: 2, name: 'Player 2', position: 1, color: '#4ECDC4' }
    ]);
    setCurrentPlayer(0);
    setDiceValue(0);
    setGameStatus('Roll the dice to start!');
    setWinner(null);
    setIsMoving(false);
  };

  useEffect(() => {
    setGameStatus(`It's ${players[currentPlayer].name}'s turn`);
  }, [currentPlayer, players]);

  return (
    <div className="App">
      <div className="game-container">
        <div className="game-header">
          <h1 className="game-title">🐍 Snake & Ladder 🪜</h1>
          <div className="game-info">
            <div className="current-player-info">
              <div 
                className="player-indicator" 
                style={{ backgroundColor: players[currentPlayer].color }}
              ></div>
              <span>{players[currentPlayer].name}'s Turn</span>
            </div>
            {winner && (
              <div className="winner-announcement">
                🎉 {winner.name} Wins! 🎉
              </div>
            )}
          </div>
        </div>

        <div className="game-status">{gameStatus}</div>

        <div className="board-container">
          <GameBoard 
            players={players}
            snakes={snakes}
            ladders={ladders}
            isMoving={isMoving}
          />
        </div>

        <div className="game-controls">
          <Dice 
            value={diceValue} 
            isRolling={isRolling}
            onRoll={rollDice}
            disabled={isRolling || isMoving || !!winner}
          />
          
          <button 
            className="reset-button" 
            onClick={resetGame}
          >
            🔄 Reset Game
          </button>
        </div>

        <div className="players-list">
          {players.map((player, index) => (
            <div 
              key={player.id} 
              className={`player-card ${index === currentPlayer ? 'active' : ''}`}
            >
              <div 
                className="player-color" 
                style={{ backgroundColor: player.color }}
              ></div>
              <div className="player-details">
                <div className="player-name">{player.name}</div>
                <div className="player-position">Position: {player.position}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

