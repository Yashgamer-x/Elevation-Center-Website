import InfoCard, { InfoRow } from "./InfoCard";
import { memberTypeLabel, optionLabels } from "../../utils/memberDisplay";

// hidePreferences leaves out the options and the Ambassador page listing, for a page that shows them
// in an editable form instead.
export default function ProfileCard({ profile, hidePreferences = false }) {
    if (!profile) {
        return <InfoCard title="About you" emptyText="You have not filled in your member details yet."/>;
    }

    const options = optionLabels(profile.options);

    return(
        <InfoCard title="About you">
            <InfoRow label="Member type" value={memberTypeLabel(profile.memberType)}/>
            <InfoRow label="Organization" value={profile.organization}/>
            {!hidePreferences && (
                <InfoRow
                    label="Options"
                    value={options.length === 0 ? "None selected" : (
                        <ul className="list-disc pl-4">
                            {options.map((option) => <li key={option}>{option}</li>)}
                        </ul>
                    )}
                />
            )}
            <InfoRow label="Contact" value={profile.contactConsent ? "Agreed to be contacted and introduced" : "Not agreed"}/>
            {!hidePreferences && (
                <InfoRow label="Ambassador page" value={profile.listingConsent ? "Listed" : "Not listed"}/>
            )}
        </InfoCard>
    );
}
