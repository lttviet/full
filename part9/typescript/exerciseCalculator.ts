interface ExerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface ExerciseInput {
  targetDailyHour: number
  exerciseHours: Array<number>
}

const parseExerciseInput = (args: Array<string>): ExerciseInput => {
  if (args.length < 4) throw new Error('not enough args')

  const isValid = args.slice(2).every((arg) => !isNaN(Number(arg)))

  if (!isValid) {
    throw new Error('provided values are not numbers')
  }

  const targetDailyHour = Number(args[2])
  const exerciseHours = args.slice(3).map((arg) => Number(arg))

  return {
    targetDailyHour,
    exerciseHours,
  }
}

const calculateExercises = (exerciseHours: Array<number>, targetDailyHour: number): ExerciseResult => {
  const periodLength = exerciseHours.length
  const trainingDays = exerciseHours.filter((hour) => hour > 0).length
  const sumOfAllHours = exerciseHours.reduce((prev, curr) => prev + curr, 0)
  const average = sumOfAllHours / periodLength
  const success = average >= targetDailyHour

  let rating = 1
  if (success) {
    rating = 3
  } else if ((average / targetDailyHour) > 0.5) {
    rating = 2
  }

  let ratingDescription: string
  switch (rating) {
    case 1:
      ratingDescription = 'try harder'
      break
    case 2:
      ratingDescription = 'not bad but could be better'
      break
    case 3:
      ratingDescription = 'great job'
      break
    default:
      throw new Error('rating is not 1, 2 or 3')
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetDailyHour,
    average
  }
}

try {
  const { targetDailyHour, exerciseHours } = parseExerciseInput(process.argv)
  console.log(calculateExercises(exerciseHours, targetDailyHour))
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message)
  }
}
