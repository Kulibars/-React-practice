import { setUserRole } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";

export const updateUserRole = async (userSession, userId, newUserRoleId) => {
  const accessRoles = [ROLE.ADMINISTRATOR];

  if (!sessions.access(userSession, accessRoles)) {
    return {
      error: "Доступ запрещен",
      res: null,
    };
  }

  setUserRole(userId, newUserRoleId);

  return {
    error: null,
    res: true,
  };
};
