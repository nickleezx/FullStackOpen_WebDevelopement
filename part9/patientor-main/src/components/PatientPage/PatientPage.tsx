import { Link } from "react-router-dom";
import { Diagnosis, Entry, Patient } from "../../types";
import HospitalEntry from "./Entries/HospitalEntry";
import HealthCheckEntry from "./Entries/HealthCheckEntry";
import OccupationalEntry from "./Entries/OccupuationalEntry";
import AddEntryForm from "./AddEntries/AddEntryForm";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { EntryWithoutId } from "../../types";
import { Alert, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export interface PatientProps {
    name: string | undefined;
    gender: string | undefined;
    ssn: string | undefined;
    occupation: string | undefined;
    entries: Array<Entry> | undefined;
    diagnoses: Array<Diagnosis> | undefined;
    setPatient: React.Dispatch<React.SetStateAction<Array<Patient>>>
}

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry date={entry.date} description={entry.description} specialist={entry.specialist} />;
        case "HealthCheck":
            return <HealthCheckEntry date={entry.date} description={entry.description} specialist={entry.specialist} rating={entry.healthCheckRating} />;
        case "OccupationalHealthcare":
            return <OccupationalEntry date={entry.date} description={entry.description} employerName={entry.employerName} specialist={entry.specialist} />;
        default:
            assertNever(entry);
    }
};

enum FormType {
    None = '',
    HospitalEntry = 'Hospital',
    HealthCheckEntry = 'HealthCheck',
    OccupationalHealthcareEntry = 'OccupationalHealthcare'
}

export default function PatientPage({ name, gender, ssn, occupation, entries, setPatient }: PatientProps) {

    const [error, setError] = useState("");
    const [formType, setFormType] = useState<FormType>(FormType.None);
    const params = useParams();

    const onEntrySubmit = async (value: EntryWithoutId) => {
        try {
            const newEntry = await patientService.addEntry(params.id as string, value);
            setPatient(prev => {
                const patientIndex = prev.findIndex(p => p.id === params.id);
                const patientToUpdate = prev[patientIndex];
                const updatedPatient = {
                    ...patientToUpdate,
                    // 3. Create a NEW copy of the entries array and add the new entry
                    entries: [...patientToUpdate.entries, newEntry]
                };

                // 4. Create a NEW array for the overall patient list
                return [
                    ...prev.slice(0, patientIndex), // Patients before the updated one
                    updatedPatient,                         // The new patient object
                    ...prev.slice(patientIndex + 1) // Patients after the updated one
                ];
            });
            setFormType(FormType.None);
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e?.response?.data && typeof e?.response?.data === "string") {
                    const message = e.response.data.replace('Something went wrong. Error: ', '');
                    console.error(message);
                    setError(message);
                } else {
                    setError("Unrecognized axios error");
                }
            } else {
                console.error("Unknown error", e);
                setError("Unknown error: " + e);
            }
            setTimeout(() => setError(""), 5000);
        }
    };

    return (
        <>
            <h1>Patientor</h1>

            <Link to="/">Home</Link>

            <h1>{name} {gender === 'male' ? '♂' : '♀'}</h1>
            <div>ssh: {ssn}</div>
            <div>occupation: {occupation}</div>
            <br />
            <h3>entries</h3>
            <br />
            {error && <Alert severity="error">{error}</Alert>}

            <FormControl fullWidth sx={{ margin: '8px 0' }}>
                <InputLabel id="entry-select-label">Add entry</InputLabel>
                <Select
                    labelId="entry-select-label"
                    value={formType}
                    label="Entry form"
                    onChange={({ target }) => setFormType(target.value as FormType)}
                >
                    <MenuItem value="">
                        {/* Use a non-breaking space to ensure content/height is preserved */}
                        &nbsp;
                    </MenuItem>
                    {Object.values(FormType).map((type) =>
                        type ? <MenuItem key={type} value={type}>{type}</MenuItem> : null
                    )}

                </Select>

            </FormControl>

            {formType && <AddEntryForm type={formType} onSubmit={onEntrySubmit} />}
            <br />
            {entries?.map((e, index) => {
                return (
                    <EntryDetails key={index} entry={e} />
                );
            })}
        </>
    );
}