import express from 'express';
import patientService from '../../services/patientService';
import { toNewEntry, toNewPatient } from '../../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getPublicPatients());
});

router.get('/:id', (req, res) => {
  const foundPatient = patientService.getPatient(req.params.id);

  if (!foundPatient) {
    res.status(404).send('Not found');
  }

  res.json(foundPatient);
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMsg = 'Something went wrong';

    if (error instanceof Error) {
      errorMsg = `Error: ${error.message}`;
    }

    res.status(400).send(errorMsg);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = toNewEntry(req.body);

    if (!newEntry) {
      res.status(500).send('No valid entry');
    } else {
      const patient = patientService.addEntry(req.params.id, newEntry);

      if (!patient) {
        res.status(404).send('Patient not found');
      }

      res.json(patient);
    }
  } catch (error: unknown) {
    let errorMsg = 'Something went wrong';

    if (error instanceof Error) {
      errorMsg = `Error: ${error.message}`;
    }

    res.status(400).send(errorMsg);
  }
});

export default router;
