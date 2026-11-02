import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import InfoCard, { InfoRow } from "../components/dashboard/InfoCard";
import PrimaryButton from "../components/PrimaryButton";
import { ensureSignedIn, fetchCurrentUser, getSessionTimes, signOut } from "../auth/session";

const ROLE_NAMES = { ROLE_USER: "Member", ROLE_ADMIN: "Administrator" };

const formatDate = (date) => (date ? date.toLocaleString() : "Unknown");

function accountStatus(user) {
    if (!user.enabled) return "Disabled";
    if (!user.accountNonLocked) return "Locked";
    return "Active";
}

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [error, setError] = useState("");
    const [signingOut, setSigningOut] = useState(false);

    // Only show the dashboard to a signed in user. If their access token has
    // expired, ensureSignedIn() gets a new one with the refresh token first.
    async function loadUser() {
        setError("");
        try {
            await ensureSignedIn();
            setUser(await fetchCurrentUser());
            setSession(getSessionTimes());
        } catch (apiError) {
            // 401 means the session is over (authRequest already tried to refresh it).
            if (apiError.status === 401) {
                navigate("/", { replace: true });
                return;
            }
            setError(apiError.message);
        }
    }

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleSignOut() {
        setSigningOut(true);
        await signOut();
        navigate("/", { replace: true });
    }

    if (error) {
        return(
            <div className="min-h-screen bg-[#F5F7FA]">
                <DashboardHeader onSignOut={handleSignOut} signingOut={signingOut}/>
                <main className="mx-auto max-w-5xl px-6 py-10">
                    <p role="alert" className="mb-4 text-sm text-[#b3261e]">{error}</p>
                    <PrimaryButton onClick={loadUser}>Try again</PrimaryButton>
                </main>
            </div>
        );
    }

    if (!user) return null;

    const roles = user.roles.map((role) => ROLE_NAMES[role] ?? role).join(", ");

    return(
        <div className="min-h-screen bg-[#F5F7FA]">
            <DashboardHeader userEmail={user.email} onSignOut={handleSignOut} signingOut={signingOut}/>

            <main className="mx-auto max-w-5xl px-6 py-10">
                <h1 className="mb-1.5 text-3xl font-normal font-[Georgia] text-[#0B2545]">
                    Welcome, {user.firstName}
                </h1>
                <p className="mb-8 text-[#5D6B82]">
                    You are signed in to your Elevation Center account.
                </p>

                <div className="grid gap-5 md:grid-cols-2">
                    <InfoCard title="Your account">
                        <InfoRow label="Name" value={`${user.firstName} ${user.lastName}`}/>
                        <InfoRow label="Email" value={user.email}/>
                        <InfoRow label="Role" value={roles}/>
                        <InfoRow label="Status" value={accountStatus(user)}/>
                        <InfoRow label="Member since" value={formatDate(new Date(user.createdAt))}/>
                    </InfoCard>

                    <InfoCard title="Your session">
                        <InfoRow label="Signed in" value={formatDate(session?.signedInAt)}/>
                        <InfoRow label="Access expires" value={formatDate(session?.expiresAt)}/>
                        <InfoRow label="Renewal" value="Automatic, while you stay signed in"/>
                    </InfoCard>
                </div>
            </main>
        </div>
    );
}
