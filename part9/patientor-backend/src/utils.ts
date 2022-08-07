import { Gender, NewPatient, PublicPatient, Patient } from "./types";

type newPatientFields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown,
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

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: newPatientFields): NewPatient => {
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
