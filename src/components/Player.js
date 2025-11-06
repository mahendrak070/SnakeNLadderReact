import React from 'react';
import './Player.css';

const Player = ({ player, cellNumber, isMoving }) => {
  return (
    <div
      className={`player-piece ${isMoving ? 'moving' : ''}`}
      style={{
        backgroundColor: player.color,
        boxShadow: `0 0 10px ${player.color}40`
      }}
      title={player.name}
    >
      <span className="player-initial">{player.name.charAt(player.name.length - 1)}</span>
    </div>
  );
};

export default Player;

