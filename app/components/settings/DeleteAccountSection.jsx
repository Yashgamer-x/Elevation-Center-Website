import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { deleteAccount } from "../../auth/session";

export default function DeleteAccountSection({ email }) {
    const navigate = useNavigate();
    const passwordRef = useRef(null);
    const [confirming, setConfirming] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // Put the cursor in the password field when the confirmation opens.
    useEffect(() => {
        if (confirming) passwordRef.current?.focus();
    }, [confirming]);

    function cancel() {
        setConfirming(false);
        setPassword("");
        setError("");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (!password.trim()) {
            setError("Enter your password to confirm.");
            return;
        }

        setSubmitting(true);
        try {
            await deleteAccount(password);
            navigate("/", { replace: true, state: { accountDeleted: true } });
        } catch (apiError) {
            // 401: the session ended on its own, so there is nothing left to delete here.
            if (apiError.status === 401) {
                navigate("/", { replace: true });
                return;
            }
            // 403: wrong password. The session is still valid, so the form stays open.
            setError(apiError.message);
            setSubmitting(false);
        }
    }

    return(
        <section className="rounded-lg border border-[#b3261e]/40 bg-white px-5 py-4.5">
            <h2 className="mb-1.5 text-[15px] font-semibold text-[#b3261e]">Delete account</h2>
            <p className="mb-4 max-w-xl text-sm text-[#5D6B82]">
                This permanently deletes the account for <strong className="text-[#16233B]">{email}</strong> and
                signs you out. It cannot be undone. You can register again with the same email later.
            </p>

            {!confirming ? (
                <button
                    type="button"
                    onClick={() => setConfirming(true)}
                    className="cursor-pointer rounded-lg border border-[#b3261e] px-5 py-2.5 text-sm font-semibold text-[#b3261e] hover:bg-[#b3261e]/5"
                >
                    Delete my account
                </button>
            ) : (
                <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4" noValidate>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="deletePassword" className="text-sm font-semibold text-[#162338]">
                            Confirm with your password
                        </label>
                        <input
                            id="deletePassword"
                            name="password"
                            type="password"
                            ref={passwordRef}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="current-password"
                            disabled={submitting}
                            className="w-full rounded-lg border border-[#D9DFE9] bg-white px-4 py-3 text-[#16233B] outline-none transition-colors duration-200 focus:border-[#b3261e] focus:ring-2 focus:ring-[#b3261e]/20 disabled:opacity-50"
                        />
                    </div>

                    {error && (
                        <p role="alert" className="text-sm text-[#b3261e]">{error}</p>
                    )}

                    <div className="flex flex-wrap gap-3">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="cursor-pointer rounded-lg bg-[#b3261e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#8f1f19] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {submitting ? "Deleting..." : "Permanently delete account"}
                        </button>
                        <button
                            type="button"
                            onClick={cancel}
                            disabled={submitting}
                            className="cursor-pointer rounded-lg border border-[#0B2545] bg-white px-5 py-2.5 text-sm font-semibold text-[#0B2545] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </section>
    );
}
