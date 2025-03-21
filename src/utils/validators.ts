import { LoginData, UserAccountForm, ValidationErrors } from "@/types/form";


export function validateCreateAccountData(data: UserAccountForm): ValidationErrors<UserAccountForm> {
    const {email, firstname, lastname, password, rePassword} = data;

    let newErrors: ValidationErrors<UserAccountForm> = {};

    if (!firstname) newErrors.firstname = "First name is required";
    if (!lastname) newErrors.lastname = "Last name is required";
    if (!email) newErrors.email = "Email is required";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
        newErrors.password = "Password must be at least 6 characters";
    else if (!Object.is(password, rePassword))
        newErrors.rePassword = "Does not match";

    // if (Object.keys(newErrors).length === 0) return null;

    return newErrors;
}

export function validateLoginData(data: LoginData): ValidationErrors<LoginData> {
    const {email, password} = data;

    let newErrors: ValidationErrors<LoginData> = {};

    if (!email) newErrors.email = "Email is required";

    if (!password) newErrors.password = "Password is required";

    return newErrors;
}