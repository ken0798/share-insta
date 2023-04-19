import logo from "/src/assets/images/logoIcon.svg";
import close from "/src/assets/images/close.svg";

import { FaSearch } from "react-icons/fa";
import { IoIosCloseCircle, IoIosMenu } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import "./index.css";
import { useContext, useState } from "react";
import { UserCredContext } from "../../context";
import Search from "../../modules/Search";
import Cookies from "js-cookie";
import { TOKEN } from "../../services";

function Header() {
  const { menu: viewMenu, setMenu } = useContext(UserCredContext);
  const [searchText, setSearchText] = useState("");
  const [viewSearchResults, setViewSearchResults] = useState(false);
  const [mobileSearch, setMobileSearch] = useState("");
  const nav = useNavigate();

  function onSearchText(e) {
    setSearchText(e.target.value);
  }

  function handleSearchEvent() {
    setViewSearchResults(true);
  }

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
              <div>
                <input
                  value={searchText}
                  onChange={onSearchText}
                  placeholder="Search Caption"
                />
                <button
                  disabled={!Boolean(searchText)}
                  onClick={handleSearchEvent}
                  type="button"
                  testid="searchIcon"
                >
                  <FaSearch size={24} color="#989898" />
                </button>
              </div>
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
                onClick={() => setMobileSearch("")}
                className={({ isActive }) =>
                  `link ${
                    isActive && mobileSearch !== "search" && "active_link"
                  }`
                }
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                onClick={() => setMobileSearch("search")}
                className={({ isActive }) =>
                  `link ${mobileSearch === "search" && "active_link"}`
                }
              >
                Search
              </NavLink>
              <NavLink
                onClick={() => setMobileSearch("")}
                className={({ isActive }) =>
                  `link ${
                    isActive && mobileSearch !== "search" && "active_link"
                  }`
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
      {mobileSearch === "search" && (
        <div className="mobile_menu mobile_search">
          <div>
            <div>
              <input
                value={searchText}
                onChange={onSearchText}
                placeholder="Search Caption"
              />
              {searchText && (
                <img
                  style={{ cursor: "pointer" }}
                  onClick={() => setSearchText("")}
                  src={close}
                  alt="/"
                />
              )}
            </div>
            <button
              disabled={!Boolean(searchText)}
              onClick={handleSearchEvent}
              type="button"
              testid="searchIcon"
            >
              <FaSearch size={24} color="#989898" />
            </button>
          </div>
        </div>
      )}

      {viewSearchResults ? (
        <Search viewSearch={setViewSearchResults} searchText={searchText} />
      ) : null}
    </>
  );
}
export default Header;
