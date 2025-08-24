import styles from './reg.module.css';
import { useStore } from './useStore';
import { useState, useRef, useEffect } from 'react';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from './validation';

const sendFormData = (formData) => {
  console.log(formData);
};

const RegForm = () => {
  const { getState, updateState, resetState } = useStore();
  const [errors, setErrors] = useState({
    email: null,
    password: null,
    confirmPassword: null,
  });
  const submitButtonRef = useRef(null);
  const { email, password, confirmPassword } = getState();

  const isValid =
    !validateEmail(email) &&
    !validatePassword(password) &&
    !validateConfirmPassword(password, confirmPassword);

  useEffect(() => {
    if (isValid && submitButtonRef.current) {
      submitButtonRef.current.focus();
    }
  }, [isValid]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) return;

    sendFormData(getState());
    resetState();
    setErrors({ email: null, password: null, confirmPassword: null });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateState(name, value);

    if (name === 'email') {
      setErrors({ ...errors, email: validateEmail(value) });
    } else if (name === 'password') {
      setErrors({
        ...errors,
        password: validatePassword(value),
        confirmPassword: validateConfirmPassword(
          value,
          getState().confirmPassword
        ),
      });
    } else if (name === 'confirmPassword') {
      setErrors({
        ...errors,
        confirmPassword: validateConfirmPassword(getState().password, value),
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setErrors({ ...errors, password: validatePassword(value) });
    } else if (name === 'email') {
      setErrors({ ...errors, email: validateEmail(value) });
    }
  };

  const handleReset = () => {
    resetState();
    setErrors({
      email: null,
      password: null,
      confirmPassword: null,
    });
  };

  return (
    <div className={styles.reg}>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Почта"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.input} ${errors.email ? styles.error : ''}`}
          />
          {errors.email && (
            <div id="email-error" className={styles.errorMessage}>
              {errors.email}
            </div>
          )}
        </div>
        <div className={styles.field}>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Пароль"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.input} ${errors.password ? styles.error : ''}`}
          />
          {errors.password && (
            <div id="password-error" className={styles.errorMessage}>
              {errors.password}
            </div>
          )}
        </div>
        <div className={styles.field}>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Подтвердите пароль"
            onChange={handleChange}
            className={`${styles.input} ${
              errors.confirmPassword ? styles.error : ''
            }`}
          />
          {errors.confirmPassword && (
            <div id="confirm-error" className={styles.errorMessage}>
              {errors.confirmPassword}
            </div>
          )}
        </div>
        <div className={styles.buttonGroup}>
          <button type="button" onClick={handleReset} className={styles.button}>
            Очистить
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={!isValid}
            ref={submitButtonRef}
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegForm;
