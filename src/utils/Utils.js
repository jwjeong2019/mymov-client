export const Utils = {
    isContainedWordFrom: (word, text) => {
        if (word && text) return text.indexOf(word) > -1;
        return false;
    },
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
    getFileName: (fullName) => fullName.split('\\').pop(),
    checkParams: (params) => {
        console.log(params);
        const keys = Object.keys(params);
        let result = { validated: true, message: null };
        if (keys.indexOf('userId') > -1 && !params['userId']) {
            result.validated = false;
            result.message = '아이디를 입력해주세요.';
        }
        if (keys.indexOf('memberId') > -1 && !params['memberId']) {
            result.validated = false;
            result.message = '아이디를 입력해주세요.';
        }
        if (keys.indexOf('reasonDetail') > -1 && !params['reasonDetail']) {
            result.validated = false;
            result.message = '사유를 입력해주세요.';
        }
        if (keys.indexOf('reasonType') > -1 && !params['reasonType']) {
            result.validated = false;
            result.message = '사유를 선택해주세요.';
        }
        return result;
    },
};