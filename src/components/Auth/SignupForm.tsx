"use client";
import InputField from "@/components/Common/Form/InputField";
import { useAuthForm } from "@/hooks/useForm";
import { useNavigate } from "@/hooks/useNavigate";
import { CreateAccountFormData } from "@/types/form";
import Link from "next/link";


export default function SignUpForm() {
    const { handleCreateAccount, errors, loading } =
        useAuthForm<CreateAccountFormData>();
    const { makeRedirectUrl } = useNavigate();
    return (
        <form onSubmit={handleCreateAccount}>
            <InputField
                label="Full Name"
                type="name"
                name="name"
                placeholder="Enter your full name"
                error={errors.name}
                required
            />

            <InputField
                label="Email Address"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                error={errors.name}
                required
            />

            <InputField
                label="Password"
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                error={errors.name}
                required
            />

            <InputField
                label="Re-type Password"
                type="password"
                name="re-type-password"
                id="re-type-password"
                placeholder="Re-type your password"
                error={errors.name}
                required
            />

            <button
                type="submit"
                className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
                disabled={loading}
            >
                {loading ? "Loading..." : "Create Account"}
            </button>

            <p className="text-center mt-6">
                Already have an account?
                <Link
                    href={makeRedirectUrl("/signin")}
                    className="text-dark ease-out duration-200 hover:text-blue pl-2"
                >
                    Sign in Now
                </Link>
            </p>
        </form>
    );
}
