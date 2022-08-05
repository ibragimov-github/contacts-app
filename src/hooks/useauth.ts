import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export function useAuth() {
  const { token } = useSelector((state: RootState) => state.user)

  return {
    isAuth: !!token
  }
}