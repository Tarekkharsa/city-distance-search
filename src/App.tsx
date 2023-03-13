import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="background"></div>
      <Outlet />
    </div>
  );
}

export default App;
