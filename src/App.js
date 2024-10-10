
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register/>}/>
                    <Route path= "/dashboard" element= {<Dashboard/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );

}

export default App;
