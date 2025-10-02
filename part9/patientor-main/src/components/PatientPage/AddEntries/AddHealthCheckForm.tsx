import { useState } from "react";
import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../../../types";
import { InputLabel, MenuItem, Select, TextField, FormControl, Button } from "@mui/material";

interface AddHealthCheckProps {
    onSubmit: (values: EntryWithoutId) => void
    listOfDiagnosisCodes: Array<Diagnosis>
}

export default function AddHealthCheckForm({ onSubmit, listOfDiagnosisCodes }: AddHealthCheckProps) {
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([]);
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);

    return (
        <div style={{ padding: "8px" }}>
            <p><b>New HealthCheck Entry</b></p>

            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ description, date, specialist, diagnosisCodes, healthCheckRating, type: "HealthCheck" });
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

                <TextField
                    type="number"
                    value={healthCheckRating}
                    fullWidth
                    label="Healthcheck rating"
                    sx={{ margin: '8px 0' }}
                    onChange={({ target }) => setHealthCheckRating(Number(target.value))}
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