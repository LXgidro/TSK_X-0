import PropTypes from 'prop-types';
import styles from './Information.module.css';

const InformationLayout = ({ currentPlayer, isGameEnded, isDraw }) => {
  const getStatus = () => {
    if (isDraw) {
      return <span className={styles.draw}>Ничья</span>;
    }
    if (isGameEnded) {
      return (
        <span className={currentPlayer === 'X' ? styles.xWin : styles.oWin}>
          Победа: {currentPlayer}
        </span>
      );
    }
    return (
      <span className={currentPlayer === 'X' ? styles.xTurn : styles.oTurn}>
        Ходит: {currentPlayer}
      </span>
    );
  };

  return <div className={styles.status}>{getStatus()}</div>;
};

InformationLayout.propTypes = {
  currentPlayer: PropTypes.oneOf(['X', '0']).isRequired,
  isGameEnded: PropTypes.bool.isRequired,
  isDraw: PropTypes.bool.isRequired,
};

const Information = ({ currentPlayer, isGameEnded, isDraw }) => {
  return (
    <InformationLayout
      currentPlayer={currentPlayer}
      isGameEnded={isGameEnded}
      isDraw={isDraw}
    />
  );
};

Information.propTypes = {
  currentPlayer: PropTypes.oneOf(['X', '0']).isRequired,
  isGameEnded: PropTypes.bool.isRequired,
  isDraw: PropTypes.bool.isRequired,
};

export default Information;
