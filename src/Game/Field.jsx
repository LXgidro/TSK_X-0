import PropTypes from 'prop-types';
import styles from './Field.module.css';

const FieldLayout = ({ field, onCellClick, disabled }) => {
  return (
    <div className={styles.board}>
      {field.map((cell, index) => (
        <button
          key={index}
          className={styles.cell}
          data-value={cell}
          onClick={() => onCellClick(index)}
          disabled={disabled || cell !== ''}
        >
          {cell}
        </button>
      ))}
    </div>
  );
};

FieldLayout.propTypes = {
  field: PropTypes.arrayOf(PropTypes.oneOf(['X', '0', ''])).isRequired,
  onCellClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const Field = ({ field, onCellClick, disabled }) => {
  return (
    <FieldLayout field={field} onCellClick={onCellClick} disabled={disabled} />
  );
};

export default Field;
