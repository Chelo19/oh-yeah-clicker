import './ClickButton.css';

interface ClickButtonProps {
    handleClick: () => void;
}

export const ClickButton = ({ handleClick }: ClickButtonProps) => {
    return (
        <button className='click-button' onClick={handleClick}>
            Click Me!
        </button>
    );
};