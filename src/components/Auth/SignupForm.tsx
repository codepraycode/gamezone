"use client";
import InputField from "@/components/Common/Form/InputField";
import { useAuthForm } from "@/hooks/useForm";
import { useNavigate } from "@/hooks/useNavigate";
import Link from "next/link";
import { FormWrapper } from "../Common/Form/FormUtils";
import { UserAccountForm } from "@/types/form";


export default function SignUpForm() {
    const { handleCreateAccount, errors, loading } =
        useAuthForm<UserAccountForm>();
    const { makeRedirectUrl } = useNavigate();
    return (
        <form onSubmit={handleCreateAccount}>
            <FormWrapper>
                <InputField
                    className="w-full"
                    label="First Name"
                    name="firstname"
                    placeholder="e.g John"
                    type="text"
                    error={errors.firstname}
                    required
                />

                <InputField
                    className="w-full"
                    label="Last Name"
                    name="lastname"
                    placeholder="e.g Fumise"
                    type="text"
                    error={errors.lastname}
                    required
                />
            </FormWrapper>

            <FormWrapper>
                <InputField
                    className="w-full"
                    label="Password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    error={errors.password}
                    required
                />

                <InputField
                    className="w-full"
                    label="Re-type Password"
                    type="password"
                    name="re-type-password"
                    id="re-type-password"
                    placeholder="Re-type your password"
                    error={errors.password}
                    required
                />
            </FormWrapper>

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
