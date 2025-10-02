import WorkIcon from '@mui/icons-material/Work';

interface OccupationalEntryProps {
    date: string;
    description: string;
    specialist: string;
    employerName: string;
}

export default function OccupationalEntry({ date, description, specialist, employerName }: OccupationalEntryProps) {
    return (
        <div style={{border: '1px solid black', margin: '8px'}}>
            <div>{date} <WorkIcon/> {employerName}</div>
            <i>{description}</i>
            <div>diagnose by {specialist}</div>
        </div>
    );
}