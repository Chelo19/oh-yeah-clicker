import { useGame } from './hooks/useGame.jsx';

const GameContent = () => {
  const { dispatch } = useGame();

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress?')) {
      dispatch({ type: 'RESET_GAME' });
    }
  };

  return (
    <div className='container'>
      <div className='content'>
        <div className='header'>
          <button className='buyButton'>
            Click Me!
          </button>
          <button className='resetButton' onClick={handleReset}>
            Reset Game
          </button>
        </div>
        <div className='divider' />
      </div>
    </div>
  );
};

function App() {
  return (
    <GameContext.Provider value={initialState}>
      <GameContent />
    </GameContext.Provider>
  );
}

export default App;
