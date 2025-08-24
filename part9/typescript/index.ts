import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
    // return res.json("Hello Full Stack!")
    return res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const { height, weight } = req.query;
    if (!height || !weight) {
        return res.json({error: 'Malformed parameters'})
    }
    const bmi = calculateBmi(Number(height), Number(weight))
    return res.send({weight, height, bmi});
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
