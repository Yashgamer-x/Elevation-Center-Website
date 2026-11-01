const STORAGE_KEY = "elevation.tokens";
const PROFILE_KEY = "elevation.profile";

// Stored as { accessToken, refreshToken, tokenType }.
export function getTokens() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
        return null; // nothing saved yet, or not running in a browser
    }
}

export function saveTokens(tokens) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
}

export function clearTokens() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PROFILE_KEY);
}

// The login response has no name, so the name given at sign up is kept here.
// Stored as { firstName, lastName, email }.
export function getProfile() {
    try {
        return JSON.parse(localStorage.getItem(PROFILE_KEY));
    } catch {
        return null;
    }
}

export function saveProfile(profile) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

// The access token is a JWT, so its claims (sub, roles, iat, exp) can be read
// from the payload. Returns null when the token cannot be read.
export function readTokenClaims(token) {
    try {
        const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(payload));
    } catch {
        return null;
    }
}

// Counts as expired 10 seconds early so it does not run out mid-request.
export function isTokenExpired(token) {
    const claims = readTokenClaims(token);
    if (!claims?.exp) return false; // not a readable JWT, so let the server decide
    return claims.exp * 1000 < Date.now() + 10_000;
}
