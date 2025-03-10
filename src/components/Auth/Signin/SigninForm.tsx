"use client";
import InputField from "@/components/Common/Form/InputField";
import { useAuthForm } from "@/hooks/useForm";


type LoginFormData = {
    email: string;
    password: string;
}

export default function SignInForm() {
    const { handleLogin, errors, loading } = useAuthForm<LoginFormData>();

    return (
        <form onSubmit={handleLogin}>
            <InputField
                label="Email"
                type="email"
                name="email"
                placeholder="Enter your email"
                error={errors.email}
                required
            />
            <InputField
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
                error={errors.password}
                required
            />

            <button
                type="submit"
                className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
                disabled={loading}
            >
                {loading ? "Loading..." : "Sign in to account"}
            </button>

            <a
                href="#"
                className="block text-center text-dark-4 mt-4.5 ease-out duration-200 hover:text-dark"
            >
                Forget your password?
            </a>
        </form>
    );
}
