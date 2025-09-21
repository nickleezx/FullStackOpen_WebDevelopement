import { useEffect, useState } from "react"
import diaryService from "./services/diaryService"
import type { DiaryEntry } from "./types/types"
import Diary from "./components/Diary"
import DiaryForm from "./components/DiaryForm"

function App() {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([])

    useEffect(() => {
        diaryService.getDiaries().then(data => setDiaries(data));
    }, [])



    return (
        <>
            <DiaryForm setDiaries={setDiaries}/>
            <h1>Diary Entries</h1>
            <br />
            {diaries.map((diary, index) => <Diary key={index} date={diary.date} weather={diary.weather} visibility={diary.visibility}/>)}
        </>
    )
}

export default App
