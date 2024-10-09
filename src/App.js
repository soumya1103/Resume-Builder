import "./App.css";
import PersonalInfo from "./Pages/CreateResume/PersonalInfo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Education from "./Pages/CreateResume/Education";
import ProfessionalExperience from "./Pages/CreateResume/ProfessionalExperience";
import Skills from "./Pages/CreateResume/Skills";
import AwardCertification from "./Pages/CreateResume/AwardCertification";
import ProfessionalSummary from "./Pages/CreateResume/ProfessionalSummary";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/personalInfo" element={<PersonalInfo />} />
                </Routes>
                <Routes>
                    <Route path="/education" element={<Education />} />
                </Routes>
                <Routes>
                    <Route
                        path="/professionalExperience"
                        element={<ProfessionalExperience />}
                    />
                </Routes>
                <Routes>
                    <Route path="/skills" element={<Skills />} />
                </Routes>
                <Routes>
                    <Route
                        path="/awardCerts"
                        element={<AwardCertification />}
                    />
                </Routes>
                <Routes>
                    <Route
                        path="/professionalSummary"
                        element={<ProfessionalSummary />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
