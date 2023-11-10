export const USER_INFO = "USER_INFO";
export const fetachUserInfo = () => {
  let userinfo = localStorage.getItem(USER_INFO);
  if (userinfo) userinfo = JSON.parse(userinfo);
  return userinfo;
};
export const removeUserInfo = () => localStorage.removeItem(USER_INFO);
export const storeUserInfo = (user: any) =>
  localStorage.setItem(USER_INFO, JSON.stringify(user));
