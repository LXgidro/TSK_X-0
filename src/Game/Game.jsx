import { useState } from 'react';
import PropTypes from 'prop-types';
import Information from './Information/';
import Field from './Field/';
import styles from './Game.module.css';

const GameLayout = ({ children }) => {
  return <div className={styles.game}>{children}</div>;
};

GameLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

const Game = () => {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [field, setField] = useState(Array(9).fill(''));

  const WIN_PATTERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleCellClick = (index) => {
    if (isGameEnded || field[index] !== '') return;

    const newField = [...field];
    newField[index] = currentPlayer;
    setField(newField);

    checkGameStatus(newField);
  };

  const checkGameStatus = (currentField) => {
    const winner = WIN_PATTERNS.some(
      ([a, b, c]) =>
        currentField[a] &&
        currentField[a] === currentField[b] &&
        currentField[a] === currentField[c]
    );

    if (winner) {
      setIsGameEnded(true);
      return;
    }

    const draw = currentField.every((cell) => cell !== '');
    if (draw) {
      setIsGameEnded(true);
      setIsDraw(true);
      return;
    }

    setCurrentPlayer((prev) => (prev === 'X' ? '0' : 'X'));
  };

  const resetGame = () => {
    setCurrentPlayer('X');
    setIsGameEnded(false);
    setIsDraw(false);
    setField(Array(9).fill(''));
  };

  return (
    <GameLayout>
      <Information
        currentPlayer={currentPlayer}
        isGameEnded={isGameEnded}
        isDraw={isDraw}
      />
      <Field
        field={field}
        onCellClick={handleCellClick}
        disabled={isGameEnded}
      />

      <button onClick={resetGame} className={styles.resetbtn}>
        Начать заново
      </button>
    </GameLayout>
  );
};

export default Game;
