import type { DiaryEntry, DiaryEntryNoId } from "../types/types";
import diaryService from "../services/diaryService";
import { useState } from "react";


export default function DiaryForm({ setDiaries }: { setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>> }) {
    const [diary, setDiary] = useState<DiaryEntryNoId>({
        date: "",
        visibility: "",
        weather: "",
        comment: ""
    });
    const [error, setError] = useState<string>("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDiary(prev => ({ ...prev, [name]: value } as DiaryEntryNoId));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        diaryService.addDiary(diary).then(response => {
            setDiaries(prev => [...prev, response])
            setDiary({ date: "", visibility: "", weather: "", comment: "" });
            setError("")
        }).catch(err => setError(err.message))
    };

    return (
        <>
            <h1>Add new entry</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleSubmit}
                style={{ display: 'inline-block', flexDirection: 'column' }}>
                <div>
                    <label htmlFor="date">date</label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        value={diary.date}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>visibility: </label>
                    <label>
                        great
                        <input
                            type="radio"
                            name="visibility"
                            value="great"
                            checked={diary.visibility === "great"}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        good
                        <input
                            type="radio"
                            name="visibility"
                            value="good"
                            checked={diary.visibility === "good"}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        ok
                        <input
                            type="radio"
                            name="visibility"
                            value="ok"
                            checked={diary.visibility === "ok"}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        poor
                        <input
                            type="radio"
                            name="visibility"
                            value="poor"
                            checked={diary.visibility === "poor"}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div>
                    <label>weather: </label>
                    <label>
                        sunny
                        <input
                            type="radio"
                            name="weather"
                            value="sunny"
                            checked={diary.weather === "sunny"}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        rainy
                        <input
                            type="radio"
                            name="weather"
                            value="rainy"
                            checked={diary.weather === "rainy"}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        cloudy
                        <input
                            type="radio"
                            name="weather"
                            value="cloudy"
                            checked={diary.weather === "cloudy"}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        stormy
                        <input
                            type="radio"
                            name="weather"
                            value="stormy"
                            checked={diary.weather === "stormy"}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        windy
                        <input
                            type="radio"
                            name="weather"
                            value="windy"
                            checked={diary.weather === "windy"}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div>
                    <label htmlFor="comment">comment</label>
                    <input
                        id="comment"
                        name="comment"
                        type="text"
                        value={diary.comment}
                        onChange={handleChange}
                    />
                </div>


                <button type="submit">add</button>
            </form>
        </>
    );
}