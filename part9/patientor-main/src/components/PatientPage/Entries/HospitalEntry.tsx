import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface HostpitalEntryProps {
    date: string;
    description: string;
    specialist: string;
}

export default function HospitalEntry({ date, description, specialist }: HostpitalEntryProps) {
    return (
        <div style={{border: '1px solid black', margin: '8px'}}>
            <div>{date} <LocalHospitalIcon /></div>
            <i>{description}</i>
            <div>diagnose by {specialist}</div>
        </div>
    );
}