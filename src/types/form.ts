export type UserAccount = {
    picture?:string;
    firstname:string;
    lastname:string;
    company:string;
    country:string;
    address:string;
    city:string;
    contact:string;

    email: string;
    password: string;
}

export type UserAccountForm = UserAccount & {
    rePassword: string;
}

export type QuickCreateAccountFormData = Pick<UserAccount, "firstname" | "lastname" | "email" | "password">;

export type LoginData = Pick<UserAccount, "email" | "password">;

export type ValidationErrors<T> = Partial<Record<keyof T, string>>;
