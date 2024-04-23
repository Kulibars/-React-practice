import { getUser } from "./get-user";
import { addUser } from "./add-user";
import { sessions } from "./sessions";

export const server = {
  async logout(session) {
    sessions.remove(session);
  },

  async authorize(authLogin, authPassword) {
    const user = await getUser(authLogin);

    if (!user) {
      return {
        error: "Такой пользователь не найден",
        res: null,
      };
    }

    if (authPassword !== user.password) {
      return {
        error: "Пароль не совпадает",
        res: null,
      };
    }

    return {
      error: null,
      res: {
        id: user.id,
        login: user.login,
        roleId: user.role_id,
        session: sessions.create(),
      },
    };
  },

  async register(regLogin, regPassword) {
    const existedUser = await getUser(regLogin);

    if (existedUser) {
      return {
        error: "Пользователь с таким логином уже существует",
        res: null,
      };
    }

    const user = await addUser(regLogin, regPassword);

    return {
      error: null,
      res: {
        id: user.id,
        login: user.login,
        roleId: user.role_id,
        session: sessions.create(),
      },
    };
  },
};
