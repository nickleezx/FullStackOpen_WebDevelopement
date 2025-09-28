import { Link } from "react-router-dom";

export interface PatientProps {
    name: string | undefined;
    gender: string | undefined;
    ssn: string | undefined;
    occupation: string | undefined;
}

export default function PatientPage({ name, gender, ssn, occupation }: PatientProps) {
    return (
        <>
            <h1>Patientor</h1>

            <Link to="/">Home</Link>

            <h1>{name} {gender === 'male' ? '♂' : '♀'}</h1>
            <div>ssh: {ssn}</div>
            <div>occupation: {occupation}</div>
        </>
    );
}