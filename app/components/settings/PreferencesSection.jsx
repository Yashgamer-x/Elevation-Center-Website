import { useState } from "react";
import CheckboxOption from "../CheckboxOption";
import OptionList from "../OptionList";
import PrimaryButton from "../PrimaryButton";
import { MENTEE_OPTIONS, MENTOR_OPTIONS } from "../../data/joinOptions";
import { updatePreferences } from "../../auth/memberData";
import { optionLabels } from "../../utils/memberDisplay";

const sameItems = (a, b) => a.length === b.length && a.every((item) => b.includes(item));

// Lets a member change the options they checked when they joined, and whether they are listed on the
// Ambassador page. It saves with PATCH, so nothing else in the profile is touched.
export default function PreferencesSection({ profile, membership, onSaved }) {
    // Students only get the mentee options and are not offered the Ambassador page listing.
    const isStudent = membership ? membership.tier === "STUDENT" : profile.memberType === "STUDENT";

    const savedOptions = optionLabels(profile.options);
    const [options, setOptions] = useState(savedOptions);
    const [wantsMentor, setWantsMentor] = useState(() =>
        savedOptions.some((option) => MENTEE_OPTIONS.includes(option) && !MENTOR_OPTIONS.includes(option))
    );
    const [listing, setListing] = useState(profile.listingConsent);
    const [error, setError] = useState("");
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    const showMenteeOptions = isStudent || wantsMentor;
    const changed = !sameItems(options, savedOptions) || (!isStudent && listing !== profile.listingConsent);

    function edited(change) {
        setSaved(false);
        setError("");
        change();
    }

    function toggleOption(option) {
        edited(() => setOptions((current) =>
            current.includes(option) ? current.filter((item) => item !== option) : [...current, option]
        ));
    }

    function changeWantsMentor(checked) {
        edited(() => {
            setWantsMentor(checked);
            // Hiding the mentee list also clears what was picked in it (the options shared with the mentor list stay).
            if (!checked) setOptions((current) => current.filter((option) => MENTOR_OPTIONS.includes(option)));
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setSaved(false);
        setSaving(true);

        try {
            await updatePreferences({
                options,
                listingConsent: isStudent ? undefined : listing,
            });
            await onSaved();
            setSaved(true);
        } catch (apiError) {
            setError(apiError.message);
        } finally {
            setSaving(false);
        }
    }

    const renderCheckboxes = (list) => list.map((option) => (
        <CheckboxOption
            key={option}
            label={option}
            checked={options.includes(option)}
            onChange={() => toggleOption(option)}
        />
    ));

    return(
        <section className="rounded-lg border border-t-[3px] border-[#D9DFE9] border-t-[#E8A200] bg-white px-5 py-4.5">
            <h2 className="mb-1.5 text-[15px] font-semibold text-[#0B2545]">Your preferences</h2>
            <p className="mb-1 max-w-xl text-sm text-[#5D6B82]">
                Change what you would like from the Elevation Center. This does not change your membership.
            </p>

            <form onSubmit={handleSubmit} className="max-w-xl">
                {!isStudent && (
                    <>
                        <OptionList title="Mentors and speakers">
                            {renderCheckboxes(MENTOR_OPTIONS)}
                        </OptionList>
                        <div className="mt-2">
                            <CheckboxOption
                                label="I would also like a mentor"
                                checked={wantsMentor}
                                onChange={changeWantsMentor}
                            />
                        </div>
                    </>
                )}

                {showMenteeOptions && (
                    <OptionList title="Students and anyone who wants a mentor">
                        {renderCheckboxes(MENTEE_OPTIONS)}
                    </OptionList>
                )}

                {!isStudent && (
                    <OptionList title="Ambassador page">
                        <CheckboxOption
                            label="List me on the Ambassador page."
                            hint="Optional. Your name will appear on the Elevation Center website."
                            checked={listing}
                            onChange={(checked) => edited(() => setListing(checked))}
                        />
                    </OptionList>
                )}

                {error && (
                    <p role="alert" className="mt-4 text-sm text-[#b3261e]">{error}</p>
                )}
                {saved && (
                    <p role="status" className="mt-4 text-sm text-[#17703f]">Your preferences were saved.</p>
                )}

                <PrimaryButton type="submit" disabled={saving || !changed} className="mt-5">
                    {saving ? "Saving..." : "Save preferences"}
                </PrimaryButton>
            </form>
        </section>
    );
}
