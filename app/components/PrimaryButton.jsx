export default function PrimaryButton({ 
    children, 
    onClick, 
    disabled = false,
    className = "",
    type = "button",
}) {
    return(
        <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`rounded-lg bg-[#0B2545] px-6 py-3 font-semibold text-white transition-[background-color] duration-300 ease-in-out enabled:hover:bg-[#133868] disabled:cursor-not-allowed disabled:opacity-50 disabled:transition-none ${className}`}>
            {children}
        </button>
    );   
}