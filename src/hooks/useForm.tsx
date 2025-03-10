
import { useState } from "react";
import { useNavigate } from "./useNavigate";
import toast from "react-hot-toast";


async function wait(time: number) {
    return new Promise((res, rej)=>{
        setTimeout(()=>{
            res(null);
        }, time * 1000)
    })
}

export function useAuthForm<T>(intitialData: T= {} as T) {
    const [errors, setErrors] = useState<T>(intitialData);
    const [loading, setLoading] = useState(false);

    const {navigate} = useNavigate();



    const handleCreateAccount = async (e: React.FormEvent) => {
        e.preventDefault();

        console.debug("Submitted Form!");


        setLoading(true);

        await toast.promise(
            wait(5),
            {
                loading: "Creating account",
                success: (data) => {
                    setLoading(false);
                    return "You account has been created!";
                },
                error: (err) => `Could not create an account`,
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


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        // const formData = new FormData(e.currentTarget as HTMLFormElement);
        // const email = formData.get("email") as string;
        // const password = formData.get("password") as string;

        // // console.debug({
        // //     email, password
        // // })

        // let newErrors: { email?: string; password?: string } = {};
        // if (!email) newErrors.email = "Email is required";
        // if (!password) newErrors.password = "Password is required";
        // else if (password.length < 6)
        //     newErrors.password = "Password must be at least 6 characters";

        // setErrors(newErrors);

        // if (Object.keys(newErrors).length === 0) {
        //     console.log("Form submitted", { email, password });
        // }

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