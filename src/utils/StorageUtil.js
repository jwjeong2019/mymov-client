
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
};