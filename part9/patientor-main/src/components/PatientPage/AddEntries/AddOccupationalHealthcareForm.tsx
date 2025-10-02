import { useState } from "react";
import { Diagnosis, EntryWithoutId, SickLeave } from "../../../types";
import { InputLabel, MenuItem, Select, TextField, FormControl, Button } from "@mui/material";

interface AddOccupationalHealthCareProps {
    onSubmit: (values: EntryWithoutId) => void
    listOfDiagnosisCodes: Array<Diagnosis>
}

export default function AddOccupationalHealthCareForm({ onSubmit, listOfDiagnosisCodes }: AddOccupationalHealthCareProps) {
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([]);
    const [employerName, setEmployerName] = useState("");
    const [sickLeave, setSickLeave] = useState<SickLeave>({startDate: "", endDate: ""});

    return (
        <div style={{ padding: "8px" }}>
            <p><b>New Occpuational Healthcare Entry</b></p>
            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ description, date, specialist, diagnosisCodes, employerName, sickLeave, type: "OccupationalHealthcare" });
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

                <TextField
                    label="Employer"
                    fullWidth
                    value={employerName}
                    onChange={({ target }) => setEmployerName(target.value)}
                />

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
                        value={sickLeave.startDate} // 🛑 Use dischargeDate state
                        onChange={({ target }) => setSickLeave({...sickLeave, startDate: target.value})}
                        InputLabelProps={{ shrink: true }}
                        sx={{ margin: '8px 0' }}
                    />
                    <TextField
                        label="Discharge date"
                        type="date"
                        fullWidth
                        value={sickLeave.endDate} // 🛑 Use dischargeDate state
                        onChange={({ target }) => setSickLeave({...sickLeave, endDate:target.value})}
                        InputLabelProps={{ shrink: true }}
                        sx={{ margin: '8px 0' }}
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
        </div>
    );
}