
export const StorageUtils = {
    getAuth: () => {
        try {
            const auth = JSON.parse(localStorage.getItem('auth'));
            return {
                grantType: auth.grantType,
                accessToken: auth.accessToken
            };
        } catch (e) {
            console.log(e);
        }
        return {};
    },
    getId: () => localStorage.getItem('id'),
    getName: () => localStorage.getItem('name'),
    isAuthorized: () => {
        try {
            return Boolean(JSON.parse(localStorage.getItem('auth'))).valueOf();
        } catch (e) {
            console.log(e);
        }
        return false;
    }
};