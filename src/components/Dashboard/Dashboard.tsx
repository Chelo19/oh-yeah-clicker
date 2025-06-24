import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import './Dashboard.css';

export const Dashboard = () => {
    const state = useContext(GameContext);

    return (
        <div className="dashboard">
            <h1>Beers: {state.beers}</h1>
        </div>
    );
}