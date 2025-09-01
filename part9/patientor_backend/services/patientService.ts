import { v1 as uuid } from "uuid";
import patients from "../data/patients";
import { Patient, PatientWithoutSsn, NewPatient } from "../types";

const getPatients = (): Patient[] => {
    return patients;
};

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
    console.log("here");
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (patient: NewPatient): PatientWithoutSsn => {
    const newPatient = {
        id: uuid(),
        ...patient,
    };

    patients.push(newPatient);
    const { id, name, dateOfBirth, gender, occupation } = newPatient;
    return {
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    };
};

export default {
    getPatients,
    getPatientsWithoutSsn,
    addPatient,
};
