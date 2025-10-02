import { useEffect, useState } from "react";
import AddHealthCheckForm from "./AddHealthCheckForm";
import diagnosisService from "../../../services/diagnosis";
import { Diagnosis, EntryWithoutId } from "../../../types";
import AddHospitalForm from "./AddHospitalForm";
import AddOccupationalHealthCareForm from "./AddOccupationalHealthcareForm";


interface AddEntryProps {
    type: string;
    onSubmit: (values: EntryWithoutId) => void
}

export default function AddEntryForm({ type, onSubmit }: AddEntryProps) {
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis>>([]);


    useEffect(() => {
        diagnosisService.getDiagnoses().then(data => setDiagnosisCodes(data));
    }, []);


    switch (type) {
        case "Hospital":
            return (
                <div style={{ border: "1px dotted black" }}>
                    <AddHospitalForm onSubmit={onSubmit} listOfDiagnosisCodes={diagnosisCodes} />
                </div >
            );
        case "HealthCheck":
            return (
                <div style={{ border: "1px dotted black" }}>
                    <AddHealthCheckForm onSubmit={onSubmit} listOfDiagnosisCodes={diagnosisCodes} />
                </div>
            );
        case "OccupationalHealthcare":
            return (
                <div style={{ border: "1px dotted black" }}>
                    <AddOccupationalHealthCareForm onSubmit={onSubmit} listOfDiagnosisCodes={diagnosisCodes}/>
                </div>
            );
        default:
            return;
    }


}