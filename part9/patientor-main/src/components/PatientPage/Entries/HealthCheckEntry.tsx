import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { HealthCheckRating } from '../../../types';

interface HealthCheckEntryProps {
    date: string;
    description: string;
    specialist: string;
    rating: HealthCheckRating
}

const getRatingColor = (rating: HealthCheckRating) => {
    switch (rating) {
        case HealthCheckRating.CriticalRisk:
            return 'red';
        case HealthCheckRating.Healthy:
            return 'green';
        case HealthCheckRating.HighRisk:
            return 'orange';
        case HealthCheckRating.LowRisk:
            return'yellow';
        default:
            return 'black';
    }
};

export default function HealthCheckEntry({ date, description, specialist, rating }: HealthCheckEntryProps) {
    
    const color = getRatingColor(rating);
    
    return (
        <div style={{border: '1px solid black', margin: '8px'}}>
            <div>{date} <MedicalServicesIcon/></div>
            <i>{description}</i>
            <FavoriteIcon sx={{color: color}}/>
            <div>diagnose by {specialist}</div>
        </div>
    );
}