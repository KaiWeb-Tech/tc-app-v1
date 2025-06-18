export default function decodeAndCheckToken(token: string|null) {
    try {
        if (token) {
            const base64Url = token?.split('.')[1];
            const base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
            const decoded = JSON.parse(atob(base64!));

            if (decoded && decoded.exp) {
                const expirationDate = new Date(decoded.exp * 1000);
                const currentDate = new Date();

                return expirationDate >= currentDate;
            } else {
                console.log('Token invalide ou sans date d\'expiration');
                return false;
            }
        }
    } catch (e) {
        console.error('Erreur lors du décodage du token', e);
        return false;
    }
}
