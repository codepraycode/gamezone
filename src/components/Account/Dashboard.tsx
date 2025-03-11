"use client";

import { useState } from "react";

export default function AccountDashboard() {
    const [activeTab, setActiveTab] = useState("dashboard");
    return (
        <div
            className={`xl:max-w-[770px] w-full bg-white rounded-xl shadow-1 py-9.5 px-4 sm:px-7.5 xl:px-10 ${
                activeTab === "dashboard" ? "block" : "hidden"
            }`}
        >
            <p className="text-dark">
                Hello Annie (not Annie?
                <a
                    href="#"
                    className="text-red ease-out duration-200 hover:underline"
                >
                    Log Out
                </a>
                )
            </p>

            <p className="text-custom-sm mt-4">
                From your account dashboard you can view your recent orders,
                manage your shipping and billing addresses, and edit your
                password and account details.
            </p>
        </div>
    );
}
