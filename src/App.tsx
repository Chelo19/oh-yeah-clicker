import { Dashboard } from './components/Dashboard/Dashboard.js';
import { MainLayout } from './components/MainLayout/MainLayout.tsx';
import { FactoryList } from './components/Factories/FactoryList.tsx';
import { GameContext } from './context/GameContext.js';
import { useGame } from './hooks/useGame.ts';
import './App.css';
import { ClickButton } from './components/ClickButton/ClickButton.tsx';
import { BuyButtons } from './components/BuyButtons/BuyButtons.jsx';

function App() {
  const { state, handleClick, handleBuyFactory, getFactoryData, resetGame } = useGame();

  return (
    <GameContext.Provider value={state}>
      <MainLayout>
        <div className="game-container">
          <ClickButton handleClick={handleClick} />
          <Dashboard />
          <BuyButtons handleBuyFactory={handleBuyFactory} getFactoryData={getFactoryData} />
        </div>
        <FactoryList />

        <br/>
        <br/>
        <br/>
        <br/>

        <button style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', backgroundColor: 'red', color: '#ffffff', cursor: 'pointer' }} onClick={() => resetGame()}>
          Reset Game
        </button>
        
      </MainLayout>
    </GameContext.Provider>
  );
}

export default App;
