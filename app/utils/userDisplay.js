// Turns the fields of GET /api/v1/users/me into text for the pages.

const ROLE_NAMES = { ROLE_USER: "Member", ROLE_ADMIN: "Administrator" };

export const formatDate = (value) => (value ? new Date(value).toLocaleString() : "Unknown");

export const roleNames = (roles) => roles.map((role) => ROLE_NAMES[role] ?? role).join(", ");

export function accountStatus(user) {
    if (!user.enabled) return "Disabled";
    if (!user.accountNonLocked) return "Locked";
    return "Active";
}
