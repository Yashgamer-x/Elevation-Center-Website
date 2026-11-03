import { authRequest } from "./session";
import { MEMBER_TYPE_TO_API, OPTION_TO_API, TIER_TO_API } from "../data/joinOptions";

// The membership and member profile of the signed in user (GET /api/v1/users/me/membership and /profile).
// A 404 only means nothing has been saved yet, so these return null for it instead of throwing.
const nullWhenMissing = (error) => {
    if (error.status === 404) return null;
    throw error;
};

// { id, tier, status, startedAt, expiresAt, paidAt, createdAt, updatedAt }
export function fetchMembership() {
    return authRequest("/api/v1/users/me/membership").catch(nullWhenMissing);
}

// { id, memberType, organization, contactConsent, listingConsent, options, createdAt, updatedAt }
export function fetchProfile() {
    return authRequest("/api/v1/users/me/profile").catch(nullWhenMissing);
}

// Starts the membership: POST /api/v1/users/me/membership. The tier is the wording used on the form,
// for example "Ambassador Plus". Fails with a 409 if a membership is already in progress.
export function startMembership(tier) {
    return authRequest("/api/v1/users/me/membership", {
        method: "POST",
        body: { tier: TIER_TO_API[tier] },
    });
}

// Saves the profile: PUT /api/v1/users/me/profile. It replaces any profile saved before.
// formData is shaped like the join form: tier, memberType, organization, consent, listing, options.
export function saveProfile(formData) {
    const isStudent = formData.tier === "Student";

    return authRequest("/api/v1/users/me/profile", {
        method: "PUT",
        body: {
            // Students are not asked what type of member they are
            memberType: isStudent ? "STUDENT" : (MEMBER_TYPE_TO_API[formData.memberType] ?? null),
            organization: formData.organization.trim(),
            contactConsent: formData.consent,
            listingConsent: formData.listing,
            options: formData.options.map((option) => OPTION_TO_API[option]).filter(Boolean),
        },
    });
}

// Changes the member's options and, when given, the Ambassador page listing, and nothing else:
// PATCH /api/v1/users/me/profile. options is the complete list to keep, in the form's wording.
export function updatePreferences({ options, listingConsent }) {
    const body = { options: options.map((option) => OPTION_TO_API[option]).filter(Boolean) };
    if (listingConsent !== undefined) body.listingConsent = listingConsent;

    return authRequest("/api/v1/users/me/profile", { method: "PATCH", body });
}

// Sends everything the join form collected, once the account exists and is signed in.
export async function saveJoinChoices(formData) {
    await startMembership(formData.tier);
    await saveProfile(formData);
}
