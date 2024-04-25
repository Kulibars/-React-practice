import { sessions } from "../sessions";

export const logout = (userSession) => {
  sessions.remove(userSession);
};
