import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, PublicPatient, NewPatient, NewEntry, Entry } from "../types";
import { toPublicPatient } from '../utils';

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(toPublicPatient);
};

const getPatient = (id: string): Patient | undefined => {
  const foundPatient = patients.find(p => p.id === id);
  return foundPatient;
};

const addPatient = (entry: NewPatient): PublicPatient => {
  const addedPatient: Patient = {
    id: uuid(),
    ...entry
  };

  patients.push(addedPatient);

  const addedPublicPatient = toPublicPatient(addedPatient);
  return addedPublicPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Patient | undefined => {
  const addedEntry: Entry = {
    id: uuid(),
    ...entry
  };

  patients.map((patient) => {
    if (patient.id === patientId) {
      patient.entries.push(addedEntry);
      return patient;
    }
    return patient;
  });

  return getPatient(patientId);
};

export default {
  getPublicPatients,
  getPatient,
  addPatient,
  addEntry,
};
