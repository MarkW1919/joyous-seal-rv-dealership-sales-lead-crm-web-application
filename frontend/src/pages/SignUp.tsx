import SignUpComponent from "../components/SignUpComponent";
import "./App.css";

function SignUp() {
  return (
    <div
      className="App"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridTemplateRows: "repeat(12, 1fr)",
        gap: "10px",
        gridAutoRows: "minmax(100px, auto)",
      }}
    >
      <div
        style={{
          gridColumnStart: 4,
          gridColumnEnd: 10,
          gridRowStart: 4,
          gridRowEnd: 8,
        }}
      >
        <SignUpComponent />
      </div>
    </div>
  );
}

export default SignUp;
