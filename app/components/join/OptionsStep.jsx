import CheckboxOption from "../CheckboxOption";
import OptionList from "../OptionList";
import StepHeader from "../StepHeader";
import { MENTEE_OPTIONS, MENTOR_OPTIONS } from "../../data/joinOptions";

export default function OptionsStep({
    formData,
    onToggleOption,
    onFieldChange,
    onWantsMentorChange,
}) {
    const isStudent = formData.tier === "Student";
    const showMenteeOptions = isStudent || formData.wantsMentor;

    const renderCheckboxes = (list) => list.map((option) => (
        <CheckboxOption
            key={option}
            label={option}
            checked={formData.options.includes(option)}
            onChange={() => onToggleOption(option)}
        />
    ));

    return(
        <div>
            <StepHeader
                title="Options"
                description="Check anything you would like. You can change these later."
            />

            {!isStudent && (
                <>
                    <OptionList title="Mentors and speakers">
                        {renderCheckboxes(MENTOR_OPTIONS)}
                    </OptionList>
                    <div className="mt-2">
                        <CheckboxOption
                            label="I would also like a mentor"
                            checked={formData.wantsMentor}
                            onChange={onWantsMentorChange}
                        />
                    </div>
                </>
            )}

            {showMenteeOptions && (
                <OptionList title="Students and anyone who wants a mentor">
                    {renderCheckboxes(MENTEE_OPTIONS)}
                </OptionList>
            )}

            <OptionList title="Permissions">
                <CheckboxOption
                    label="I agree to be contacted and introduced."
                    hint="Required to complete your membership."
                    checked={formData.consent}
                    onChange={(checked) => onFieldChange("consent", checked)}
                />
                {!isStudent && (
                    <CheckboxOption
                        label="List me on the Ambassador page."
                        hint="Optional. Your name will appear on the Elevation Center website."
                        checked={formData.listing}
                        onChange={(checked) => onFieldChange("listing", checked)}
                    />
                )}
            </OptionList>
        </div>
    );
}
