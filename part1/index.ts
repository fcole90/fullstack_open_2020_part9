import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';


const safeNumber = (x: unknown) : number => {
  const converted = Number(x);
  if (isNaN(converted)) {
    throw new Error(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `Conversion error: '${x}' is not a valid number`
    );
  } 
  return converted;
};


const app = express();
app.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const weight: number = safeNumber(req.query.weight);
    const height: number = safeNumber(req.query.height);
    res.send(JSON.stringify({
      weight,
      height,
      bmi: calculateBmi(height, weight)
    }));
  } catch (error) {
    console.log(error);
    res.send({
      error: 'malformatted parameters'
    }).status(400);
  }
});


app.post('/exercises', (req, res) => {

  interface ExercisesBody {
    target: number,
    daily_exercises: Array<number>
  }

  try {
    const body = req.body as ExercisesBody;
    const bodyTarget = body.target;
    const bodyDailyExercises = body.daily_exercises;

    if (!bodyTarget || !bodyDailyExercises) {
      return res.send({
        error: 'parameters missing'
      }).status(400);
    }

    const target: number = safeNumber(bodyTarget);
    if (!bodyDailyExercises.map) {
      throw new Error(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        'Conversion error: \'daily_exercises\' is not a valid Array'
      );
    }
    const dailyExercises: Array<number> = bodyDailyExercises.map((n) =>
      safeNumber(n)
    );

    return res.send(JSON.stringify(calculateExercises(dailyExercises, target)));
  } catch (error) {
    console.log(error);
    return res.send({
      error: 'malformatted parameters'
    }).status(400);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}: http://localhost:${PORT}`);
});