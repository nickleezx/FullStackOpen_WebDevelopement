import { NewPatient, Gender, Diagnosis } from "../types";
import { z } from "zod";

// const isString = (text: unknown): text is string => {
//     return typeof text === "string" || text instanceof String;
// };

// const isDate = (date: string): boolean => {
//     return Boolean(Date.parse(date));
// };

// const parseName = (name: unknown): string => {
//     if (!name || !isString(name)) {
//         throw new Error("Name must be string");
//     }
//     return name;
// };

// const parseSsn = (ssn: unknown): string => {
//     if (!ssn || !isString(ssn)) {
//         throw new Error("Ssn must be string");
//     }
//     return ssn;
// };

// const parseOccupation = (occupation: unknown): string => {
//     if (!occupation || !isString(occupation)) {
//         throw new Error("Occupation must be string");
//     }
//     return occupation;
// };

// const parseDate = (date: unknown): string => {
//     if (!date || !isString(date) || !isDate(date)) {
//         throw new Error("Incorrect or missing date: " + date);
//     }
//     return date;
// };

// const isGender = (param: string): param is Gender => {
//     return Object.values(Gender)
//         .map((v) => v.toString())
//         .includes(param);
// };

// const parseGender = (gender: unknown): Gender => {
//     if (!gender || !isString(gender) || !isGender(gender)) {
//         throw new Error("Incorrect or missing gender: " + gender);
//     }
//     return gender;
// };

// export const toNewPatient = (object: unknown): NewPatient => {
//     if (!object || typeof object !== "object") {
//         throw new Error("Incorrect or missing data");
//     }

//     if (
//         "name" in object &&
//         "dateOfBirth" in object &&
//         "ssn" in object &&
//         "gender" in object &&
//         "occupation" in object
//     ) {
//         // const newPatient: NewPatient = {
//         //     name: parseName(object.name),
//         //     dateOfBirth: parseDate(object.dateOfBirth),
//         //     ssn: parseSsn(object.ssn),
//         //     gender: parseGender(object.gender),
//         //     occupation: parseOccupation(object.occupation),
//         // };

//         // using of zod type parsing
//         const newPatient: NewPatient = {
//             name: z.string().parse(object.name),
//             dateOfBirth: z.iso.date().parse(object.dateOfBirth),
//             ssn: z.string().parse(object.ssn),
//             gender: z.enum(Gender).parse(object.gender),
//             occupation: z.string().parse(object.occupation)
//         };

//         return newPatient;
//     }
//     throw new Error("Incorrect date: some fields are missing");
// };

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.iso.date(),
    ssn: z.string(),
    gender: z.enum(Gender),
    occupation: z.string(),
});

export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodees' in object)) {
        return [] as Array<Diagnosis['code']>
    }
    return object.diagnosisCodees as Array<Diagnosis['code']>
}



export const toNewPatient = (object: unknown): NewPatient => {
    return NewPatientSchema.parse(object);
};
