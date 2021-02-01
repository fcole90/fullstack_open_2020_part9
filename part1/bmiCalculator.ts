interface BmiArgs {
  height: number,
  mass: number
}

const parseArguments = (args: Array<string>): BmiArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (heightCm: number, massKg: number) : string => {
  const heightM: number = heightCm / 100;
  const bmi: number = massKg / (heightM * heightM);
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi > 18.5 && bmi < 25){
    return 'Normal (healthy weight)';
  } else if (bmi > 25 && bmi < 30){
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

const main = (): void => {
  try {
    const { height, mass } = parseArguments(process.argv);
    console.log(calculateBmi(height, mass));
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('Error, something bad happened, message: ', e.message);
  }
};

if (require.main === module) {
  main();
}

export default calculateBmi;