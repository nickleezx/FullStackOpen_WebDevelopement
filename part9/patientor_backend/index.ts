import express from "express";
import cors from "cors";
import diagnosesRouter from "./routers/diagnoses";
import patientRouter from "./routers/patients";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientRouter);

app.get("/api/ping", (_req, res) => {
    console.log("Someone pinged here");
    res.send("pong");
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
