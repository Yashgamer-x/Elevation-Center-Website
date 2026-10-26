export default function FormInput({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder = "",
    autoComplete,
    required = false,
}) {
    return(
        <div className="flex flex-col gap-2">
            <label 
                htmlFor={name}
                className="text-sm font-semibold text-[#162338]"
            >
                {label}
            </label>

            <input 
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete={autoComplete}
            required={required}
            className="w-full rounded-lg border border-[#D9DFE9] bg-white px-4 py-3 text-[#16233B] outline-none transition-colors duration-200 focus:border-[#13386B] focus:ring-2 focus:ring-[#13386B]/20" />
        </div>
    );
}