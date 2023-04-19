import logo from "../../assets/images/logoIcon.svg";
import { IoIosCloseCircle, IoIosMenu } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import "./index.css";
import { useContext } from "react";
import { UserCredContext } from "../../context";
import Cookies from "js-cookie";
import { TOKEN } from "../../services";

function Header() {
  const { menu: viewMenu, setMenu } = useContext(UserCredContext);
  const nav = useNavigate();

  function onLogOut() {
    Cookies.remove(TOKEN);
    nav("/login");
  }

  return (
    <>
      <header className="header_container">
        <div>
          <div className="desk_menu">
            <img src={logo} alt="/logo" />
            <h1>Insta Share</h1>
            <button testid="menu" onClick={setMenu} type="button">
              <IoIosMenu size={20} />
            </button>
            <div className="user_actions">
              <NavLink
                className={({ isActive }) =>
                  `link ${isActive && "active_link"}`
                }
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `link ${isActive && "active_link"}`
                }
                to="/search"
              >
                Search
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `link ${isActive && "active_link"}`
                }
                to="/profile"
              >
                Profile
              </NavLink>
              <button
                onClick={onLogOut}
                testid="logout"
                className="header_logout"
              >
                Logout
              </button>
            </div>
          </div>
          {/* Mobile Menu */}
          {viewMenu && (
            <div className="mobile_menu">
              <NavLink
                className={({ isActive }) =>
                  `link ${isActive && "active_link"}`
                }
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `link ${isActive && "active_link"}`
                }
                to="/search"
              >
                Search
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `link ${isActive && "active_link"}`
                }
                to="/profile"
              >
                Profile
              </NavLink>
              <button
                onClick={onLogOut}
                testid="logout"
                className="header_logout"
              >
                Logout
              </button>
              <button
                className="close"
                testid="close"
                onClick={setMenu}
                type="button"
              >
                <IoIosCloseCircle size={24} />
              </button>
            </div>
          )}{" "}
        </div>
      </header>
      {/* {viewSearchResults ? (
        <Search viewSearch={setViewSearchResults} searchText={searchText} />
      ) : null} */}
    </>
  );
}
export default Header;
