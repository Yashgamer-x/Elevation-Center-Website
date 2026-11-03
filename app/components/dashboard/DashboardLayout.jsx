import { useState } from "react";
import { useNavigate } from "react-router";
import PrimaryButton from "../PrimaryButton";
import DashboardHeader from "./DashboardHeader";
import { signOut } from "../../auth/session";

// The frame every signed in page shares: header with the profile menu, then the page.
// While the user is loading nothing is shown; if loading fails, the error and a retry button replace the page.
export default function DashboardLayout({ user, error, onRetry, children }) {
    const navigate = useNavigate();
    const [signingOut, setSigningOut] = useState(false);

    async function handleSignOut() {
        setSigningOut(true);
        await signOut();
        navigate("/", { replace: true });
    }

    if (!user && !error) return null;

    return(
        <div className="min-h-screen bg-[#F5F7FA]">
            <DashboardHeader user={user} onSignOut={handleSignOut} signingOut={signingOut}/>

            <main className="mx-auto max-w-5xl px-6 py-10">
                {error ? (
                    <>
                        <p role="alert" className="mb-4 text-sm text-[#b3261e]">{error}</p>
                        <PrimaryButton onClick={onRetry}>Try again</PrimaryButton>
                    </>
                ) : children}
            </main>
        </div>
    );
}
