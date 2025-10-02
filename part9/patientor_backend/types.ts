import { z } from "zod";
import { NewPatientSchema } from "./utils/utils";

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3,
}

const HealthCheckRatingMin = Math.min(...Object.values(HealthCheckRating).filter(v => typeof v === 'number') as number[]);
const HealthCheckRatingMax = Math.max(...Object.values(HealthCheckRating).filter(v => typeof v === 'number') as number[]);
export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}


// export type Entry = OccupationalHealthCheckEntry | HealthCheckEntry | HospitalEntry;

// interface BaseEntry {
//     id: string;
//     description: string;
//     date: string;
//     specialist: string;
//     diagnosisCodes?: Array<Diagnosis["code"]>;
// }

// interface HospitalEntry extends BaseEntry {
//     type: "Hospital";
//     discharge: Discharge;
// }

// interface Discharge {
//     date: string;
//     criteria: string;
// }

// interface HealthCheckEntry extends BaseEntry {
//     type: "HealthCheck";
//     healthCheckRating: HealthCheckRating;
// }

// interface SickLeave {
//     startDate: string;
//     endDate: string;
// }
// interface OccupationalHealthCheckEntry extends BaseEntry {
//     type: "OccupationalHealthcare";
//     employerName: string;
//     sickLeave?: SickLeave;
// }

export const NewBaseEntrySchema = z.object({
    description: z.string(),
    date: z.string(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional()
})

const DischargeSchema = z.object({
    date: z.string(),
    criteria: z.string()
})

export const HospitalEntrySpecifics = z.object({
    type: z.literal('Hospital'),
    discharge: DischargeSchema,
})

const HealthCheckEntrySpecifics= z.object({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.number().int().min(HealthCheckRatingMin).max(HealthCheckRatingMax)
})

const SickLeaveSchema = z.object({
    startDate: z.string(),
    endDate: z.string(),
})

const OccupationalHealthCheckEntrySpecfics = z.object({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: SickLeaveSchema.optional()
})

const NewHospitalEntrySchema = NewBaseEntrySchema.extend(HospitalEntrySpecifics.shape);
const NewHealthCheckEntrySchema = NewBaseEntrySchema.extend(HealthCheckEntrySpecifics.shape);
const NewOccupationalHealthCheckEntrySchema = NewBaseEntrySchema.extend(OccupationalHealthCheckEntrySpecfics.shape)

export const NewEntrySchema = z.discriminatedUnion("type", [
    NewHospitalEntrySchema,
    NewHealthCheckEntrySchema,
    NewOccupationalHealthCheckEntrySchema
])

export type NewEntry = z.infer<typeof NewEntrySchema>

const BaseEntrySchema = NewBaseEntrySchema.extend({
    id: z.string()
})

const HospitalEntrySchema = BaseEntrySchema.extend(HospitalEntrySpecifics.shape);
const HealthCheckEntrySchema = BaseEntrySchema.extend(HealthCheckEntrySpecifics.shape);
const OccupationalHealthCheckEntrySchema = BaseEntrySchema.extend(OccupationalHealthCheckEntrySpecfics.shape);

const EntrySchema = z.discriminatedUnion("type", [
    HospitalEntrySchema,
    HealthCheckEntrySchema,
    OccupationalHealthCheckEntrySchema,
])

export type Entry = z.infer<typeof EntrySchema>
export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Array<Entry>;
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

// export type NewPatient = Omit<Patient, "id">;
export type NewPatient = z.infer<typeof NewPatientSchema>;

// type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K>: never;

// @ts-ignore
// type EntryWithoutId = UnionOmit<Entry, 'id'>;