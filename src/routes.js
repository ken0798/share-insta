import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import NotFound from "./components/NotFound";
import Home from "./modules/Home";
import App from "./modules/Login";
import MyProfile from "./modules/Profile";
import Search from "./modules/Search";
import UserProfile from "./modules/UserProfile";

function RouterLayer() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={App} />
        <Route Component={AuthRoute}>
          <Route path="/" Component={Home} />
          <Route path="/profile" Component={MyProfile} />
          <Route path="/search" Component={Search} />
          <Route path="/users/:id" Component={UserProfile} />
          <Route path="*" Component={NotFound} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouterLayer;
