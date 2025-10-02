import express, { NextFunction, Request, Response } from "express";
import PatientService from "../services/patientService";
import { NewPatientSchema } from "../utils/utils";
import { z, ZodError } from "zod";
import { NewBaseEntrySchema, NewEntrySchema } from "../types";

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewBaseEntrySchema.parse(req.body)
        next()
    } catch (error: unknown) {
        next(error)
    }
}

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
    res.send(PatientService.getPatients());
});

router.get("/:id", (req, res) => {
    const id = z.string().parse(req.params.id);
    return res.send(PatientService.getPatientById(id));
})

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

router.post("/:id/entries", newEntryParser, (req, res) => {
    try {
        const newEntry = NewEntrySchema.parse(req.body);
        const patient = PatientService.addEntryToPatient(req.params.id, newEntry)
        return res.json(patient);
    } catch (error: unknown) {
        let errorMsg = "Something went wrong.";
        if (error instanceof ZodError) {
            const flattedError = z.treeifyError(error)
            console.log("Validation failed. Error: ", flattedError)
            errorMsg = "Error" + JSON.stringify(flattedError);
        } else {
            console.log(error)
        }
        return res.status(500).send(errorMsg);
    }
})

router.use(errorHandler);

export default router;
