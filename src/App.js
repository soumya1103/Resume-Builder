
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import PersonalInfo from "./Pages/CreateResume/PersonalInfo";
import Education from "./Pages/CreateResume/Education";
import ProfessionalExperience from "./Pages/CreateResume/ProfessionalExperience";
import Skills from "./Pages/CreateResume/Skills";
import ProfessionalSummary from "./Pages/CreateResume/ProfessionalSummary";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/personalInfo" element={<PersonalInfo />} />
          <Route path="/education" element={<Education />} />
          <Route path="/professionalExperience" element={<ProfessionalExperience />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/professionalSummary" element={<ProfessionalSummary />} />
                    <Route path="/register" element={<Register/>}/>
                    <Route path= "/dashboard" element= {<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
