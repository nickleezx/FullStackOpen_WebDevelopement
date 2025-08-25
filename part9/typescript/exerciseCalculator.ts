interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

// const dailyHours: number[] = [3, 0, 2, 4.5, 0, 3, 1];

function parseArgs(args: string[]): {target: number, hours: number[]}{
    if (args.length < 12) throw new Error('Too few numbers');
    if (args.length > 12) throw new Error('Too many numbers');

    if (isNaN(Number(args[2])) || isNaN(Number(args[3])) || isNaN(Number(args[4])) 
    || isNaN(Number(args[5])) || isNaN(Number(args[6])) || isNaN(Number(args[7])) 
    || isNaN(Number(args[8])) ) {
        throw new Error("Invalid arguments. Must be number.");
    }

    return {
        target: Number(args[2]),
        hours: args.slice(3).map(num => Number(num))
    };
}

const ratingDescription: Record<number, string> = {
    1: "you can do better",
    2: "not too bad but could be better",
    3: "good",
};

export function calculateExercises({hours, target}: {hours:number[], target:number}): ExerciseResult {
    // const target = 2

    const periodLength = hours.length;
    const trainingDays = hours.reduce((accumulator, currentVal) => {
        return currentVal > 0 ? accumulator + 1: accumulator;
    }, 0);
    const average = (hours.reduce((acc, curr) => acc + curr, 0)) / periodLength;
    const success = average >= target ? true : false;
    let rating;
    if (average > target) {
        rating = 3;
    } else if (average > 0.25 * target) {
        rating = 2;
    } else {
        rating = 1;
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription: ratingDescription[rating],
        target,
        average
    };
}

if (require.main === module) {
    console.log(calculateExercises(parseArgs(process.argv)));
}
