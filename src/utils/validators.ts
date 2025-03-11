import { CreateAccountFormData, ValidationErrors } from "@/types/form";


export function validateCreateAccountData(data: CreateAccountFormData): ValidationErrors<CreateAccountFormData> {
    const {email, name, password, rePassword} = data;

    let newErrors: ValidationErrors<CreateAccountFormData> = {};

    if (!name) newErrors.name = "Full name is required";
    if (!email) newErrors.email = "Email is required";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
        newErrors.password = "Password must be at least 6 characters";
    else if (!Object.is(password, rePassword))
        newErrors.rePassword = "Does not match";

    // if (Object.keys(newErrors).length === 0) return null;

    return newErrors;
}