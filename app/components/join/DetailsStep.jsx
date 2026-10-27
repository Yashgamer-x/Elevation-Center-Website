import FormInput from "../FormInput";
import SelectInput from "../SelectInput";
import StepHeader from "../StepHeader";
import { MEMBER_TYPES } from "../../data/joinOptions";

export default function DetailsStep({ formData, onChange }) {
    const isStudent = formData.tier === "Student";

    return(
        <div>
            <StepHeader
                title="Your details"
                description={
                    isStudent
                        ? "Students join free with a school email. We will send a link to verify it."
                        : "Tell us a little about yourself."
                }
            />

            <div className="flex flex-col gap-4.5">
                <div className="grid grid-cols-2 gap-3.5">
                    <FormInput
                        label="First name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={onChange}
                        autoComplete="given-name"
                    />
                    <FormInput
                        label="Last name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={onChange}
                        autoComplete="family-name"
                    />
                </div>

                <FormInput
                    label={isStudent ? "School email" : "Email address"}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={onChange}
                    placeholder={isStudent ? "name@school.edu" : ""}
                    autoComplete="email"
                />

                {!isStudent && (
                    <SelectInput
                        label="I am a"
                        name="memberType"
                        value={formData.memberType}
                        onChange={onChange}
                        options={MEMBER_TYPES}
                    />
                )}

                <FormInput
                    label={isStudent ? "School" : "Employer or organization"}
                    name="organization"
                    value={formData.organization}
                    onChange={onChange}
                    autoComplete="organization"
                />

                <FormInput
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={onChange}
                    placeholder="At least 10 characters"
                    autoComplete="new-password"
                />
            </div>
        </div>
    );
}
