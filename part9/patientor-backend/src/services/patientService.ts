import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, PublicPatient, NewPatient } from "../types";
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

export default {
  getPublicPatients,
  getPatient,
  addPatient,
};
