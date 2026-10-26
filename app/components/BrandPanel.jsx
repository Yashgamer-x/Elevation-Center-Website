import { useNavigate } from "react-router";
import PrimaryButton from "./PrimaryButton";

function Logo() {
  return(
    <svg
      width="38"
      height="38"
      viewBox="0 0 40 40"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect width="40" height="40" rx="6" fill="#E8A200" />
      <path
        d="M10 28l10-16 10 16M15 28l5-8 5 8"
        fill="none"
        stroke="#0B2545"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UniversityHeading() {
  return(
    <div className="flex flex-col gap-1">
      <span className="font-serif text-[15px] font-semibold leading-tight block">
        The Elevation Center
      </span>
      <span className="text-xs uppercase tracking-[0.12em] text-white/65 block">
        University of New Haven
      </span>
    </div>
  );
}

function Motto() {
  return(
    <h1 className="mt-14 hidden font-serif text-[34px] font-normal leading-tight min-[901px]:mb-[18px] min-[901px]:mt-auto min-[901px]:block">
      Elevating talent, technology, and innovation.
    </h1>
  );
}

function JoinNetworkDescription() {
  return(
    <p className="mb-9 hidden max-w-[400px] text-[#FFFFFF]/75 min-[901px]:block">
      Join a network of manufacturers, educators, and students connected
      through mentorship, introductions, and real-world collaboration.
    </p>
  );
}

function ElevateBenefitList() {
  const list = [
        ["Elevate Talent", "Skills and experience to lead"],
        ["Elevate Innovation", "Applied research, real solutions"],
        ["Elevate Partnership", "Industry, academia, government"],
        ["Elevate Impact", "Regional competitiveness"],
      ];
  
  const mappedList = list.map(([title, description]) => (
        <li
          key={title}
          className="flex justify-between gap-4 border-b border-[#FFFFFF]/15 py-[13px] text-sm"
        >
          <strong>{title}</strong>
          <span className="text-right text-[#FFFFFF]/60">
            {description}
          </span>
        </li>
      ));

  return(
    <ul className="mb-12 hidden list-none border-t border-[#FFFFFF]/15 p-0 min-[901px]:block">
      {mappedList}
    </ul>
  );
}

function AddressFooter() {
  return(
    <footer className="hidden text-[12.5px] text-[#FFFFFF]/55 min-[901px]:block">
      300 Boston Post Road, West Haven, CT 06516
    </footer>
  );
}

export default function BrandPanel({
  className=""
}) {
  return (
    <aside className={`flex flex-col bg-[#0B2545] px-6 py-6 text-[#FFFFFF] min-[901px]:px-[52px] min-[901px]:py-12 min-[901px]:max-w-[614px] ${className}`}>
      <div className="flex items-center gap-3 mb-13">
        <Logo/>
        <UniversityHeading/>
      </div>
        <Motto/>
        <JoinNetworkDescription/>
        <ElevateBenefitList/>
        <AddressFooter/>
    </aside>
  );
}
