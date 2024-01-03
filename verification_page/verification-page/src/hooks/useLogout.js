import { useAuthContext } from "./useAuthContext";


export const useLogout =  () => {

  const { dispatch } = useAuthContext()

  const logout = async () => {

    dispatch({type: "LOGOUT"})
    window.location.href = `${process.env.REACT_APP_SERVER_ADD}/auth/logout`;

  }

  return { logout }
}
 
