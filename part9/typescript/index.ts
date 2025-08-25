import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
    // return res.json("Hello Full Stack!")
    return res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const { height, weight } = req.query;
    if (!height || !weight) {
        return res.json({ error: "Malformed parameters" });
    }
    const bmi = calculateBmi(Number(height), Number(weight));
    return res.send({ weight, height, bmi });
});

app.post("/exercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        console.log(daily_exercises, target);
        return res.json({ error: "parameters missing" });
    }

    if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
        return res.json({ error: "malformatted parameters" });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return res.json(calculateExercises({ hours: daily_exercises, target }));
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
