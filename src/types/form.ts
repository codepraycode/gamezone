export type UserAccount = {
    picture?:string;
    firstname:string;
    lastname:string;
    company:string;
    email: string;
    password: string;
} & Address;

export type Address = {
    contact:string;
    country:string;
    address:string;
    city:string;
}

export type UserAccountForm = UserAccount & {
    rePassword: string;
}


export type OrderForm = UserAccountForm & {
    shipping?: {
        country: string,
        address: string,
        city: string,
        contact: string,
    }
}

export type QuickCreateAccountFormData = Pick<UserAccount, "firstname" | "lastname" | "email" | "password">;

export type LoginData = Pick<UserAccount, "email" | "password">;

export type ValidationErrors<T> = Partial<Record<keyof T, string>>;


export type BillingFormProps = {
    errors: ValidationErrors<UserAccountForm>;
    // user: UserAccount;
};
