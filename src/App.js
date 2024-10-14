import "./App.css";
import ViewResume from "./Pages/ViewResume/ViewResume";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import PersonalInfo from "./Pages/CreateResume/PersonalInfo";
import Education from "./Pages/CreateResume/Education";
import ProfessionalExperience from "./Pages/CreateResume/ProfessionalExperience";
import Skills from "./Pages/CreateResume/Skills";
import ProfessionalSummary from "./Pages/CreateResume/ProfessionalSummary";

function App() {
  const userId = 3; 
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/personalInfo" element={<PersonalInfo />} />
        <Route path="/education" element={<Education />} />
        <Route path="/professionalExperience" element={<ProfessionalExperience />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/professionalSummary" element={<ProfessionalSummary />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path= "/viewResume" element={<ViewResume userId={userId}/>}/>
      </Routes>
    </div>
  );
}


export default App;