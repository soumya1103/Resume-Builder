import "./App.css";
import Login from "./Pages/Login/Login";
import { Routes, Route } from "react-router-dom";

function App() {
  const userId = 3; 
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}


export default App;
