import { createPaymentLink } from "@/app/actions/checkout";
import toast, { ToastOptions } from "react-hot-toast";
import { useNavigate } from "./useNavigate";
import { useAuthForm } from "./useForm";
import { Address, UserAccountForm } from "@/types/form";
import { useState } from "react";
import { wait } from "@/utils/functions";
import { SHOP } from "@/constants";
import { useAccountContext } from "@/context/AccountContext";

export function useCheckout() {
    const { navigate } = useNavigate();

    const [address, setAddress] = useState<Address>({} as Address);
    const [notes, setNote] = useState<string>("");

    const [shippingMethond, setShippingMethod] = useState();
    const [paymentMethod, setPaymentMethod] = useState();
    const [checkingOut, setCheckingOut] = useState(false);

    const { performUpdateUser, user, errors, loading, resolveData } =
        useAuthForm<UserAccountForm>();

    const handleCheckout = (total: number) => {
        // e.preventDefault();

        setCheckingOut(true)

        // toast.error("Not yet implemented!");

        const toastConfig: ToastOptions = {
            id: "checkOutToast",
            duration: 5000,
        };


        if (total === 0) {
            toast.error("Invalid cart items, please shop", toastConfig);

            navigate(SHOP, {replace:true});
            return;
        }

        if (!user) {
            toast.error("No User to process, please login", toastConfig);

            // navigate(SHOP, { replace: true });
            setCheckingOut(false);
            return;
        }

        toast.loading("Processing...", { ...toastConfig, duration: 0 });        

        createPaymentLink({
            email: user.email,
            amount: total,
            redirect: window.location.origin + "/verify",
            name:
                [user.firstname, user.lastname].filter(Boolean).join(" ") ||
                "Guest User",
        })
            .then((obj) => {
                setCheckingOut(false);
                toast.success("You can proceed to paying...", toastConfig);

                // Redirect to payment page
                try {

                    window.location.href = obj.checkout_url;
                } catch(err) {
                    console.error("Window not accessible!", err);
                }
            })
            .catch((err) => {
                console.error("Checkout Error:", err);
                toast.error("Could not proceed to checkout", toastConfig);
            });
    };

    const handleBillingDetails = async (e: React.FormEvent) => {
        const {shipping, ...data} = resolveData(e, true);

        // That means we can create account

        const toastId = "bilId";
        
        if (data.password && data.rePassword) {
            toast.loading("Upading user info...", {id:toastId, duration: 0});

            // await wait(4);
            await performUpdateUser(data, {
                errorMsg: "Error saving details",
                loadingMsg: "Updating...",
                successMsg: "Done!",
                id: "billingToast",
                duration: 5000
            });

            toast.dismiss(toastId);
        };

        
        
        toast.loading("setting order address...", { id: toastId, duration: 0 });
        await wait(4);

        const { contact, city, country, address } = shipping;

        let shippingAddress = {
            contact, city, country, address
        }

        // console.debug(shippingAddress);


        if (!contact) shippingAddress.contact = data.contact;
        if (!city) shippingAddress.city = data.city;
        if (!country) shippingAddress.country = data.country;
        if (!address) shippingAddress.address = data.address;

        // console.debug(shippingAddress);


        setAddress(()=>(shippingAddress));
        toast.dismiss(toastId);
    }

    function handleNote(val:string) {
        setNote(val);
    }

    function handleShippingMethod(val:any) {
        setShippingMethod(val);
    }

    function handlePaymentMethod(val:any) {
        setPaymentMethod(val);
    }

    return {
        handleCheckout,
        handleBillingDetails,
        handleNote,
        handlePaymentMethod,
        handleShippingMethod,

        errors,
        loading: loading || checkingOut,
        notes,
    };
}
