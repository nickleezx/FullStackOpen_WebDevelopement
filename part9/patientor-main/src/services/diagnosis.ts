import axios from "axios";
import { Diagnosis } from "../types";

const baseUrl = "http://localhost:3001/api";

const getDiagnoses = async () => {
    const { data } = await axios.get<Diagnosis[]>(`${baseUrl}/diagnoses`);
    return data;
};

export default {
    getDiagnoses,
};
