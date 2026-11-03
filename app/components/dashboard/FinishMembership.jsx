import { useState } from "react";
import FormInput from "../FormInput";
import PrimaryButton from "../PrimaryButton";
import SelectInput from "../SelectInput";
import OptionsStep from "../join/OptionsStep";
import { MEMBER_TYPES, MENTOR_OPTIONS } from "../../data/joinOptions";
import { saveProfile, startMembership } from "../../auth/memberData";
import { tierLabel } from "../../utils/memberDisplay";
import validateJoinStep from "../../utils/validateJoinStep";

const TIERS = [
    { title: "Ambassador", description: "12-month membership" },
    { title: "Ambassador Plus", description: "12-month membership" },
    { title: "Student", description: "Free. Needs a school email ending in .edu" },
];

// Shown on the dashboard when the membership or the member profile was never saved, for example
// because the server was unreachable right after sign-up. It saves only what is missing, so a second
// try never hits "you already have a membership".
export default function FinishMembership({ user, membership, profile, onSaved }) {
    const isSchoolEmail = user.email.toLowerCase().endsWith(".edu");
    const availableTiers = TIERS.filter((tier) => tier.title !== "Student" || isSchoolEmail);

    // Stays true once the membership has been saved, even if the profile fails afterwards.
    const [membershipDone, setMembershipDone] = useState(Boolean(membership));
    const [formData, setFormData] = useState({
        tier: membership ? tierLabel(membership.tier) : (isSchoolEmail ? "Student" : "Ambassador"),
        memberType: "",
        organization: "",
        wantsMentor: false,
        options: [],
        consent: false,
        listing: false,
    });
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const isStudent = formData.tier === "Student";

    function updateField(name, value) {
        setFormData((current) => ({ ...current, [name]: value }));
    }

    function selectTier(tier) {
        // Each tier has different options, so start the options over.
        setFormData((current) => ({ ...current, tier, options: [], wantsMentor: false, listing: false }));
    }

    function toggleOption(option) {
        setFormData((current) => ({
            ...current,
            options: current.options.includes(option)
                ? current.options.filter((item) => item !== option)
                : [...current.options, option],
        }));
    }

    function changeWantsMentor(wantsMentor) {
        // Hiding the mentee list also clears what was picked in it (the options shared with the mentor list stay).
        setFormData((current) => ({
            ...current,
            wantsMentor,
            options: wantsMentor
                ? current.options
                : current.options.filter((option) => MENTOR_OPTIONS.includes(option)),
        }));
    }

    function validate() {
        if (profile) return "";

        const organization = formData.organization.trim();
        if (!organization) return "Please enter your school, employer or organization.";
        if (organization.length > 150) return "Organization must be 150 characters or fewer.";
        if (!isStudent && !formData.memberType) return "Please select what type of member you are.";
        return validateJoinStep("Options", formData);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const message = validate();
        if (message) {
            setError(message);
            return;
        }

        setError("");
        setSubmitting(true);
        try {
            if (!membershipDone) {
                await startMembership(formData.tier);
                setMembershipDone(true);
            }
            if (!profile) {
                await saveProfile(formData);
            }
            await onSaved();
        } catch (apiError) {
            setError(apiError.message);
        } finally {
            setSubmitting(false);
        }
    }

    return(
        <section className="mb-8 rounded-lg border border-t-[3px] border-[#D9DFE9] border-t-[#E8A200] bg-white px-5 py-5">
            <h2 className="mb-1.5 text-[18px] font-normal font-[Georgia] text-[#0B2545]">
                Finish your membership
            </h2>
            <p className="mb-5 max-w-xl text-sm text-[#5D6B82]">
                Your account is ready, but your {membership ? "member details were" : "membership was"} not saved.
                {" "}Fill in what is missing below.
            </p>

            <form onSubmit={handleSubmit} className="max-w-xl" noValidate>
                {!membershipDone && (
                    <fieldset className="mb-2">
                        <legend className="mb-2 text-sm font-semibold text-[#0B2545]">Membership tier</legend>
                        <div className="flex flex-col gap-2">
                            {availableTiers.map((tier) => (
                                <label
                                    key={tier.title}
                                    className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 text-sm
                                        ${formData.tier === tier.title
                                            ? "border-[#0B2545] bg-[#F5F7FA]"
                                            : "border-[#D9DFE9]"}`}
                                >
                                    <input
                                        type="radio"
                                        name="tier"
                                        value={tier.title}
                                        checked={formData.tier === tier.title}
                                        onChange={() => selectTier(tier.title)}
                                        disabled={submitting}
                                        className="mt-0.5 accent-[#0B2545]"
                                    />
                                    <span>
                                        <strong className="text-[#0B2545]">{tier.title}</strong>
                                        <small className="block text-[12.5px] text-[#5D6B82]">{tier.description}</small>
                                    </span>
                                </label>
                            ))}
                        </div>
                    </fieldset>
                )}

                {!profile && (
                    <>
                        <div className="mt-5 flex flex-col gap-4.5">
                            {!isStudent && (
                                <SelectInput
                                    label="I am a"
                                    name="memberType"
                                    value={formData.memberType}
                                    onChange={(event) => updateField("memberType", event.target.value)}
                                    options={MEMBER_TYPES}
                                />
                            )}
                            <FormInput
                                label={isStudent ? "School" : "Employer or organization"}
                                name="organization"
                                value={formData.organization}
                                onChange={(event) => updateField("organization", event.target.value)}
                                autoComplete="organization"
                            />
                        </div>

                        <OptionsStep
                            formData={formData}
                            onToggleOption={toggleOption}
                            onFieldChange={updateField}
                            onWantsMentorChange={changeWantsMentor}
                        />
                    </>
                )}

                {error && (
                    <p role="alert" className="mt-4 text-sm text-[#b3261e]">{error}</p>
                )}

                <PrimaryButton type="submit" disabled={submitting} className="mt-6">
                    {submitting ? "Saving..." : "Save my membership"}
                </PrimaryButton>
            </form>
        </section>
    );
}
