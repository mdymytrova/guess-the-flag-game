const getRandomIndexes = (array: number[], range: number): number[] => {
    const index = getRandomIndex(range);
    if (array.length < 4) {
        array = !array.includes(index)
            ? getRandomIndexes([...array, index], range)
            : getRandomIndexes(array, range);
    }
    return array;
}

const getRandomIndex = (length: number = 4): number => {
    return Math.floor(Math.random() * length);
}

const Random = {
    getRandomIndexes,
    getRandomIndex
};

export default Random;