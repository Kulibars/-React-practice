import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { server } from "../../bff";
import { useState } from "react";
import { AuthFormError, Input, H2, Button } from "../../components";
import { useResetForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { setUserAction } from "../../actions";
import { selectUserRole } from "../../selectors";
import styled from "styled-components";
import { ROLE } from "../../constants";

const registerFormSchema = yup.object().shape({
  login: yup
    .string()
    .required(" заполните логин")
    .matches(
      /^\w+$/,
      "Неверно заполнен логин. Допускаются только буквы и цифры"
    )
    .min(3, "В логине должно быть минимум три символа")
    .max(15, "в логине должно быть не больше 15 символов"),
  password: yup
    .string()
    .required(" заполните пароль")
    .matches(
      /^[\w#%]+$/,
      "Неверно заполнен пароль. Допускаются буквы, цифры и знаки #, %"
    )
    .min(3, "В пароле должно быть минимум 10 символов")
    .max(30, "в пароле должно быть не больше 30 символов"),
  passcheck: yup
    .string()
    .required(" заполните повтор пароля")
    .oneOf([yup.ref("password"), null], "Повтор пароля не совподает"),
});

const ReristrationContainer = ({ className }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
      passcheck: "",
    },
    resolver: yupResolver(registerFormSchema),
  });

  const [serverError, setServerError] = useState(null);

  const dispatch = useDispatch();

  const roleId = useSelector(selectUserRole);

  useResetForm(reset);

  const onSubmit = ({ login, password }) => {
    server.register(login, password).then(({ error, res }) => {
      if (error) {
        setServerError(`ошибка запроса: ${error}`);
        return;
      }

      dispatch(setUserAction(res));
    });
  };

  const formError =
    errors?.login?.message ||
    errors?.password?.message ||
    errors?.passcheck?.message;
  const errorMessage = formError || serverError;

  if (roleId !== ROLE.GUEST) {
    return <Navigate to="/" />;
  }

  return (
    <div className={className}>
      <H2>Регистрация</H2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Логин"
          {...register("login", {
            onChange: () => setServerError(null),
          })}
        />
        <Input
          type="password"
          placeholder="Пароль"
          {...register("password", {
            onChange: () => setServerError(null),
          })}
        />
        <Input
          type="password"
          placeholder="повторить пароль"
          {...register("passcheck", {
            onChange: () => setServerError(null),
          })}
        />
        <Button disabled={!!formError} type="submit">
          Зарегистрироваться
        </Button>

        {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
      </form>
    </div>
  );
};

export const Reristration = styled(ReristrationContainer)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  & > form {
    display: flex;
    flex-direction: column;
    width: 260px;
  }
`;
