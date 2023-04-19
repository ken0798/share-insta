import { createContext, useState } from "react";

export const UserCredContext = createContext({
  loader: false,
  menu: false,
  errorCode: null,
  setErrorCode: (code) => {},
  setMenu: () => {},
  setLoader: (value) => {}
});

function UserProvider({ children }) {
  const [loader, setLoader] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [errorCode, setErrorCode] = useState(null);

  function renderLoader(value) {
    setLoader(value);
  }
  function handleMenu() {
    setShowMenu((pre) => !pre);
  }
  function handleErrorCode(value) {
    setErrorCode(value);
  }
  const state = {
    loader,
    errorCode,
    menu: showMenu,
    setLoader: renderLoader,
    setMenu: handleMenu,
    setErrorCode: handleErrorCode
  };
  return (
    <UserCredContext.Provider value={state}>
      {children}
    </UserCredContext.Provider>
  );
}

export default UserProvider;
