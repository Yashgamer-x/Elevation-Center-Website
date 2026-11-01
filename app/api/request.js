import { API_BASE_URL } from "./config";

// Thrown for every failed call. status is 0 when the server could not be reached.
export class ApiError extends Error {
    constructor(message, status = 0) {
        super(message);
        this.status = status;
    }
}

// Sends one JSON request and returns the parsed JSON (or null when there is no body).
export async function request(path, { method = "GET", body, authorization } = {}) {
    const headers = {};
    if (body) headers["Content-Type"] = "application/json";
    if (authorization) headers.Authorization = authorization;

    let response;
    try {
        response = await fetch(`${API_BASE_URL}${path}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });
    } catch {
        throw new ApiError("Cannot reach the server. Please try again.");
    }

    // A 204 response (logout) has no body.
    const data = await response.json().catch(() => null);

    if (!response.ok) {
        // Failed validation comes back as { validationErrors: { field: message } }.
        const details = Object.values(data?.validationErrors ?? {}).join(" ");
        const message = details || data?.message || "Something went wrong. Please try again.";
        throw new ApiError(message, response.status);
    }

    return data;
}
