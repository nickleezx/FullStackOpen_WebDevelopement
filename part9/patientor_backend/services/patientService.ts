import { v1 as uuid } from "uuid";
import patients from "../data/patient-full";
import { Patient, NonSensitivePatient, NewPatient, NewEntry, Entry } from "../types";

const getPatients = (): Patient[] => {
    return patients;
};

const getPatientsWithoutSsn = (): NonSensitivePatient[] => {
    console.log("here");
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const getPatientById = (patiendId: string): Patient | undefined => {
    const patient =  patients.find(p => p.id === patiendId)
    if (!patient) {
        return undefined
    }
    
    return {
        ...patient,
        entries: patient?.entries ?? []
    }
}

const addPatient = (patient: NewPatient): NonSensitivePatient => {
    const newPatient = {
        id: uuid(),
        entries: [],
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

const addEntryToPatient = (id: string, entry: NewEntry): Entry | undefined => {
    const patient = patients.find(p => p.id === id)
    if (!patient) {
        return undefined
    }
    const entryId = uuid()
    patient.entries.push({...entry, id: entryId});
    return {...entry, id: entryId}
}

export default {
    getPatients,
    getPatientsWithoutSsn,
    addPatient,
    getPatientById,
    addEntryToPatient,
};
