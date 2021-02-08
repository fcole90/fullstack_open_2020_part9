interface ExercisePlannerResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface ExercisePlannerArgs {
  hours: Array<number>,
  target: number
}

const parseArguments = (args: Array<string>): ExercisePlannerArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (isNaN(Number(args[2]))) throw new Error('Provided values were not numbers!');

  return {
    target: Number(args[2]),
    hours: args.slice(3).map(arg => {
      if (isNaN(Number(arg))) {
        throw new Error('Provided values were not numbers!');
      }
      return  Number(arg);
    })
  };

};

const calculateExercises = (exerciseHours: Array<number>, targetExerciseHours: number): ExercisePlannerResult => {
  const average = exerciseHours.reduce((acc, el) => acc + el) / exerciseHours.length;
  const averageRatio = average / targetExerciseHours;
  const rating = (
    averageRatio < 0.5 ?
      1: 
      averageRatio >= 0.98 ? 
        3 
      // else
        : 2
  );
  const ratingDescription = (
    rating === 1 ? 
      'you should put more effort' :
      rating === 2 ? 
        'not too bad but could be better'
      // else
        : 'you\'re doing great!'
  );

  return {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.reduce((acc, el) => el > 0 ? acc + 1 : acc, 0),
    success: exerciseHours.every(el => el >= targetExerciseHours),
    rating,
    ratingDescription,
    target: targetExerciseHours,
    average
  };};

const main = (): void => {
  try {
    const { hours, target } = parseArguments(process.argv);
    console.log(calculateExercises(hours, target));
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('Error, something bad happened, message: ', e.message);
  }
};

if (require.main === module) {
  main();
}


export default calculateExercises;