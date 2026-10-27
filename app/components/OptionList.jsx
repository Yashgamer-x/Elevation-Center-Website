// A titled box that holds a group of CheckboxOption rows.
export default function OptionList({ title, children }) {
    return(
        <div className="mt-6">
            <h3 className="text-sm font-semibold text-[#0B2545]">{title}</h3>
            <div className="mt-2 divide-y divide-[#D9DFE9] rounded-lg border border-[#D9DFE9] px-4">
                {children}
            </div>
        </div>
    );
}
