import BrandPanel from "../components/BrandPanel";

export default function Home() {
    return(
        <main className="flex min-h-screen flex-col min-[901px]:flex-row min-[901px]:flex-">
            <BrandPanel/>

            <section className="flex justify-center px-6 py-14 min-[901px]:px-6">
            <div className="w-full">
                <p className="text-[#5D6B82]">
                The sign-in form will go here next.
                </p>
            </div>
            </section>
        </main>
    )
}