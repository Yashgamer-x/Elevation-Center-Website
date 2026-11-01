import { request } from "./request";

// One function per auth endpoint. They only talk to the server;
// saving tokens is done in auth/session.js.

export function register({ firstName, lastName, email, password }) {
    return request("/api/v1/auth/register", {
        method: "POST",
        body: { firstName, lastName, email, password },
    });
}

export function login(email, password) {
    return request("/api/v1/auth/login", {
        method: "POST",
        body: { email, password },
    });
}

export function refreshToken(refreshToken) {
    return request("/api/v1/auth/refresh-token", {
        method: "POST",
        body: { refreshToken },
    });
}
