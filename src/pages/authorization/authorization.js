import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { server } from "../../bff";
import { useState, useEffect } from "react";
import { Input, H2, Button } from "../../components";
import { useDispatch, useSelector, useStore } from "react-redux";
import { setUserAction } from "../../actions";
import { selectUserRole } from "../../selectors";
import styled from "styled-components";
import { ROLE } from "../../constants";

const authFormSchema = yup.object().shape({
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
    .min(10, "В пароле должно быть минимум 10 символов")
    .max(30, "в пароле должно быть не больше 30 символов"),
});

const StyledLink = styled(Link)`
  font-size: 20px;
  margin: 20px 0;
  text-decoration: underline;
  text-align: center;
`;

const ErrorMessage = styled.div`
  background-color: #fcadad;
  font-size: 20px;
  text-align: center;
  padding: 8px;
  margin: 10px 0;
`;

const AuthorizationContainer = ({ className }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(authFormSchema),
  });

  const [serverError, setServerError] = useState(null);

  const dispatch = useDispatch();
  const store = useStore();

  const roleId = useSelector(selectUserRole);

  useEffect(() => {
    let currentWasLogout = store.getState().app.wasLogout;

    return store.subscribe(() => {
      let previousWasLogout = currentWasLogout;
      currentWasLogout = store.getState().app.wasLogout;
      if (currentWasLogout !== previousWasLogout) {
        reset();
      }
    });
  }, [reset, store]);

  const onSubmit = ({ login, password }) => {
    server.authorize(login, password).then(({ error, res }) => {
      if (error) {
        setServerError(`ошибка запроса: ${error}`);
        return;
      }

      dispatch(setUserAction(res));
    });
  };

  const formError = errors?.login?.message || errors?.password?.message;
  const errorMessage = formError || serverError;

  if (roleId !== ROLE.GUEST) {
    return <Navigate to="/" />;
  }

  return (
    <div className={className}>
      <H2>Авторизация</H2>
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
        <Button disabled={!!formError} type="submit">
          Авторизация
        </Button>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <StyledLink to="/register">Регистрация</StyledLink>
      </form>
    </div>
  );
};

export const Authorization = styled(AuthorizationContainer)`
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
