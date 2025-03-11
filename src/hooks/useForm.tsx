
import { useState } from "react";
import { useNavigate } from "./useNavigate";
import toast from "react-hot-toast";
import { useAccountContext } from "@/context/AccountContext";
import { validateCreateAccountData, validateLoginData } from "@/utils/validators";
import { ValidationErrors } from "@/types/form";
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

    const {navigate} = useNavigate();



    const handleCreateAccount = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        const toastID = "authId";

        toast.loading("Creating account", { id: toastID });

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const rePassword = formData.get("re-type-password") as string;
        


        const _errors = validateCreateAccountData({
            name,
            email,
            password,
            rePassword,
        });

        const data = {
            name,
            email,
            password,
        };

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

            updateUser(data);
            setLoading(false);


            setTimeout(() => {
                navigate("/", { toRedirect: true, replace: true });
            }, 2000);
        })
    };


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
    
        setLoading(true);
        const toastID = "authInId";

        toast.loading("Logging in", { id: toastID });

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const data = {
            email,
            password,
        };

        const _errors = validateLoginData(data);


        if (!isEmpty(_errors)) {
            // console.debug(JSON.stringify(_errors));
            setErrors(() => _errors as any);
            toast.error("Could not authenticate you", { id: toastID });
            setLoading(false);
            return;
        }

        wait(5).then(() => {
            const [email, name] = findUser(data.email) || [];

            if (!email || !name) {
                throw new Error("Account not found!");
            }

            toast.success("You're Authenticated!", {
                id: toastID,
                duration: 3500,
            });



            updateUser({
                email,
                name,
                ...data
            });

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
    };
}