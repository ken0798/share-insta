import "./index.css";
export default function NetworkError({ onHandle, image }) {
  return (
    <div className="netw_error">
      <img src={image} alt="/" />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={onHandle}>
        Try Again
      </button>
    </div>
  );
}
