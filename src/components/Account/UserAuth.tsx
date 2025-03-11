"use client";

import Link from "next/link";
import { UserIcon } from "../Common/Icons";
import { useAccountContext } from "@/context/AccountContext";

export default function UserAuth() {
    const {user} = useAccountContext();

    const link = user ? "/account": "/signin";
    const title = user ? user.name : "Sign In";


    return (
        <Link href={link} className="flex items-center gap-2.5">
            <UserIcon />

            <div>
                <span className="block text-2xs text-dark-4 uppercase">
                    account
                </span>
                <p className="font-medium text-custom-sm text-dark">{title}</p>
            </div>
        </Link>
    );
}