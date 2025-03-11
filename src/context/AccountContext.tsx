"use client";
import { useNavigate } from "@/hooks/useNavigate";
import { User } from "@/types/form";
import { wait } from "@/utils/functions";
import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react";
import toast from "react-hot-toast";


const storeUserId = "gzxxuser";

type AccountContextProps = {
    user: User | null;
    updateUser: (data: User) => void;
    logout: VoidFunction;
};

const AccountContext = createContext<AccountContextProps>(null);


export function useAccountContext() {

    const context = useContext(AccountContext);

    if (!context) throw new Error("useAccountContext not in AccountContextProvider!");

    return context;
}


export function AccountContextProvider(props: PropsWithChildren) {

    const {navigate} = useNavigate()

    const [user, setUser] = useState<User | null>(()=>{
        const data = localStorage.getItem(storeUserId);

        if (!data) return null;

        return JSON.parse(data);
    });


    const updateUser = useCallback((data: User)=>{
        localStorage.setItem(storeUserId, JSON.stringify(data));
        setUser(()=>data);
    }, [])


    const clearUser = useCallback(()=>{
        localStorage.removeItem(storeUserId);
        setUser(()=>null);
    }, [])

    const logout = async () => {
        console.debug("Log out user!");

        // setLoading(true);

        await toast.promise(
            async ()=>{
                await wait(3);
                clearUser();
            },
            {
                loading: "Logging out",
                success: (data) => {
                    clearUser();
                    return "You're Logged out!";
                },
                error: (err) => `Could not log out`,
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

        setTimeout(() => {
            navigate("/signin");
        }, 1500);
    };

    const contextValue = {
        user,
        updateUser,
        logout,
    };

    return (
        <AccountContext.Provider value={contextValue}>
            {props.children}
        </AccountContext.Provider>
    )
}
