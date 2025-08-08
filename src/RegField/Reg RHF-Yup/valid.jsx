import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const useAuthForm = () => {
  const schema = yup.object({
    email: yup
      .string()
      .required('Email обязателен')
      .email('Введите корректный email'),
    password: yup
      .string()
      .required('Пароль обязателен')
      .matches(/^\w*$/, 'Только буквы, цифры и нижнее подчеркивание')
      .min(3, 'Минимум 3 символа')
      .max(20, 'Максимум 20 символов'),
    confirmPassword: yup
      .string()
      .required('Подтвердите пароль')
      .oneOf([yup.ref('password')], 'Пароли не совпадают'),
  });

  const { register, handleSubmit, formState, watch, reset } = useForm({
    resolver: yupResolver(schema),
  });
  return { register, handleSubmit, reset, formState, watch };
};
