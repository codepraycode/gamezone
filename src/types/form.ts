export type CreateAccountFormData = {
    name: string;
    email: string;
    password: string;
    rePassword: string;
};

export type LoginData = {
    email: string;
    password: string;
};

export type ValidationErrors<T> = Partial<Record<keyof T, string>>;


export type User = {
    name:string;
    email:string;
    password: string;
}