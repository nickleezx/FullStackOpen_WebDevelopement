import type { CoursePart } from "../types/CourseTypes"

export default function Part({ courseParts }: { courseParts: CoursePart[] }) {
    return (
        courseParts.map(part => {
            switch (part.kind) {
                case "basic": return (
                    <div>
                        <div>
                            <b>{part.name} {part.exerciseCount}</b>
                        </div>
                        <div>
                            <em>{part.description}</em>
                        </div>
                    </div>
                )
                case "group": return (
                    <div>
                        <div>
                            <b>{part.name} {part.exerciseCount}</b>
                        </div>
                        <div>
                            Project exercises: {part.groupProjectCount}
                        </div>
                    </div>
                )
                case "background": return (
                    <div>
                        <div>
                            <b>{part.name} {part.exerciseCount}</b>
                        </div>
                        <div>
                            <em>{part.description}</em>
                        </div>
                        <div>submit to {part.backgroundMaterial}</div>
                    </div>
                )
                case "special": return (
                    <div>
                        <div>
                            <b>{part.name} {part.exerciseCount}</b>
                        </div>
                        <div>
                            <em>{part.description}</em>
                        </div>
                        <div>required skills: {part.requirements.map((text, i) => i === part.requirements.length - 1 ? text : text + ', ')}</div>
                    </div>
                )
                default:
                    return ((part: never): never => {
                        throw new Error(`Unhandled discriminated union member ${JSON.stringify(part)}`);
                    })(part);
            }
        })
    )
}