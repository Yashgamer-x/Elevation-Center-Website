import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

function initials(user) {
    const letters = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`;
    return (letters || user.email[0]).toUpperCase();
}

export default function ProfileMenu({ user, onSignOut, signingOut = false }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    // Close on a click outside the menu or on Escape.
    useEffect(() => {
        if (!open) return;

        const onPointerDown = (event) => {
            if (!menuRef.current?.contains(event.target)) setOpen(false);
        };
        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                setOpen(false);
                buttonRef.current?.focus();
            }
        };

        document.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [open]);

    const name = [user.firstName, user.lastName].filter(Boolean).join(" ");

    return(
        <div ref={menuRef} className="relative">
            <button
                ref={buttonRef}
                type="button"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-haspopup="true"
                aria-label="Open profile menu"
                className="flex cursor-pointer items-center gap-2.5 rounded-md border border-white/40 py-1.5 pl-1.5 pr-3 text-sm font-semibold hover:bg-white/10"
            >
                <span
                    aria-hidden="true"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E8A200] text-xs font-bold text-[#0B2545]"
                >
                    {initials(user)}
                </span>
                <span className="hidden sm:inline">{user.firstName || user.email}</span>
                <span aria-hidden="true" className="text-[10px]">{open ? "▲" : "▼"}</span>
            </button>

            {open && (
                <div className="absolute right-0 top-full z-10 mt-2 w-64 overflow-hidden rounded-lg border border-[#D9DFE9] bg-white text-[#16233B] shadow-lg">
                    <div className="border-b border-[#D9DFE9] px-4 py-3">
                        {name && <p className="text-sm font-semibold">{name}</p>}
                        <p className="break-all text-[13px] text-[#5D6B82]">{user.email}</p>
                    </div>
                    <Link
                        to="/settings"
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2.5 text-sm hover:bg-[#F5F7FA]"
                    >
                        Settings
                    </Link>
                    <button
                        type="button"
                        onClick={onSignOut}
                        disabled={signingOut}
                        className="block w-full cursor-pointer border-t border-[#D9DFE9] px-4 py-2.5 text-left text-sm hover:bg-[#F5F7FA] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {signingOut ? "Signing out..." : "Sign out"}
                    </button>
                </div>
            )}
        </div>
    );
}
