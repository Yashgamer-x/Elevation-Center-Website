export default function SelectInput({
    label,
    name,
    value,
    onChange,
    options,
    placeholder = "Select one",
}) {
    return(
        <div className="flex flex-col gap-2">
            <label
                htmlFor={name}
                className="text-sm font-semibold text-[#162338]"
            >
                {label}
            </label>

            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full rounded-lg border border-[#D9DFE9] bg-white px-4 py-3 text-[#16233B] outline-none transition-colors duration-200 focus:border-[#13386B] focus:ring-2 focus:ring-[#13386B]/20"
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}
