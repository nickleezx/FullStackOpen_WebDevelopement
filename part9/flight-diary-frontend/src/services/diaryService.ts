import axios from "axios";
import type { DiaryEntryNoId } from "../types/types";

const baseUrl = "http://localhost:3000";

const getDiaries = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/diaries`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.status);
            console.log(error.response);
            throw new Error(error.message);
        } else {
            console.error(error);
        }
    }
};

const addDiary = async (diary: DiaryEntryNoId) => {
    try {
        const response = await axios.post(`${baseUrl}/api/diaries`, diary);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.status);
            console.log(error.response);
            throw new Error(error.response?.data);
        } else {
            console.error(error);
        }
    }
};

export default {
    getDiaries,
    addDiary,
};
