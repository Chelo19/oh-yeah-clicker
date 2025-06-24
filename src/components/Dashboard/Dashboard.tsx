import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import './Dashboard.css';
import Slider from "rc-slider";

export const Dashboard = () => {
    const state = useContext(GameContext);

    return (
        <div className="dashboard">
            <h1>Beers: {state.beers}</h1>
        </div>
    );
}