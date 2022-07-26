import bodyParser from "body-parser";
import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

const jsonParser = bodyParser.json();

app.get('/hello', (_req, res) => {
  res.json({
    value: 'Hello Full Stack!'
  });
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || isNaN(Number(height)) || !weight || isNaN(Number(weight))) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  const category = calculateBmi(Number(height), Number(weight));
  return res.json({
    height,
    weight,
    bmi: category,
  });
});

app.post('/exercise', jsonParser, (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { 'daily_exercises': dailyExercises, target } = req.body;

  if (!dailyExercises || !target) {
    return res.status(400).json({
      error: 'parameters missing',
    });
  }

  if (
    isNaN(Number(target)) ||
    !(dailyExercises instanceof Array) ||
    !dailyExercises.every((item) => !isNaN(Number(item)))
  ) {
    return res.status(400).json({
      error: 'malformatted parameters',
    });
  }

  const result = calculateExercises(
    dailyExercises.map((item) => Number(item)),
    Number(target)
  );
  return res.json(result);
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
