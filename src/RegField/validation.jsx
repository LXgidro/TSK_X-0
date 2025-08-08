export const validateEmail = (email) => {
  if (!email) return 'Email обязателен';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Введите корректный email';
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Пароль обязателен';
  if (!/^[\w]*$/.test(password)) {
    return 'Только: буквы, цифры и нижнее подчёркивание';
  }
  if (password.length < 3) {
    return 'Должно быть не меньше 3 символов';
  }
  if (password.length > 20) {
    return 'Должно быть не больше 20 символов';
  }
  return null;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Подтверждение пароля обязательно';
  if (password !== confirmPassword) {
    return 'Пароли не совпадают';
  }
  return null;
};
