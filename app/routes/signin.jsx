import { useState } from "react";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";

function WelcomeHeading() {
    return(
        <h1 className="text-3xl font-bold text-[#0B2545]">
            Welcome back
        </h1>
    );
}

function SignInParagraph() {
    return(
        <p className="mt-2 text-[#5D6B82]">
            Sign in to your Elevation Center account.
        </p>
    );
}

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        console.log("Email:", email);
        console.log("Password entered:", password.length > 0);
    }

    return(
        <main className="flex min-h-screen items-center justify-center bg-[#F5F7FA] px-6">
            <section>
                <WelcomeHeading/>
                <SignInParagraph/>
                
                <form onSubmit={handleSubmit} className="">
                    <FormInput 
                        label="Email Address"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@email.com"
                        autoComplete="email"
                        required
                    />

                    <FormInput
                        label="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                    />

                    <PrimaryButton type="submit" className="mt-2 w-full">
                        Sign in
                    </PrimaryButton>
                </form>
            </section>
        </main>
    );
}