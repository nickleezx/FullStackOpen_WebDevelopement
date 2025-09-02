import express, { NextFunction, Request, Response } from "express";
import PatientService from "../services/patientService";
import { NewPatientSchema } from "../utils/utils";
import { z } from "zod";

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorHandler = (
    error: unknown,
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.issues });
    } else {
        next(error);
    }
};

router.get("/", (_req, res) => {
    res.send(PatientService.getPatientsWithoutSsn());
});

router.post("/", newPatientParser, (req, res) => {
    try {
        const newPatient = NewPatientSchema.parse(req.body);
        const newEntry = PatientService.addPatient(newPatient);
        res.json(newEntry);
    } catch (error: unknown) {
        //fallback error message if error is not error class
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage = "Error" + error.message;
        }

        res.status(500).send(errorMessage);
    }
});

router.use(errorHandler);

export default router;
