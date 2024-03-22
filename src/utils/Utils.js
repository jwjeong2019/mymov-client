export const Utils = {
    isContainedWordFrom: (word, text) => text.indexOf(word) > -1,
    sliceLastElementFromDelimiter: (characters, delimiter) => {
        let split = characters.split(delimiter);
        let last = split.pop();
        let rest = split.join(delimiter);
        return { last, rest };
    },
    getDateFormat: (d, format) => {
        const _applyPad = num => num.toString().padStart(2, '0');
        const year = d.getFullYear();
        const month = _applyPad(d.getMonth() + 1);
        const date = _applyPad(d.getDate());
        const hour = _applyPad(d.getHours());
        const min = _applyPad(d.getMinutes());
        const sec = _applyPad(d.getSeconds());
        if (format === 'yyyy-MM-dd') {
            return [year, month, date].join('-');
        }
        if (format === 'yyyy-MM-dd HH:mm:ss') {
            const yyyyMMdd = [year, month, date].join('-');
            const HHmmss = [hour, min, sec].join(':');
            return [yyyyMMdd, HHmmss].join(' ');
        }
        if (format === 'HH:mm') {
            return [hour, min].join(':');
        }
        return '';
    },
};