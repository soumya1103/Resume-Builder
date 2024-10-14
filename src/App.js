import "./App.css";
import ViewResume from "./Pages/ViewResume/ViewResume";
import Login from "./Pages/Login/Login";
import { Routes, Route } from "react-router-dom";

function App() {
  const userId = 3; 
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path= "/viewResume" element={<ViewResume userId={userId}/>}/>
      </Routes>
    </div>
  );
}


export default App;
