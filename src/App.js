import "./App.css";
import ViewResume from "./Pages/ViewResume/ViewResume";
import ResumesList from "./Components/ResumeList/ResumeList";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { Routes, Route } from "react-router-dom";
import Profile from "./Pages/Profile/Profile";
import "./App.css";
import PersonalInfo from "./Pages/CreateResume/PersonalInfo";
import Education from "./Pages/CreateResume/Education";
import ProfessionalExperience from "./Pages/CreateResume/ProfessionalExperience";
import Skills from "./Pages/CreateResume/Skills";
import ProfessionalSummary from "./Pages/CreateResume/ProfessionalSummary";
import DashboardHr from "./Pages/Dashboard/DashboardHr";
import "react-toastify/dist/ReactToastify.css";
import EmployeeResumeList from "./Components/ResumeList/EmployeeResumeList";
import CandidateResumeList from "./Components/ResumeList/CandidateResumeList";
import ViewResumeCandidate from "./Pages/ViewResume/ViewResumeCandidate";
import EditProfessionalExperience from "./Pages/CreateResume/EditProfessionalExperience";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/personalInfo" element={<PersonalInfo />} />
        <Route path="/education" element={<Education />} />
        <Route path="/professionalExperience" element={<ProfessionalExperience />} />
        <Route path="/edit-professional-experience" element={<EditProfessionalExperience />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/professionalSummary" element={<ProfessionalSummary />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboardHr" element={<DashboardHr />} />
        <Route path="/resumes" element={<ResumesList />} />
        <Route path="/employeeResumeList" element={<EmployeeResumeList />} />
        <Route path="/candidateResumeList" element={<CandidateResumeList />} />
        <Route path="/viewResume/:userId" element={<ViewResume />} />
        <Route path="/viewResumeCandidate/:candidateId" element={<ViewResumeCandidate />} />
      </Routes>
    </div>
  );
}

export default App;
