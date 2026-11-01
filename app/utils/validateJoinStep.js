const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Same rule as the API: upper, lower, a number, and one of _ @ $ ! % * ? & -
// (no other characters are allowed).
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@$!%*?&-])[A-Za-z\d_@$!%*?&-]+$/;

const isBetween = (text, min, max) => text.length >= min && text.length <= max;

// Returns an error message for the given step, or "" when the step is fine.
export default function validateJoinStep(step, formData) {
    const isStudent = formData.tier === "Student";

    if (step === "Details") {
        const { firstName, lastName, email, memberType, organization, password } = formData;

        if (!firstName.trim() || !lastName.trim() || !organization.trim()) {
            return "Please fill in all the fields.";
        }
        if (!isBetween(firstName.trim(), 2, 50) || !isBetween(lastName.trim(), 2, 50)) {
            return "First and last name must be 2 to 50 characters.";
        }
        if (!isStudent && !memberType) {
            return "Please select what type of member you are.";
        }
        if (!EMAIL_PATTERN.test(email.trim())) {
            return "Enter a valid email address.";
        }
        if (email.trim().length > 100) {
            return "Email must be 100 characters or fewer.";
        }
        if (isStudent && !email.trim().toLowerCase().endsWith(".edu")) {
            return "Use your school email address, ending in .edu.";
        }
        if (!isBetween(password, 8, 72)) {
            return "Password must be 8 to 72 characters.";
        }
        if (!PASSWORD_PATTERN.test(password)) {
            return "Password needs an uppercase letter, a lowercase letter, a number, and one of _ @ $ ! % * ? & - (no other characters).";
        }
    }

    if (step === "Options" && !formData.consent) {
        return "Please agree to be contacted and introduced to continue.";
    }

    return "";
}
