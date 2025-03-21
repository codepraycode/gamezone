"use client";
import { useNavigate } from "@/hooks/useNavigate";
import { UserAccount } from "@/types/form";
import { wait } from "@/utils/functions";
import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react";
import toast from "react-hot-toast";


const storeUserId = "gzxxuser";
const storedExUsers = "gzxxuserxxEx";
const storedExUsersDelimiter = ",";
const storedExUsersSubDelimiter = ":";

const UserNameDelimeter = "_";

type User = UserAccount | null;

type AccountContextProps = {
    user: User ;
    updateUser: (data: User) => void;
    logout: VoidFunction;
    findUser: (email: string) => {email: string, data: User} | undefined;
};

const AccountContext = createContext<AccountContextProps>(null);


export function useAccountContext() {

    const context = useContext(AccountContext);

    if (!context) throw new Error("useAccountContext not in AccountContextProvider!");

    return context;
}


export function AccountContextProvider(props: PropsWithChildren) {

    const {navigate} = useNavigate()

    const [user, setUser] = useState<User>(()=>{
        const data = localStorage.getItem(storeUserId);

        if (!data) return null;

        return JSON.parse(data) as User;
    });


    function getStoredUsers() {
        const users = localStorage.getItem(storedExUsers) || "";

        const resp = users.split(storedExUsersDelimiter);
        return resp
    }

    const findUser = useCallback((email: string)=>{
        
        const usr = getStoredUsers().find((e) => {
            return e.includes(email)
        });

        if (!usr) return;
        

        let [emaill, data] = usr.split(storedExUsersSubDelimiter);

        let _data: UserAccount = null;

        try {
            _data = JSON.parse(data);
        } catch (err:any) {
            console.error(err);
        }

        return {email: emaill, data:_data};

    }, []);

    const storeUser = useCallback((data: User)=>{
        // if (!user) {
        //     console.error("No user to log out");
        //     return;
        // };

        // Store user token

        let stored = false;

        const { email } = data;

        // const name = firstname + UserNameDelimeter + lastname;

        const userToken= `${email}${storedExUsersSubDelimiter}${JSON.stringify(data)}`;

        const users = getStoredUsers();


        for (let i=0; i <= users.length; i++){
            const usr = users[i];

            if (!usr) continue;

            if (usr.includes(email)) {
                users[i] = userToken;
                stored = true;
                break;
            };
        }

        if (!stored) {
            users.push(userToken)
        }

        localStorage.setItem(storedExUsers, users.toString());
    },[]);

    const updateUser = useCallback(
        (data: User) => {
            storeUser(data); // store current user;
            localStorage.setItem(storeUserId, JSON.stringify(data));
            setUser(() => data);
        },
        [storeUser]
    );


    const clearUser = useCallback(()=>{
        localStorage.removeItem(storeUserId);
        setUser(()=>null);
    }, [])

    const logout = async () => {


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

    const contextValue: AccountContextProps = {
        user,
        updateUser,
        logout,
        findUser,
    };

    return (
        <AccountContext.Provider value={contextValue}>
            {props.children}
        </AccountContext.Provider>
    )
}
