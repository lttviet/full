import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();
app.use(express.json());

const PORT = 3001;

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
