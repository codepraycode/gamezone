"use client";

import { useAccountContext } from "@/context/AccountContext";
import { useNavigate } from "@/hooks/useNavigate";
import { isEmpty } from "@/utils/functions";
import { PropsWithChildren, useEffect } from "react";
import PreLoader from "./PreLoader";

export default function EnsureAuth(props: PropsWithChildren) {
    const {user} = useAccountContext();

    const { redirect } = useNavigate();

    useEffect(() => {
        (() => {
            if (isEmpty(user)) {
                redirect("/signin");
                return;
            }
        })();
    }, [user, redirect]);


    if (!user) return <PreLoader/>;
    return props.children;
}