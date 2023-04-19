import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { TOKEN } from "../../services";
export default function AuthRoute() {
  const token = Cookies.get(TOKEN);
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
