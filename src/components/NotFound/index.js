import notFound from "/src/assets/images/notFound.svg";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function NotFound() {
  const nav = useNavigate();
  return (
    <div className="not_found">
      <img src={notFound} alt="/" />
      <h1>Page Not Found</h1>
      <p>
        we are sorry, the page you requested could not be found.
        <br />
        Please go back to the homepage.
      </p>
      <button type="button" onClick={() => nav("/")}>
        Home Page
      </button>
    </div>
  );
}
