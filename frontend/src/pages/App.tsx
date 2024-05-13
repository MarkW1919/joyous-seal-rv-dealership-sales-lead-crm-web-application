import Placeholder from "@/components/Placeholder";
import Header from "../components/Header";
import "./App.css";

function App() {
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
          gridColumnStart: 1,
          gridColumnEnd: 13,
          gridRowStart: 1,
          gridRowEnd: 2,
        }}
      >
        <Header />
      </div>
      <div
        style={{
          gridColumnStart: 1,
          gridColumnEnd: 13,
          gridRowStart: 2,
          gridRowEnd: 13,
        }}
      >
        <Placeholder />
      </div>
    </div>
  );
}

export default App;
