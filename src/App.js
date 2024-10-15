import "./App.css";
import Login from "./Pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import PersonalInfo from "./Pages/CreateResume/PersonalInfo";
import Education from "./Pages/CreateResume/Education";
import ProfessionalExperience from "./Pages/CreateResume/ProfessionalExperience";
import Skills from "./Pages/CreateResume/Skills";
import ProfessionalSummary from "./Pages/CreateResume/ProfessionalSummary";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/personalInfo" element={<PersonalInfo />} />
        <Route path="/education" element={<Education />} />
        <Route path="/professionalExperience" element={<ProfessionalExperience />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/professionalSummary" element={<ProfessionalSummary />} />
      </Routes>
    </div>
  );
}

export default App;
