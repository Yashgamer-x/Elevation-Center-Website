import { useNavigate } from "react-router";
import PrimaryButton from "./PrimaryButton";


export default function BrandPanel() {
  const navigate = useNavigate()
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#F5F7FA] px-6">
      <div className="max-w-xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#E8A200]">
          The Elevation Center
        </p>

        <h1 className="text-4xl fold-bold tracking-tight text-[#0B2545] sm:text-5xl">
          Build your future with us.
        </h1>

        <p className="mt-5 text-lg leading-8 text-[#5D6882]">
          A place to learn, grow, and take the next step in your journey.
        </p>

        <PrimaryButton 
        className="mt-8" 
        onClick={()=> navigate("/signin")}>
          Get started
        </PrimaryButton>
      </div>
    </section>
  );
}
