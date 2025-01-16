import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faUpload, faEye, faChartColumn } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../Components/Modal/Modal.jsx";
import Input from "../../Components/Input/Input.jsx";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../Components/Button/Button.jsx";
import "./Dashboard.css";
import Card from "../../Components/Cards/Card";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { getUserByRole, saveCandidateName, saveResumeTitle, uploadResume } from "../../Api/apiService.js";

function DashboardHr() {
  const [titleModal, setTitleModal] = useState(false);
  const [allEmployees, setAllEmployees] = useState([]);
  const [resumeTitle, setResumeTitle] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [role, setRole] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const navigate = useNavigate();

  const handleResumeClick = () => {
    setRole("");
    setTitleModal(true);
  };

  const handleUploadResume = async (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      toast.error("Please select a file to upload.", {
        autoClose: 2000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      const response = await uploadResume(formData);
      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message || "PDF Resume uploaded successfully!", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.", {
        autoClose: 2000,
      });
    }
  };

  const onCloseTitleModal = () => {
    setTitleModal(false);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleTitleSave = async () => {
    if (role === "employee") {
      try {
        const response = await saveResumeTitle(resumeTitle, selectedEmployeeId);
        if (response?.status === 200 || response?.status === 201) {
          toast.success(response?.data?.message || "Resume Title Saved", {
            autoClose: 2000,
          });
          setTimeout(() => {
            navigate("/personalInfo");
          }, 2000);
        }
        window.localStorage.setItem("profileId", response.data.id);
        window.localStorage.setItem("selectedRole", "employee");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.", {
          autoClose: 2000,
        });
      }
    } else if (role === "candidate") {
      try {
        const response = await saveCandidateName(candidateName);
        if (response?.status === 200 || response?.status === 201) {
          toast.success(response?.data?.message || "Candidate Name Saved", {
            autoClose: 2000,
          });
          setTimeout(() => {
            navigate("/personalInfo");
          }, 2000);
        }
        window.localStorage.setItem("profileId", response.data.id);
        window.localStorage.setItem("selectedRole", "candidate");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.", {
          autoClose: 2000,
        });
      }
    }
  };

  const handleEmployee = () => {
    window.localStorage.setItem("selectedRole", "employee");
    navigate("/employeeResumeList");
  };

  const handleCandidate = () => {
    window.localStorage.setItem("selectedRole", "candidate");
    navigate("/candidateResumeList");
  };

  const handleChange = (event) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);

    if (selectedRole === "employee") {
      fetchUserByRole();
    }
  };

  const handleEmployeeSelect = (event) => {
    const selectedId = event.target.value;
    console.log(selectedId);
    setSelectedEmployeeId(selectedId);
    
    window.localStorage.setItem("selectedEmployeeId", selectedId);
  };

  const fetchUserByRole = async () => {
    try {
      const response = await getUserByRole();
      setAllEmployees(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.", {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="dashboard-container-outer">
      <Navbar />
      <div className="dashboard-container">
        <Card icon={<FontAwesomeIcon icon={faFile} />} label="Create Resume" onClick={handleResumeClick} />
        <Card icon={<FontAwesomeIcon icon={faEye} />} label="View Resume" onClick={() => setOpenModal(true)} />
        <Card icon={<FontAwesomeIcon icon={faChartColumn} />} label="ATS" />
        <Card icon={<FontAwesomeIcon icon={faUpload} />} label="Upload Resume" onClick={() => document.getElementById("resume").click()} />
      </div>

      <input id="resume" type="file" accept="application/pdf" style={{ display: "none" }} onChange={handleUploadResume} />

      <Modal
        show={titleModal}
        onClose={onCloseTitleModal}
        height={role === "employee" ? "235px" : role === "candidate" ? "170px" : "105px"}
        width="350px"
      >
        <div className="create-resume-hr">
          <div className="form-content" style={{ marginTop: "1%" }}>
            <label htmlFor="roleDropdown" className="form-field-label">
              Select Role
            </label>
            <br />
            <select
              id="roleDropdown"
              value={role}
              style={{ width: "91%" }}
              onChange={handleChange}
              className="form-field-input profile-input-field-password"
            >
              <option value="">Select role</option>
              <option value="employee">Employee</option>
              <option value="candidate">Candidate</option>
            </select>
          </div>
          <div>
            {role === "employee"? (
              <div style={{ marginTop: "2%" }}>
                <label htmlFor="employeeSelect" className="form-field-label">
                  Select Employee
                </label>
                <br />
                <select
                  id="employeeSelect"
                  value={selectedEmployeeId || ""}
                  onChange={handleEmployeeSelect}
                  style={{ width: "91%" }}
                  className="form-field-input profile-input-field-password"
                >
                  <option value="">Select an employee</option>
                  {allEmployees.map((employee) => (
                    <option key={employee.userId} value={employee.userId}>
                      {employee.name}
                    </option>
                  ))}
                </select>
                <Input
                  className="profile-input-field-password"
                  type="text"
                  label="Enter Resume Title"
                  value={resumeTitle}
                  onChange={(e) => setResumeTitle(e.target.value)}
                />
              </div>
            ) : role === "candidate" ? (
              <>
                <Input
                  className="profile-input-field-password"
                  type="text"
                  label="Enter Candidate Name"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                />
              </>
            ) : null}
          </div>
        </div>

        <Button className="change-btn" onClick={handleTitleSave}>
          Save
        </Button>
      </Modal>

      <Modal show={openModal} onClose={closeModal} height="70px" width="290px">
        <label className="form-field-label" style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
          View resumes for
        </label>
        <div className="view-resume-btn">
          <Button className="view-resume-buttons" onClick={handleEmployee}>
            Employee
          </Button>
          <Button className="view-resume-buttons" onClick={handleCandidate}>
            Candidate
          </Button>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default DashboardHr;
