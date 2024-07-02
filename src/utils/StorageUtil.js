
export const StorageUtils = {
    getAuth: () => {
        try {
            const auth = JSON.parse(localStorage.getItem('auth'));
            return {
                grantType: auth.grantType,
                accessToken: auth.accessToken,
                refreshToken: auth.refreshToken
            };
        } catch (e) {
            console.log(e);
        }
        return {};
    },
    getId: () => localStorage.getItem('id'),
    getName: () => localStorage.getItem('name'),
    getRole: () => localStorage.getItem('role'),
    getImage: () => localStorage.getItem('image'),
    isAuthorized: () => {
        try {
            return Boolean(JSON.parse(localStorage.getItem('auth'))).valueOf();
        } catch (e) {
            console.log(e);
        }
        return false;
    },
    isRoleUser: () => localStorage.getItem('role').indexOf('USER') > -1,
    isRoleAdmin: () => localStorage.getItem('role').indexOf('ADMIN') > -1,
};