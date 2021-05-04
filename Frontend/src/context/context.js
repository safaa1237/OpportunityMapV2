import { createContext } from "react";

export const UserContext = createContext({
  userName: "",
  updateUserName: () => {},
  accesToken: null,
  updateAccesToken: () => {},
});
