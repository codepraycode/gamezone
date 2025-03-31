
import { useState } from "react";
import { useNavigate } from "./useNavigate";
import toast, { ToastOptions } from "react-hot-toast";
import { useAccountContext } from "@/context/AccountContext";
import { validateCreateAccountData, validateLoginData } from "@/utils/validators";
import { OrderForm, UserAccount, UserAccountForm, ValidationErrors } from "@/types/form";
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
    const { updateUser, findUser, user, } = useAccountContext();
    const [errors, setErrors] = useState<ValidationErrors<T>>({});
    const [loading, setLoading] = useState(false);

    // const [data, setData] = useState<>({})

    const {navigate} = useNavigate();


    function resolveData(e: React.FormEvent, withShipping=false): OrderForm {
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


        const dt = {
            firstname,
            lastname,
            company,
            country,
            address,
            city,
            contact,
            email,
            password,
            rePassword,
        };

        if (!withShipping) return dt;



        const shipingcountry = formData.get("shipping:country") as string;
        const shippingaddress = formData.get("shipping:address") as string;
        const shippingcity = formData.get("shipping:city") as string;
        const shippingcontact = formData.get("shipping:contact") as string;

        return {
            ...dt,
            shipping: {
                country: shipingcountry,
                address: shippingaddress,
                city: shippingcity,
                contact: shippingcontact,
            },
        };
    }


    async function performUpdateUser(data: UserAccountForm, toastConfig: {loadingMsg: string; successMsg: string; errorMsg:string} & ToastOptions) {
        setLoading(true);
        if(!isEmpty(errors)) setErrors(()=>({}))

        const { loadingMsg, successMsg, errorMsg, ...config } = toastConfig;

        toast.loading(loadingMsg, {...config, duration:0});

        const _errors = validateCreateAccountData(data);

        const { rePassword, ...rest } = data;

        if (!isEmpty(_errors)) {
            // console.debug(JSON.stringify(_errors));
            setErrors(() => _errors as any);
            toast.error(errorMsg, config);
            setLoading(false);
            return;
        }


        await wait(2);

        toast.success(successMsg, config);

        updateUser(rest);
        setLoading(false);

        return rest;
    }

    const handleCreateAccount = async (e: React.FormEvent, simple=true) => {
        e.preventDefault();

        const data = resolveData(e);

        console.debug(data);

        const rest = await performUpdateUser(data, {
            errorMsg: "Could not Create account",
            loadingMsg: "Creating account...",
            successMsg: "Created account",
            duration: 4000,
            id: "authToastId"
        });


        if(simple) return rest;

        setTimeout(() => {
            navigate("/", { toRedirect: true, replace: true });
        }, 1000);
    };

    const updateAccount = async (e: React.FormEvent, simple=true) => {
        e.preventDefault();

        const data = resolveData(e);

        const rest = await performUpdateUser(data, {
            errorMsg: "Could not update account",
            loadingMsg: "Updating account...",
            successMsg: "Updated account",
            duration: 4000,
            id: "authToastId",
        });

        if (simple) return rest;

        setTimeout(() => {
            navigate("/", { toRedirect: true, replace: true });
        }, 2000);
    };

    const handleLogin = async (e: React.FormEvent, simple=false) => {

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
            }, 1000);
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
        resolveData,
        performUpdateUser,
        user,
    };
}