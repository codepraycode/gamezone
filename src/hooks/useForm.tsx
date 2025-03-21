
import { useState } from "react";
import { useNavigate } from "./useNavigate";
import toast from "react-hot-toast";
import { useAccountContext } from "@/context/AccountContext";
import { validateCreateAccountData, validateLoginData } from "@/utils/validators";
import { UserAccount, UserAccountForm, ValidationErrors } from "@/types/form";
import { isEmpty, wait } from "@/utils/functions";




export function useContactForm<T>(intitialData: T = {} as T) {
    const [errors, setErrors] = useState<T>(intitialData);

    const [loading, setLoading] = useState(false);

    const { navigate } = useNavigate();

    const handleSubmitContactForm = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        await toast.promise(
            wait(5),
            {
                loading: "Logging in",
                success: (data) => {
                    setLoading(false);
                    return "You're Authenticated!";
                },
                error: (err) => `Could not authenticate you`,
            },
            {
                // style: {
                //     minWidth: "250px",
                // },
                success: {
                    duration: 3500,
                    // icon: "🔥",
                },
            }
        );

        setTimeout(() => {}, 7000);
        navigate("/");
    };
    return {
        handleSubmitContactForm,
        loading,
        errors
    }
}



export function useAuthForm<T>(intitialData: T= {} as T) {
    const { updateUser, findUser } = useAccountContext();
    const [errors, setErrors] = useState<ValidationErrors<T>>({});
    const [loading, setLoading] = useState(false);

    // const [data, setData] = useState<>({})

    const {navigate} = useNavigate();


    function resolveData(e: React.FormEvent): UserAccountForm {
        const formData = new FormData(e.currentTarget as HTMLFormElement);

        const firstname = formData.get("firstname") as string;
        const lastname = formData.get("lastname") as string;
        const company = formData.get("company") as string;
        const country = formData.get("country") as string;
        const address = formData.get("address") as string;
        const city = formData.get("city") as string;
        const contact = formData.get("contact") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const rePassword = formData.get("re-type-password") as string;

        return {
            firstname,
            lastname,
            company,
            country,
            address,
            city,
            contact,
            email,
            password,
            rePassword
        };
    }

    const handleCreateAccount = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        const toastID = "authId";

        toast.loading("Creating account", { id: toastID });

        const data = resolveData(e);
        


        const _errors = validateCreateAccountData(data);

        const {rePassword, ...rest} = data;

        if (!isEmpty(_errors)) {
            // console.debug(JSON.stringify(_errors));
            setErrors(()=>_errors as any);
            toast.error("Could not create an account", { id: toastID });
            setLoading(false);
            return;
        };

        wait(5).then(()=>{

            toast.success("You account has been created!", {
                id: toastID,
                duration: 3500,
            });

            updateUser(rest);
            setLoading(false);


            setTimeout(() => {
                navigate("/", { toRedirect: true, replace: true });
            }, 2000);
        })
    };

    const updateAccount = async (e: React.FormEvent, simple=true) => {
        e.preventDefault();

        setLoading(true);
        const toastID = "authId";

        toast.loading("Creating account", { id: toastID });

        const data = resolveData(e);

        const _errors = validateCreateAccountData(data);

        const { rePassword, ...rest } = data;


        if (!isEmpty(_errors)) {
            // console.debug(JSON.stringify(_errors));
            setErrors(()=>_errors as any);
            toast.error("Could not update your account", { id: toastID });
            setLoading(false);
            return;
        };

        wait(5).then(()=>{

            toast.success("You account has been updated!", {
                id: toastID,
                duration: 3500,
            });

            updateUser(rest);
            setLoading(false);


            if (simple) return;

            setTimeout(() => {
                navigate("/", { toRedirect: true, replace: true });
            }, 2000);
        })
    };

    const handleLogin = async (e: React.FormEvent, simple=false) => {
        console.log("Event", e);
        e.preventDefault();
    
        setLoading(true);
        const toastID = "authInId";

        toast.loading("Logging in", { id: toastID });

        const data = resolveData(e);

        const _errors = validateLoginData(data);

        const {email:reEmail, password} = data;


        if (!isEmpty(_errors)) {
            // console.debug(JSON.stringify(_errors));
            setErrors(() => _errors as any);
            toast.error("Could not authenticate you", { id: toastID });
            setLoading(false);
            return;
        }

        wait(5).then(() => {
            const {email, data} = findUser(reEmail);

            if (!email || !isEmpty(data)) {
                throw new Error("Account not found!");
            }

            toast.success("You're Authenticated!", {
                id: toastID,
                duration: 3500,
            });



            updateUser({
                ...data
            });

            if (simple) return;

            setTimeout(() => {
                navigate("/", {toRedirect:true, replace:true});
            }, 2000);
        }).catch((err)=>{
            toast.error(err.message || "Could not authenticate you", { id: toastID });
        }).finally(()=>setLoading(false));

    };

    return {
        errors,
        loading,
        handleLogin,
        handleCreateAccount,
        updateAccount,
    };
}