import { useLocation } from "react-router";
import BrandPanel from "../components/BrandPanel";
import Authentication from "./signin";

export default function Home() {
    // Set by the settings page after the account was deleted.
    const accountDeleted = useLocation().state?.accountDeleted;

    return(
        <main className="flex min-h-screen flex-col min-[901px]:flex-row">
            <BrandPanel className="min-[901px]:flex-11"/>

            <section className="flex min-[901px]:flex-20 flex-col items-center gap-6 px-6 py-14 min-[901px]:px-6">
                {accountDeleted && (
                    <p
                        role="status"
                        className="w-full max-w-155 rounded-md border border-[#D9DFE9] border-l-[3px] border-l-[#17703f] bg-[#F5F7FA] px-4 py-3 text-sm text-[#16233B]"
                    >
                        Your account has been deleted. You can register again at any time.
                    </p>
                )}
                <Authentication/>
            </section>
        </main>
    )
}
