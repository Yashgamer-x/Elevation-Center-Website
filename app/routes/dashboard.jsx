import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import InfoCard, { InfoRow } from "../components/dashboard/InfoCard";
import { ensureSignedIn, getCurrentUser, signOut } from "../auth/session";

const ROLE_NAMES = { ROLE_USER: "Member", ROLE_ADMIN: "Administrator" };

const formatDate = (date) => (date ? date.toLocaleString() : "Unknown");

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [signingOut, setSigningOut] = useState(false);

    // Only show the dashboard to a signed in user. If their access token has
    // expired, ensureSignedIn() gets a new one with the refresh token first.
    useEffect(() => {
        ensureSignedIn()
            .then(() => setUser(getCurrentUser()))
            .catch(() => navigate("/", { replace: true }));
    }, [navigate]);

    async function handleSignOut() {
        setSigningOut(true);
        await signOut();
        navigate("/", { replace: true });
    }

    if (!user) return null;

    const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
    const roles = user.roles.map((role) => ROLE_NAMES[role] ?? role).join(", ");

    return(
        <div className="min-h-screen bg-[#F5F7FA]">
            <DashboardHeader userEmail={user.email} onSignOut={handleSignOut} signingOut={signingOut}/>

            <main className="mx-auto max-w-5xl px-6 py-10">
                <h1 className="mb-1.5 text-3xl font-normal font-[Georgia] text-[#0B2545]">
                    {user.firstName ? `Welcome, ${user.firstName}` : "Welcome back"}
                </h1>
                <p className="mb-8 text-[#5D6B82]">
                    You are signed in to your Elevation Center account.
                </p>

                <div className="grid gap-5 md:grid-cols-2">
                    <InfoCard title="Your account">
                        {fullName && <InfoRow label="Name" value={fullName}/>}
                        <InfoRow label="Email" value={user.email}/>
                        {roles && <InfoRow label="Role" value={roles}/>}
                    </InfoCard>

                    <InfoCard title="Your session">
                        <InfoRow label="Signed in" value={formatDate(user.signedInAt)}/>
                        <InfoRow label="Access expires" value={formatDate(user.expiresAt)}/>
                        <InfoRow label="Renewal" value="Automatic, while you stay signed in"/>
                    </InfoCard>
                </div>
            </main>
        </div>
    );
}
