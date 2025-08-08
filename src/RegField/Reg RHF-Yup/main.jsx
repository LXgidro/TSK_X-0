import styles from '../reg.module.css';
import { useAuthForm } from './valid';
import { useEffect, useRef } from 'react';

const RegForm_RHF = () => {
  const { handleSubmit, register, reset, formState, watch } = useAuthForm();
  const { errors, isSubmitting, isValid } = formState;
  const submitButtonRef = useRef(null);

  const [email, password, confirmPassword] = watch([
    'email',
    'password',
    'confirmPassword',
  ]);

  useEffect(() => {
    if (isValid && submitButtonRef.current) {
      submitButtonRef.current.focus();
    }
  }, [email, password, confirmPassword, isValid]);

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className={styles.reg}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <input
            {...register('email')}
            type="email"
            placeholder="Почта"
            className={`${styles.input} ${errors.email ? styles.error : ''}`}
          />
          {errors.email && (
            <div className={styles.errorMessage}>{errors.email.message}</div>
          )}
        </div>
        <div className={styles.field}>
          <input
            {...register('password')}
            type="password"
            placeholder="Пароль"
            className={`${styles.input} ${errors.password ? styles.error : ''}`}
          />
          {errors.password && (
            <div className={styles.errorMessage}>{errors.password.message}</div>
          )}
        </div>
        <div className={styles.field}>
          <input
            {...register('confirmPassword')}
            type="password"
            placeholder="Повторите пароль"
            className={`${styles.input} ${
              errors.confirmPassword ? styles.error : ''
            }`}
          />
          {errors.confirmPassword && (
            <div className={styles.errorMessage}>
              {errors.confirmPassword.message}
            </div>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={() => reset()}
            className={styles.button}
          >
            Очистить
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
            ref={submitButtonRef}
          >
            {isSubmitting ? 'Отправка...' : 'Зарегистрироваться'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegForm_RHF;
