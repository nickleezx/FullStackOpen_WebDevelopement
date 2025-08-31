import patients from "../data/patients";
import { Patient, PatientWithoutSsn } from "../types";

const getPatients = (): Patient[] => {
    return patients;
};

const getPatientsWithoutSsn = (): PatientWithoutSsn[]=> {
    console.log("here")
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getPatients,
    getPatientsWithoutSsn
};