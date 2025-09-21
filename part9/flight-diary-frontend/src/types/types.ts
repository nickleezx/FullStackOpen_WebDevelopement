export interface DiaryEntry {
    id: number;
    date: string;
    visibility: string;
    weather: string;
    comment?: string;
}

export type DiaryEntryNoId = Omit<DiaryEntry, "id">