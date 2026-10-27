import StepHeader from "../StepHeader";

function SummaryRow({ label, value }) {
    return(
        <div className="grid grid-cols-[150px_1fr] gap-3 px-4 py-2.5 text-sm">
            <dt className="text-[#5D6B82]">{label}</dt>
            <dd className="font-medium break-words">{value}</dd>
        </div>
    );
}

function InfoNote({ title, children }) {
    return(
        <div className="mt-4.5 rounded-md border border-l-[3px] border-[#D9DFE9] border-l-[#E8A200] bg-[#F5F7FA] px-4 py-3.5 text-[13.5px]">
            <strong className="text-[#0B2545]">{title}</strong> {children}
        </div>
    );
}

export default function ConfirmStep({ formData }) {
    const isStudent = formData.tier === "Student";
    const options = formData.options.length > 0
        ? formData.options.join(", ")
        : "None selected";

    return(
        <div>
            <StepHeader
                title={isStudent ? "Review and confirm" : "Review and payment"}
                description="Check your details before you finish."
            />

            <dl className="divide-y divide-[#D9DFE9] rounded-lg border border-[#D9DFE9]">
                <SummaryRow label="Membership" value={formData.tier} />
                <SummaryRow label="Name" value={`${formData.firstName} ${formData.lastName}`} />
                <SummaryRow label={isStudent ? "School email" : "Email"} value={formData.email} />
                <SummaryRow label={isStudent ? "School" : "Organization"} value={formData.organization} />
                {!isStudent && <SummaryRow label="Member type" value={formData.memberType} />}
                <SummaryRow label="Options" value={options} />
                <SummaryRow label="Contact and introductions" value="Agreed" />
                {!isStudent && (
                    <SummaryRow
                        label="Ambassador page"
                        value={formData.listing ? "Yes, list me" : "No, do not list me"}
                    />
                )}
            </dl>

            {isStudent ? (
                <InfoNote title="Free membership.">
                    No payment is needed. After you finish, we will email a link to verify your school email.
                </InfoNote>
            ) : (
                <InfoNote title="Payment.">
                    Online payment will open here once the University approves the payment path. Your registration is saved now, and we will email you instructions to pay your dues and activate your membership.
                </InfoNote>
            )}
        </div>
    );
}
