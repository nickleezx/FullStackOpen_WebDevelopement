import type { CoursePart } from "../types/CourseTypes"
import Part from "./Part"

export default function Content({ contentProps }: { contentProps: CoursePart[] }) {
    return (
        <>
            <Part courseParts={contentProps}/>
        </>
    )
}