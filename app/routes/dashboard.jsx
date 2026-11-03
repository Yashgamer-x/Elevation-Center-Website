import { useLocation } from "react-router";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import FinishMembership from "../components/dashboard/FinishMembership";
import InfoCard, { InfoRow } from "../components/dashboard/InfoCard";
import MembershipCard from "../components/dashboard/MembershipCard";
import ProfileCard from "../components/dashboard/ProfileCard";
import useCurrentUser from "../auth/useCurrentUser";
import { accountStatus, formatDate, roleNames } from "../utils/userDisplay";

export default function Dashboard() {
    const { user, membership, profile, session, error, reload } = useCurrentUser();
    // Set by the join form when the account was created but the membership choices could not be saved.
    const joinError = useLocation().state?.joinError;

    return(
        <DashboardLayout user={user} error={error} onRetry={reload}>
            {user && (
                <>
                    {joinError && (!membership || !profile) && (
                        <p
                            role="alert"
                            className="mb-6 rounded-md border border-[#D9DFE9] border-l-[3px] border-l-[#b3261e] bg-white px-4 py-3 text-sm text-[#16233B]"
                        >
                            Your account was created, but your membership details could not be saved: {joinError}
                        </p>
                    )}

                    <h1 className="mb-1.5 text-3xl font-normal font-[Georgia] text-[#0B2545]">
                        Welcome, {user.firstName}
                    </h1>
                    <p className="mb-8 text-[#5D6B82]">
                        You are signed in to your Elevation Center account.
                    </p>

                    {(!membership || !profile) && (
                        <FinishMembership
                            user={user}
                            membership={membership}
                            profile={profile}
                            onSaved={reload}
                        />
                    )}

                    <div className="grid gap-5 md:grid-cols-2">
                        <InfoCard title="Your account">
                            <InfoRow label="Name" value={`${user.firstName} ${user.lastName}`}/>
                            <InfoRow label="Email" value={user.email}/>
                            <InfoRow label="Role" value={roleNames(user.roles)}/>
                            <InfoRow label="Status" value={accountStatus(user)}/>
                            <InfoRow label="Member since" value={formatDate(user.createdAt)}/>
                        </InfoCard>

                        <MembershipCard membership={membership}/>

                        <ProfileCard profile={profile}/>

                        <InfoCard title="Your session">
                            <InfoRow label="Signed in" value={formatDate(session?.signedInAt)}/>
                            <InfoRow label="Access expires" value={formatDate(session?.expiresAt)}/>
                            <InfoRow label="Renewal" value="Automatic, while you stay signed in"/>
                        </InfoCard>
                    </div>
                </>
            )}
        </DashboardLayout>
    );
}
