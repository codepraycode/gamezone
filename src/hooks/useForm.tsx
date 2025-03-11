
import { useState } from "react";
import { useNavigate } from "./useNavigate";
import toast from "react-hot-toast";
import { useAccountContext } from "@/context/AccountContext";
import { validateCreateAccountData } from "@/utils/validators";
import { ValidationErrors } from "@/types/form";
import { isEmpty, wait } from "@/utils/functions";




export function useContactForm<T>(intitialData: T = {} as T) {
    const [errors, setErrors] = useState<T>(intitialData);

    const [loading, setLoading] = useState(false);

    const { navigate } = useNavigate();

    const handleSubmitContactForm = async (e: React.FormEvent) => {
        e.preventDefault();

        console.debug("Submitted Form!");

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
    const {updateUser} = useAccountContext();
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
                navigate("/");
            }, 2000);
        })


        
        


    };


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
        console.debug("Submitted Form!");
        
        setLoading(true);


        await toast.promise(
            wait(5),
            {
                loading: "Logging in",
                success: (data) => {
                    setLoading(false);
                    return "You're Authenticated!"
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
        errors,
        loading,
        handleLogin,
        handleCreateAccount,
    };
}