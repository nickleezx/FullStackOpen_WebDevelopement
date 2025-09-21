import type { DiaryEntryNoId } from "../types/types"

export default function Diary({ date, visibility, weather }: DiaryEntryNoId) {
    return (
        <div>
            <h2>{date}</h2>
            <br />
            <div>visibility: {visibility}</div>
            <div>weather: {weather}</div>
        </div>
    )
}