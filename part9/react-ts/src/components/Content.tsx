interface ContentProps {
    name: string,
    exerciseCount: number
}

export default function Content({ contentProps }: { contentProps: ContentProps[] }) {
    return (
        <>
            {contentProps.map(p => <p>{p.name} {p.exerciseCount}</p>)}
        </>
    )
}