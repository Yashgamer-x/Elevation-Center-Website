export default function DashboardHeader({ userEmail, onSignOut, signingOut = false }) {
    return(
        <header className="flex items-center justify-between gap-4 bg-[#0B2545] px-6 py-4 text-white">
            <div className="flex flex-col gap-1">
                <span className="font-serif text-[15px] font-semibold leading-tight">
                    The Elevation Center
                </span>
                <span className="text-xs uppercase tracking-[0.12em] text-white/65">
                    University of New Haven
                </span>
            </div>

            <div className="flex items-center gap-4">
                {userEmail && (
                    <span className="hidden text-sm text-white/80 sm:inline">{userEmail}</span>
                )}
                <button
                    onClick={onSignOut}
                    disabled={signingOut}
                    className="rounded-md border border-white/40 px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {signingOut ? "Signing out..." : "Sign out"}
                </button>
            </div>
        </header>
    );
}
