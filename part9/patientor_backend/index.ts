import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
    console.log("Someone pinged here");
    res.send("pong");
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});