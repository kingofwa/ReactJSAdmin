const USER_INFO_KEY = "_user_info";
const USER_ROLE = "_user_role";
const USER_IS_REGISTER = "user_is_register";

export const ROLE = {
  guest: "guest",
  player: "player",
  creator: "creator"
};

export const storeUserInfo = user => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
};

export const retrieveUserInfo = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem(USER_INFO_KEY);
    return user ? JSON.parse(user) : {};
  }
  return null;
};

export const storeRole = role => {
  localStorage.setItem(USER_ROLE, JSON.stringify(role));
};

export const getRole = () => {
  if (typeof window !== "undefined") {
    const role = localStorage.getItem(USER_ROLE);
    return role ? JSON.parse(role) : ROLE.guest;
  }
  return null;
};

export const clearUserInfo = () => {
  localStorage.removeItem(USER_INFO_KEY);
};

export const setUserIsRegister = isRegister => {
  localStorage.setItem(USER_IS_REGISTER, isRegister);
};

export const clearIsRegister = () => {
  localStorage.removeItem(USER_IS_REGISTER);
};

export const getIsRegister = () => {
  if (typeof window !== "undefined") {
    const isRegister = localStorage.getItem(USER_IS_REGISTER);
    return isRegister || true;
  }
  return null;
};
