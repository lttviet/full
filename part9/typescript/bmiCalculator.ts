interface Size {
  heightInCm: number
  weightInKg: number
}

const parseSizeInput = (args: Array<string>): Size => {
  if (args.length < 4) throw new Error('Not enough args')
  if (args.length > 4) throw new Error('Too many args')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heightInCm: Number(args[2]),
      weightInKg: Number(args[3]),
    }
  } else {
    throw new Error('Provided values are not numbers')
  }
}

const calculateBmi = (heightInCm: number, weightInKg: number): string => {
  const bmi = weightInKg / ((heightInCm / 100) ** 2)

  let category: string
  if (bmi < 18.5) {
    category = 'Underweight'
  } else if (bmi < 25) {
    category = 'Normal'
  } else if (bmi < 30) {
    category = 'Overweight'
  } else {
    category = 'Obese'
  }

  return category
}

try {
  const { heightInCm, weightInKg } = parseSizeInput(process.argv)
  console.log(calculateBmi(heightInCm, weightInKg))
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message)
  }
}
