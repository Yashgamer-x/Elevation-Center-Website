// A single checkbox row. onChange receives true or false.
export default function CheckboxOption({ label, hint, checked, onChange }) {
    return(
        <label className="flex cursor-pointer items-start gap-2.5 py-2.5 text-sm">
            <input
                type="checkbox"
                checked={checked}
                onChange={(event) => onChange(event.target.checked)}
                className="mt-0.5 h-4.25 w-4.25 shrink-0 accent-[#0B2545]"
            />
            <span>
                {label}
                {hint && (
                    <small className="block text-[12.5px] text-[#5D6B82]">{hint}</small>
                )}
            </span>
        </label>
    );
}
