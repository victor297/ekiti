export default function Loader({ label = "Loading..." }) {
  return (
    <div className="loader">
      <span className="loader-dot" />
      <span className="loader-dot" />
      <span className="loader-dot" />
      <span className="loader-text">{label}</span>
    </div>
  );
}
