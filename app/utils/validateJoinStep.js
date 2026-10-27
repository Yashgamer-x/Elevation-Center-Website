const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Returns an error message for the given step, or "" when the step is fine.
export default function validateJoinStep(step, formData) {
    const isStudent = formData.tier === "Student";

    if (step === "Details") {
        const { firstName, lastName, email, memberType, organization, password } = formData;

        if (!firstName.trim() || !lastName.trim() || !organization.trim()) {
            return "Please fill in all the fields.";
        }
        if (!isStudent && !memberType) {
            return "Please select what type of member you are.";
        }
        if (!EMAIL_PATTERN.test(email.trim())) {
            return "Enter a valid email address.";
        }
        if (isStudent && !email.trim().toLowerCase().endsWith(".edu")) {
            return "Use your school email address, ending in .edu.";
        }
        if (password.length < 10) {
            return "Password must be at least 10 characters.";
        }
    }

    if (step === "Options" && !formData.consent) {
        return "Please agree to be contacted and introduced to continue.";
    }

    return "";
}
