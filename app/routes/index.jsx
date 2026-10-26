import BrandPanel from "../components/BrandPanel";
import SignIn from "./signin";

export default function Home() {
    return(
        <main className="flex min-h-screen flex-col min-[901px]:flex-row">
            <BrandPanel className="min-[901px]:flex-11"/>

            <section className="flex min-[901px]:flex-20 justify-center px-6 py-14 min-[901px]:px-6">
                <div className="w-full">
                    <p className="text-[#5D6B82]">
                        <SignIn/>
                    </p>
                </div>
            </section>
        </main>
    )
}