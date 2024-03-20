export const Utils = {
    isContainedWordFrom: (word, text) => text.indexOf(word) > -1,
    sliceLastElementFromDelimiter: (characters, delimiter) => {
        let split = characters.split(delimiter);
        let last = split.pop();
        let rest = split.join(delimiter);
        return { last, rest };
    }
};