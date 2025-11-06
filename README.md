# 🐍 Snake & Ladder Game

A visually stunning and interactive Snake and Ladder game built with React. This classic board game features beautiful animations, smooth player movements, and an engaging user experience.

## ✨ Features

- **Beautiful UI**: Modern gradient design with smooth animations
- **Interactive Gameplay**: Click to roll dice and move players
- **Visual Indicators**: 
  - Snakes (red) and Ladders (green) clearly marked on the board
  - Animated paths showing snake and ladder connections
  - Player pieces with color-coded indicators
- **Smooth Animations**: 
  - Dice rolling animation
  - Player movement with transitions
  - Visual feedback for all game actions
- **Game Status**: Real-time updates on current player and game progress
- **Win Detection**: Automatic winner announcement when a player reaches position 100

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Game

Start the development server:

```bash
npm start
```

The game will open in your browser at `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

## 🎮 How to Play

1. **Start the Game**: The game begins with Player 1's turn
2. **Roll the Dice**: Click the "Roll Dice" button or click on the dice itself
3. **Move Your Player**: The player automatically moves based on the dice value
4. **Snakes & Ladders**: 
   - Landing on a ladder (green) moves you up
   - Landing on a snake (red) moves you down
5. **Win**: First player to reach position 100 wins!

## 🎯 Game Rules

- Players take turns rolling the dice
- Move forward by the number shown on the dice
- If you land exactly on 100, you win
- If your move would exceed 100, you bounce back
- Snakes and ladders are automatically applied when landing on them

## 🎨 Features Highlights

- **10x10 Game Board**: Traditional 100-square board layout
- **Multiple Players**: Support for 2 players (easily expandable)
- **Animated Dice**: 3D rolling animation with visual feedback
- **Player Tracking**: See each player's current position
- **Reset Function**: Start a new game anytime
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🛠️ Technologies Used

- React 18
- CSS3 (Animations & Gradients)
- SVG (for snakes and ladders visualization)
- Modern JavaScript (ES6+)

## 📝 Project Structure

```
Project1/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── GameBoard.js
│   │   ├── GameBoard.css
│   │   ├── Dice.js
│   │   ├── Dice.css
│   │   ├── Player.js
│   │   └── Player.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🎨 Customization

You can easily customize:
- Number of players
- Player colors
- Snake and ladder positions (in `App.js`)
- Board styling (in `GameBoard.css`)
- Dice appearance (in `Dice.css`)

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🎉 Enjoy Playing!

Have fun playing this classic game with a modern twist!

