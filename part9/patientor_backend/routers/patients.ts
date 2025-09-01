import express from "express";
import PatientService from "../services/patientService";
import { toNewPatient } from "../utils/utils";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(PatientService.getPatientsWithoutSsn());
});

router.post("/", (req, res) => {
    try {        
        const newPatient = toNewPatient(req.body);
        const newEntry = PatientService.addPatient(newPatient);
        res.json(newEntry);
    } catch (error: unknown) {
        //fallback error message if error is not error class
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage = "Error" + error.message;
        }

        res.status(500).send(errorMessage);
    }

});

export default router;