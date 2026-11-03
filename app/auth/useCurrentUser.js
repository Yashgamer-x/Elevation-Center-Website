import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchMembership, fetchProfile } from "./memberData";
import { ensureSignedIn, fetchCurrentUser, getSessionTimes } from "./session";

// Loads the signed in user for a page that needs one, with their membership and member profile
// (each is null until it has been saved). If the access token has expired, ensureSignedIn() gets a new
// one with the refresh token first. A 401 means the session is over, so the visitor goes back to the home page.
export default function useCurrentUser() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [membership, setMembership] = useState(null);
    const [profile, setProfile] = useState(null);
    const [session, setSession] = useState(null);
    const [error, setError] = useState("");

    async function load() {
        setError("");
        try {
            await ensureSignedIn();
            const [currentUser, currentMembership, currentProfile] = await Promise.all([
                fetchCurrentUser(),
                fetchMembership(),
                fetchProfile(),
            ]);
            setUser(currentUser);
            setMembership(currentMembership);
            setProfile(currentProfile);
            setSession(getSessionTimes());
        } catch (apiError) {
            if (apiError.status === 401) {
                navigate("/", { replace: true });
                return;
            }
            setError(apiError.message);
        }
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { user, membership, profile, session, error, reload: load };
}
