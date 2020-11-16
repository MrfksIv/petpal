const AUTH_URL = process.env.REACT_APP_AUTH_ENDPOINT!;

export function navigateToAuthPage() {
    window.location.assign(AUTH_URL);
}
