import { Gender, NewPatient, PublicPatient, Patient, NewEntry, HealthCheckRating, EntryType, Discharge, SickLeave } from "./types";

type NewPatientFields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown,
};

type NewEntryFields = {
  type: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
  healthCheckRating: unknown;
  discharge: unknown;
  employerName: unknown;
  sickLeave?: unknown;
};

export const toPublicPatient = (patient: Patient): PublicPatient => {
  const { id, name, dateOfBirth, gender, occupation } = patient;

  return {
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  };
};

export const toNewPatient = (
  { name, dateOfBirth, ssn, gender, occupation }: NewPatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseText(name, 'name'),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseText(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseText(occupation, 'occupation'),
    entries: [],
  };

  return newPatient;
};

export const toNewEntry = (
  {
    type, description, date, specialist, diagnosisCodes, healthCheckRating,
    discharge, employerName, sickLeave
  }: NewEntryFields): NewEntry | null => {
  const entryType = parseEntryType(type);

  switch (entryType) {
    case (EntryType.HealthCheck):
      return {
        type: entryType,
        description: parseText(description, 'description'),
        date: parseDate(date),
        specialist: parseText(specialist, 'specialist'),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
      };
    case (EntryType.Hospital):
      return {
        type: entryType,
        description: parseText(description, 'description'),
        date: parseDate(date),
        specialist: parseText(specialist, 'specialist'),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        discharge: parseDischarge(discharge),
      };
    case (EntryType.OccupationalHealthcare):
      return {
        type: entryType,
        description: parseText(description, 'description'),
        date: parseDate(date),
        specialist: parseText(specialist, 'specialist'),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        employerName: parseText(employerName, 'employerName'),
        sickLeave: parseSickLeave(sickLeave) ?? undefined,
      };
    default:
      assertNever(entryType);
  }

  return null;
};

const parseText = (text: unknown, fieldName: string): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${fieldName}`);
  }

  return text;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth');
  }

  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }

  return gender;
};

const parseEntryType = (type: unknown): EntryType => {
  if (!type || !isValidType(type)) {
    throw new Error('Incorrect or missing type');
  }

  return type;
};

const parseDiagnosisCodes = (codes: unknown): string[] => {
  if (!codes) {
    return [];
  }

  if (!(codes instanceof Array) || !codes.every(code => isString(code))) {
    throw new Error('Incorrect codes');
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return codes;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (rating === undefined || rating === null || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing health check rating');
  }

  return rating;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (
    !discharge || !(discharge instanceof Object) ||
    !('date' in discharge) || !('criteria' in discharge)
  ) {
    throw new Error('Incorrect or missing discharge');
  }

  const dischargeObj: Discharge = {
    date: parseDate((discharge as any).date),
    criteria: parseText((discharge as any).criteria, 'criteria'),
  };

  return dischargeObj;
};

const parseSickLeave = (sickLeave: unknown): SickLeave | null => {
  if (!sickLeave) {
    return null;
  }

  if (
    !(sickLeave instanceof Object) ||
    !('startDate' in sickLeave) || !('endDate' in sickLeave)
  ) {
    throw new Error('Incorrect sick leave');
  }

  const sickObj: SickLeave = {
    startDate: parseDate((sickLeave as any).startDate),
    endDate: parseDate((sickLeave as any).endDate),
  };

  return sickObj;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidType = (param: any): param is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
