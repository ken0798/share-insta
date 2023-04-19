import HeroLogo from "../../assets/images/loginHero.svg";
import logoIcon from "../../assets/images/logoIcon.svg";
import { loginUser, TOKEN } from "../../services";
import { useContext, useState, useEffect } from "react";
import { UserCredContext } from "../../context";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";
import Loader from "../../components/Loader";

export default function App() {
  const nav = useNavigate();
  const [logState, setLogState] = useState({
    user: "",
    password: "",
    error: ""
  });
  const { setLoader, loader } = useContext(UserCredContext);
  useEffect(() => {
    if (Boolean(logState.password) || Boolean(logState.user)) {
      setLogState((pre) => ({
        ...pre,
        error: ""
      }));
    }
  }, [logState.user, logState.password]);
  async function onSubmission(e) {
    const { user, password } = logState;
    e.preventDefault();
    setLoader(true);
    try {
      const data = await loginUser({
        username: user,
        password
      });

      const { error_msg, jwt_token } = data;
      if (jwt_token) {
        Cookies.set(TOKEN, jwt_token);
        nav("/");
      } else
        setLogState((pre) => ({
          ...pre,
          error: error_msg
        }));
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  }
  function handleLog(e) {
    setLogState((pre) => ({
      ...pre,
      [e.target.name]: e.target.value
    }));
  }
  const showError = Boolean(logState.error);

  return (
    <div className="login_container root_container">
      <img src={HeroLogo} alt="hero-pic" />
      <form testid="form" onSubmit={onSubmission} className="login_from">
        <div>
          <img src={logoIcon} alt="logo" />
          <p>Insta Share</p>
        </div>
        <InputBox onChange={handleLog} name="user" label="Username" />
        <InputBox onChange={handleLog} name="password" type label="Password" />
        {showError ? <p>{logState.error}</p> : null}
        <button testid="login" type="submit">
          Login
        </button>
        {loader && <Loader />}
      </form>
    </div>
  );
}

function InputBox({ type, label, name, onChange }) {
  return (
    <>
      <label>{label}</label>
      <input
        onChange={onChange}
        name={name}
        type={type ? "password" : "text"}
        placeholder={type ? "rahul@2021" : "rahul"}
      />
    </>
  );
}
