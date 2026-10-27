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
        <section className="w-full max-w-110">
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

function Join() {
    return(
        <section className="w-full max-w-110">

        </section>
    );
}

export default function Authentication() {
    const [selectedTab, setSelectedTab] = useState("signin");


    return(
        <div className="flex flex-col items-center justify-center w-110 max-w-110">
            <div className="flex border-b min-w-full m-7.5" role="tablist">
                <button 
                    role="tab"
                    aria-selected={selectedTab === "signin"}
                    onClick={()=> setSelectedTab("signin")}
                    className= "flex-1 p-3.5 border-b-2 border-solid -m-px border-b-transparent aria-selected:border-b-[#E8A200]"
                >
                    Sign in
                </button>
                <button
                    role="tab"
                    aria-selected={selectedTab === "join"}
                    onClick={()=> {
                        console.log("Join Selected");
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