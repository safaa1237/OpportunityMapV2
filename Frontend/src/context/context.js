import { createContext } from "react";

export const UserContext = createContext({
  userName: "",
  updateUserName: () => {},
  accessToken: null,
  updateAccessToken: () => {},
});
