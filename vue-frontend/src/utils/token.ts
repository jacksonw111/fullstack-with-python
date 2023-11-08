export const USER_INFO = 'USER_INFO'
export const fetachUserInfo = () => localStorage.getItem(USER_INFO)
export const removeUserInfo = () => localStorage.removeItem(USER_INFO)
export const storeUserInfo = (user: any) => localStorage.setItem(USER_INFO, JSON.stringify(user))
