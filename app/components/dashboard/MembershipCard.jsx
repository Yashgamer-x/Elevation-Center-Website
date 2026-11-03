import InfoCard, { InfoRow } from "./InfoCard";
import { membershipStatusLabel, tierLabel } from "../../utils/memberDisplay";
import { formatDate } from "../../utils/userDisplay";

// The start and renewal dates stay empty until the school email is verified or the dues are confirmed.
const dateOrWaiting = (value) => (value ? formatDate(value) : "Set once your membership starts");

export default function MembershipCard({ membership }) {
    if (!membership) {
        return <InfoCard title="Your membership" emptyText="You have not started a membership yet."/>;
    }

    const isStudent = membership.tier === "STUDENT";

    return(
        <InfoCard title="Your membership">
            <InfoRow label="Tier" value={tierLabel(membership.tier)}/>
            <InfoRow label="Status" value={membershipStatusLabel(membership.status)}/>
            <InfoRow label="Started" value={dateOrWaiting(membership.startedAt)}/>
            <InfoRow label="Renews on" value={dateOrWaiting(membership.expiresAt)}/>
            <InfoRow
                label="Dues"
                value={isStudent ? "Free" : (membership.paidAt ? `Paid ${formatDate(membership.paidAt)}` : "Not paid yet")}
            />
        </InfoCard>
    );
}
