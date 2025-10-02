import { Diagnosis, EntryWithoutId } from "../../../types";
import { useState } from "react";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface HospitalProps {
    onSubmit: (values: EntryWithoutId) => void
    listOfDiagnosisCodes: Array<Diagnosis>
}

export default function AddHospitalForm({ onSubmit, listOfDiagnosisCodes }: HospitalProps) {

    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([]);
    const [dischargeDate, setDischargeDate] = useState("");
    const [criteria, setCriteria] = useState("");

    return (
        <div style={{ padding: "8px" }}>
            <p><b>New Hospital Entry</b></p>

            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ description, date, specialist, diagnosisCodes, discharge:{ criteria, date: dischargeDate }, type: "Hospital" });
            }}>

            <TextField
                label="Description"
                fullWidth
                value={description}
                onChange={({ target }) => setDescription(target.value)}
            />

            <TextField
                label="Date"
                type="date"
                fullWidth
                value={date}
                onChange={({ target }) => setDate(target.value)}
                // ➡️ This ensures the label stays "shrunk" (above the input)
                InputLabelProps={{ shrink: true }}
                // The InputProps are for the underlying Input component
                InputProps={{
                    sx: {
                        // Apply the same CSS hack if needed, but shrink is often enough
                        // to make the native date field look acceptable.
                    }
                }}
                sx={{ margin: '8px 0' }}
            />

            <TextField
                label="Specialist"
                fullWidth
                value={specialist}
                onChange={({ target }) => setSpecialist(target.value)}
            />

            <FormControl fullWidth sx={{ margin: '8px 0' }}>
                <InputLabel id="diagnosis-code-select-label">Diagnosis codes</InputLabel>
                <Select
                    labelId="diagnosis-code-select-label"
                    id="diagnosis-code-select"
                    value={diagnosisCodes}
                    label="Diagnosis codes"
                    multiple
                    onChange={({ target }) => {
                        // Ensure the value is treated as an array of strings
                        const value = target.value;
                        setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value as string[]);
                    }}
                >
                    {listOfDiagnosisCodes.map((code) =>
                        <MenuItem key={code.code} value={code.code} >{code.code}</MenuItem>
                    )}
                </Select>
            </FormControl>

            <fieldset style={{
                border: '1px solid #ccc', // Light border for visual grouping
                borderRadius: '4px',      // Optional: match MUI border radius
                padding: '16px',          // Padding inside the group
                margin: '16px 0'          // Margin around the group
            }}>
                <legend style={{
                    padding: '0 8px',
                    fontSize: '1em',
                    fontWeight: 'bold' // Optional: make it stand out
                }}>
                    Discharge
                </legend>

                {/* DISCHARGE DATE FIELD */}
                <TextField
                    label="Discharge date"
                    type="date"
                    fullWidth
                    value={dischargeDate} // 🛑 Use dischargeDate state
                    onChange={({ target }) => setDischargeDate(target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ margin: '8px 0' }}
                />

                {/* CRITERIA FIELD */}
                <TextField
                    label="Criteria"
                    fullWidth
                    value={criteria} // 🛑 Use criteria state
                    onChange={({ target }) => setCriteria(target.value)}
                />
            </fieldset>

            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <Button
                    color="secondary"
                    variant="contained"
                    // style={{ float: "left" }}
                    type="button"
                // onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    style={{
                        // float: "right",
                    }}
                    type="submit"
                    variant="contained"
                >
                    Add
                </Button>
            </div>
        </form>

        </div >
    );
}