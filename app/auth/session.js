import { login, refreshToken, register } from "../api/authApi";
import { ApiError, request } from "../api/request";
import {
    clearTokens,
    getProfile,
    getTokens,
    isTokenExpired,
    readTokenClaims,
    saveProfile,
    saveTokens,
} from "./tokenStorage";

export async function signIn(email, password) {
    const tokens = await login(email.trim(), password);
    saveTokens(tokens);
}

export async function signUp({ firstName, lastName, email, password }) {
    const profile = await register({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
    });

    // Registering does not return tokens, so sign in right away.
    try {
        await signIn(email, password);
    } catch (error) {
        throw new ApiError(
            "Your account was created, but we could not sign you in. Please use the Sign in tab.",
            error.status
        );
    }

    saveProfile({
        firstName: profile?.firstName ?? firstName.trim(),
        lastName: profile?.lastName ?? lastName.trim(),
        email: profile?.email ?? email.trim(),
    });
}

// Who is signed in, read from the access token (plus the name saved at sign up).
// Returns null when nobody is signed in.
export function getCurrentUser() {
    const tokens = getTokens();
    const claims = tokens?.accessToken ? readTokenClaims(tokens.accessToken) : null;
    if (!claims) return null;

    const profile = getProfile();
    const knownProfile = profile?.email?.toLowerCase() === claims.sub?.toLowerCase() ? profile : null;

    return {
        email: claims.sub,
        roles: claims.roles ?? [],
        firstName: knownProfile?.firstName ?? null,
        lastName: knownProfile?.lastName ?? null,
        signedInAt: claims.iat ? new Date(claims.iat * 1000) : null,
        expiresAt: claims.exp ? new Date(claims.exp * 1000) : null,
    };
}

export async function signOut() {
    try {
        await authRequest("/api/v1/auth/logout", { method: "POST" });
    } catch {
        // Even if the server call fails, this browser still forgets the user.
    }
    clearTokens();
}

// --- Refresh token -------------------------------------------------------

let refreshing = null; // shared so two requests never refresh at the same time

// Trades the refresh token for new tokens. Returns the new access token.
export function refreshSession() {
    if (!refreshing) {
        refreshing = refresh().finally(() => {
            refreshing = null;
        });
    }
    return refreshing;
}

async function refresh() {
    const current = getTokens();
    if (!current?.refreshToken) throw new ApiError("Please sign in again.", 401);

    try {
        const tokens = await refreshToken(current.refreshToken);
        saveTokens({ ...current, ...tokens });
        return tokens.accessToken;
    } catch (error) {
        // The server said no (expired, locked, disabled), so sign in again.
        // A network error keeps the tokens so the user can try again later.
        if (error.status >= 400 && error.status < 500) clearTokens();
        throw error;
    }
}

// Returns an access token that is still valid, refreshing it first if needed.
async function getValidAccessToken() {
    const tokens = getTokens();
    if (!tokens?.accessToken) throw new ApiError("Please sign in.", 401);

    if (isTokenExpired(tokens.accessToken)) return refreshSession();
    return tokens.accessToken;
}

// Throws unless the user is signed in. Used to protect pages.
export async function ensureSignedIn() {
    await getValidAccessToken();
}

// --- Calls that need a signed in user -------------------------------------

function authHeader(accessToken) {
    const tokenType = getTokens()?.tokenType || "Bearer";
    return `${tokenType} ${accessToken}`;
}

// Use this instead of request() for any endpoint that needs the access token.
// If the server rejects the token (401), it refreshes once and tries again.
export async function authRequest(path, options = {}) {
    const accessToken = await getValidAccessToken();

    try {
        return await request(path, { ...options, authorization: authHeader(accessToken) });
    } catch (error) {
        if (error.status !== 401) throw error;

        const newAccessToken = await refreshSession();
        return request(path, { ...options, authorization: authHeader(newAccessToken) });
    }
}
