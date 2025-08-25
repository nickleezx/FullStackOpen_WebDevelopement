interface BMIvalues {
    height: number,
    weight: number
}

const parseArgs = (args: string[]): BMIvalues => {
    if (args.length > 4) throw new Error('Too many numbers');
    if (args.length < 4) throw new Error('Too few numbers');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error("Invalid arguments. Must be number.");
    }
};

export function calculateBmi(height: number, weight: number): string {
    const heightInMeter: number = parseFloat((height / 100).toFixed(2));
    const bmi: number = weight / (heightInMeter * heightInMeter);
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi < 25.0) {
        return "Normal range";
    } else {
        return "Overweight";
    }
}


if (require.main === module) {
    try {
        const { height, weight } = parseArgs(process.argv);
        console.log(calculateBmi(height, weight));
    } catch (e: unknown) {
        let errorMsg;
        if (e instanceof Error) {
            errorMsg = "Error" + e.message;
        }
        console.log(errorMsg);
    }
}

