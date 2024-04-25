import { deleteUser } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";

export const removeUser = async (userSession, userId) => {
  const accessRoles = [ROLE.ADMINISTRATOR];

  if (!sessions.access(userSession, accessRoles)) {
    return {
      error: "Доступ запрещен",
      res: null,
    };
  }

  deleteUser(userId);

  return {
    error: null,
    res: true,
  };
};
