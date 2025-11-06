import React from 'react';
import './Dice.css';

const Dice = ({ value, isRolling, onRoll, disabled }) => {
  const getDiceFace = (num) => {
    const dots = [];
    const positions = {
      1: [[1, 1]],
      2: [[0, 0], [2, 2]],
      3: [[0, 0], [1, 1], [2, 2]],
      4: [[0, 0], [0, 2], [2, 0], [2, 2]],
      5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
      6: [[0, 0], [0, 1], [0, 2], [2, 0], [2, 1], [2, 2]]
    };

    const pos = positions[num] || positions[1];
    return pos.map((dot, index) => (
      <div
        key={index}
        className="dice-dot"
        style={{
          gridRow: dot[0] + 1,
          gridColumn: dot[1] + 1
        }}
      />
    ));
  };

  return (
    <div className="dice-container">
      <div 
        className={`dice ${isRolling ? 'rolling' : ''}`}
        onClick={!disabled && !isRolling ? onRoll : undefined}
        style={{ cursor: disabled || isRolling ? 'not-allowed' : 'pointer' }}
      >
        {getDiceFace(value || 1)}
      </div>
      <button
        className="roll-button"
        onClick={onRoll}
        disabled={disabled || isRolling}
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>
    </div>
  );
};

export default Dice;

