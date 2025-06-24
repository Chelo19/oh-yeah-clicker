# Oh Yeah Clicker! 🎮

A fun incremental clicker game built with React, TypeScript, and Chakra UI.

## Features

- 🖱️ Click to earn points
- 🏭 Buy factories that automatically generate clicks
- ⚡ Purchase upgrades to boost factory production
- 🌳 Unlock skills in a skill tree to enhance your clicking power
- 💾 Automatic progress saving
- 🔄 Reset game option

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## How to Play

1. **Click the Button**: Click the main button to earn points manually. Your click power determines how many points you get per click.

2. **Buy Factories**: Use your points to purchase factories that automatically generate clicks for you:
   - Auto Cursor: Basic automatic clicker
   - Click Robot: More efficient automatic clicker
   - Each factory's cost increases with each purchase

3. **Purchase Upgrades**: Once you have factories, upgrades become available to boost their production.

4. **Unlock Skills**: Progress through the skill tree to:
   - Increase your manual click power
   - Boost all factory production
   - Skills may have dependencies (must unlock prerequisites first)

5. **Save Progress**: Your progress is automatically saved to localStorage.

6. **Reset Game**: If you want to start fresh, use the reset button (requires confirmation).

## Development

Built with:
- React + TypeScript
- Vite
- Chakra UI
- Framer Motion for animations

## License

MIT
