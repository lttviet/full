import express from 'express';
import patientService from '../../services/patientService';
import { toNewPatient } from '../../utils';

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

export default router;
