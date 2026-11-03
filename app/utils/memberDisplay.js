import { MEMBER_TYPE_TO_API, OPTION_TO_API, TIER_TO_API } from "../data/joinOptions";

// Turns the membership and profile fields from the API back into the wording used on the join form.

const labelFor = (map, value) => Object.keys(map).find((label) => map[label] === value) ?? value;

const STATUS_LABELS = {
    PENDING_PAYMENT: "Waiting for payment",
    PENDING_VERIFICATION: "Waiting for school email verification",
    ACTIVE: "Active",
    LAPSED: "Lapsed",
};

export const tierLabel = (tier) => labelFor(TIER_TO_API, tier);

export const membershipStatusLabel = (status) => STATUS_LABELS[status] ?? status;

export const memberTypeLabel = (type) => (type ? labelFor(MEMBER_TYPE_TO_API, type) : "Not given");

export const optionLabels = (options) => options.map((option) => labelFor(OPTION_TO_API, option));
