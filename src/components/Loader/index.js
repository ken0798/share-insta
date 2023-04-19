import { TailSpin } from "react-loader-spinner";
import "./index.css";

function Loader({ style }) {
  return (
    <div style={style} className="loader-container" testid="loader">
      <TailSpin color="#4094EF" height={50} width={50} />
    </div>
  );
}

export default Loader;
