import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import diagnosisService from "./services/diagnosis";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage/PatientPage";

const App = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [diagnoses, setDiagnoses] = useState<Array<Diagnosis>>([]);

    useEffect(() => {
        void axios.get<void>(`${apiBaseUrl}/ping`);

        const fetchPatientList = async () => {
            const patients = await patientService.getAll();
            setPatients(patients);
        };

        const fetchDiagnosisList = async () => {
            const diagnoses = await diagnosisService.getDiagnoses();
            setDiagnoses(diagnoses);
        };

        void fetchPatientList();
        void fetchDiagnosisList();
    }, []);

    const match = useMatch("/patients/:id");
    const patient = match
        ? patients.find(p => p.id === match.params.id)
        : null;

    return (
        <div className="App">
            <Container>
                <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
                    Patientor
                </Typography>
                <Button component={Link} to="/" variant="contained" color="primary">
                    Home
                </Button>
                <Divider hidden />
                <Routes>
                    <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
                    <Route path="/patients/:id" element={<PatientPage name={patient?.name}
                        gender={patient?.gender}
                        ssn={patient?.ssn}
                        occupation={patient?.occupation}
                        entries={patient?.entries}
                        diagnoses={diagnoses}
                        setPatient={setPatients}
                        />}
                        />
                </Routes>
            </Container>
        </div>
    );
};

export default App;
