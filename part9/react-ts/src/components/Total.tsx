interface TotalProps {
    total: number
}

export default function Total({ total }: TotalProps) {
    return (
        <p>Number of exercises{total}</p>
    )
}