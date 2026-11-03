import { Link } from "react-router";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import InfoCard, { InfoRow } from "../components/dashboard/InfoCard";
import MembershipCard from "../components/dashboard/MembershipCard";
import ProfileCard from "../components/dashboard/ProfileCard";
import DeleteAccountSection from "../components/settings/DeleteAccountSection";
import PreferencesSection from "../components/settings/PreferencesSection";
import useCurrentUser from "../auth/useCurrentUser";
import { accountStatus, formatDate, roleNames } from "../utils/userDisplay";

export default function Settings() {
    const { user, membership, profile, error, reload } = useCurrentUser();

    return(
        <DashboardLayout user={user} error={error} onRetry={reload}>
            {user && (
                <>
                    <Link to="/dashboard" className="mb-4 inline-block text-sm text-[#13386B] hover:underline">
                        &larr; Back to dashboard
                    </Link>
                    <h1 className="mb-1.5 text-3xl font-normal font-[Georgia] text-[#0B2545]">
                        Settings
                    </h1>
                    <p className="mb-8 text-[#5D6B82]">
                        Your account information and options.
                    </p>

                    <div className="flex max-w-2xl flex-col gap-5">
                        <InfoCard title="Your information">
                            <InfoRow label="First name" value={user.firstName}/>
                            <InfoRow label="Last name" value={user.lastName}/>
                            <InfoRow label="Email" value={user.email}/>
                            <InfoRow label="Role" value={roleNames(user.roles)}/>
                            <InfoRow label="Status" value={accountStatus(user)}/>
                            <InfoRow label="Member since" value={formatDate(user.createdAt)}/>
                            <InfoRow label="Last updated" value={formatDate(user.updatedAt)}/>
                        </InfoCard>

                        <MembershipCard membership={membership}/>

                        <ProfileCard profile={profile} hidePreferences/>

                        {profile ? (
                            <PreferencesSection profile={profile} membership={membership} onSaved={reload}/>
                        ) : (
                            <InfoCard
                                title="Your preferences"
                                emptyText="Finish your membership on the dashboard first, then you can set your preferences here."
                            />
                        )}

                        <DeleteAccountSection email={user.email}/>
                    </div>
                </>
            )}
        </DashboardLayout>
    );
}
