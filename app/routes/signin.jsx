import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";

function WelcomeHeading() {
    return(
        <h1 className="text-3xl font-normal text-[#0B2545] font-[Georgia] mb-1.5">
            Welcome back
        </h1>
    );
}

function SignInParagraph() {
    return(
        <p className="text-[#5D6B82] mb-7">
            Sign in to your Elevation Center account.
        </p>
    );
}

function FormInput({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder = "",
    autoComplete,
    required = false,
}) {
    return(
        <div className="flex flex-col gap-1.5">
            <label 
                htmlFor={name}
                className="text-sm font-semibold text-[#162338]"
            >
                {label}
            </label>

            <input 
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
                required={required}
                className="w-full rounded-lg border border-[#D9DFE9] bg-white px-4 py-3 text-[#16233B] outline-none transition-colors duration-200 focus:border-[#13386B] focus:ring-2 focus:ring-[#13386B]/20"
            />
        </div>
    );
}

function EmailFormInput({
    email, 
    onChange,
    required = false,
}) {
    return(
        <div className="flex flex-col gap-1.5">
            <label 
                htmlFor="email"
                className="text-sm font-semibold text-[#162338]"
            >
                Email
            </label>

            <input 
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={onChange}
                placeholder="Enter your email"
                autoComplete="email"
                required={required}
                className="w-full rounded-lg border border-[#D9DFE9] bg-white px-4 py-3 text-[#16233B] outline-none transition-colors duration-200 focus:border-[#13386B] focus:ring-2 focus:ring-[#13386B]/20"
            />
        </div>
    );
}

function PasswordFormInput({
    password, 
    onChange,
    required=false
}) {
    return(
        <div className="flex flex-col gap-1.5">
            <label 
                htmlFor="password"
                className="text-sm font-semibold text-[#162338]"
            >
                Password
            </label>

            <input 
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={onChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                required={required}
                className="w-full rounded-lg border border-[#D9DFE9] bg-white px-4 py-3 text-[#16233B] outline-none transition-colors duration-200 focus:border-[#13386B] focus:ring-2 focus:ring-[#13386B]/20"
            />
        </div>
    );
}

function JoinElevation() {
    return(
        <p className="mt-5.5 text-center text-[#5D6B82] text-[13px]">
            Not a member yet? <a href="" className="text-[#13386B] font-semibold decoration-solid hover:underline">Join the Elevation Center</a>
        </p>
    );
}

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        console.log("Email:", email);
        console.log("Password entered:", password.length > 0);
    }

    const onEmailChange = (event) => setEmail(event.target.value);
    const onPasswordChange = (event) => setPassword(event.target.value);

    return(
        <section className="w-full max-w-155">
            <WelcomeHeading/>
            <SignInParagraph/>

            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4.5">
                <EmailFormInput email={email} onChange={onEmailChange} required/>
                <PasswordFormInput password={password} onChange={onPasswordChange} required/>

                <PrimaryButton type="submit" className="mt-2 w-full">
                    Sign in
                </PrimaryButton>
            </form>
            <JoinElevation/>
        </section>
    );
}

function MembershipType({
    title,
    fee,
    description,
    className,
    selectedTitle,
    onClick,
}) {
    return(
        <button className={`text-left border border-solid rounded-lg px-4.5 py-4 
            border-t-[3px] hover:cursor-pointer
            ${
                selectedTitle === title? 
                "border-[#0b2545] border-t-[#e8a200] bg-[#f8fafd]": 
                "border-[#b9c3d3] border-t-[#b9c3d3]"
            }
            ${className}`}
            onClick={()=>onClick(title)}
        >
            <div className="text-[#0b2545] font-semibold text-[15px]">{title}</div>
            <div className="text-[26px] leading-[1.2] font-normal font-[Georgia,serif] text-[#0b2545] my-2.5 mb-0.5">{fee}</div>
            <div className="text-[12.5px] text-[#5d6b82]">{description}</div>
        </button>
    );
}

function ChooseMembershipStep({}) {
    const tiers = [
        {
            title: "Ambassador",
            fee: "$50",
            description: "12-month membership"
        },
        {
            title: "Ambassador Plus",
            fee: "$75",
            description: "12-month membership"
        },
        {
            title: "Student",
            fee: "Free",
            description: "School email required"
        }
    ];

    const [selectedTitle, setSelectedTab] = useState("Student");
    const memberShipTypeSelect = (title) => {
        console.log(`${title} member was selected`)
        setSelectedTab(title)
    };

    return(
        <div>
            <h2 className="mb-1.5 text-[28px] leading-[1.2] font-normal font-[Georgia,'Times_New_Roman',serif] text-[#0b2545]">
                Choose your membership
            </h2>
            <p className="mb-12 text-[#5d6b82]">
                Select the tier that fits you. Memberships run for 12 months from the date you join.
            </p>
            <div aria-label="Membership tier" className="flex gap-1.5">
                {
                    tiers.map((tier) =>(
                        <MembershipType
                            key={tier.title}
                            title={tier.title} 
                            fee={tier.fee} 
                            description={tier.description}
                            selectedTitle={selectedTitle}
                            onClick={memberShipTypeSelect}
                            className={`flex-1`}
                        />
                    ))
                }
            </div>
        </div>
    );
}

function Stepper({
    steps=[],
    activeStep,
    className=""
}) {
    
    return(
        <ol className={`flex list-none gap-1.5 ${className}`}>
            {
                steps.map((step)=> (
                    <li 
                        key={step}
                        className={`flex-1 text-[12px] font-semibold pt-2 border-t-3 border-solid 
                        ${activeStep === step? "text-[#0B2545] border-[#e8a200]": "border-[#D9DFE9] text-[#5D6B82]"}`}
                    >
                        {step}
                    </li>
                ))
            }
        </ol>
    );
}

function Join() {
    const [activeStep, setActiveStep] = useState("Tier");
    const steps = ["Tier", "Details", "Options", "Confirm"];


    return(
        <section className="w-full max-w-155">
            <Stepper steps={steps} activeStep={activeStep} className="mb-7.5"/>
            <ChooseMembershipStep/>
            <div className="flex justify-between mt-7.5 gap-3">
                <button className="bg-[#0b2545] text-white px-6.5 py-3 rounded-md cursor-pointer ml-auto">
                    Continue
                </button>
            </div>
        </section>
    );
}

export default function Authentication() {
    const [selectedTab, setSelectedTab] = useState("signin");


    return(
        <div className="flex flex-col items-center justify-start w-155 max-w-155">
            <div className="flex border-b min-w-full mb-7.5" role="tablist">
                <button 
                    role="tab"
                    aria-selected={selectedTab === "signin"}
                    onClick={()=> {
                        console.log("sigin selected");
                        setSelectedTab("signin")
                    }}
                    className= "flex-1 p-3.5 border-b-2 border-solid -m-px border-b-transparent aria-selected:border-b-[#E8A200]"
                >
                    Sign in
                </button>
                <button
                    role="tab"
                    aria-selected={selectedTab === "join"}
                    onClick={()=> {
                        console.log("join selected");
                        setSelectedTab("join")
                    }}
                    className="flex-1 p-3.5 border-b-2 border-solid -m-px border-b-transparent aria-selected:border-b-[#E8A200]"
                >
                    Join
                </button>
            </div>
            {selectedTab === "signin" ? <SignIn /> : <Join />}
        </div>
    );
}