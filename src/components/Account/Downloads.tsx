"use client";

import { useState } from "react";

export default function AccountDownloads() {
    const [activeTab, setActiveTab] = useState("dashboard");
    return (
        <div
            className={`xl:max-w-[770px] w-full bg-white rounded-xl shadow-1 py-9.5 px-4 sm:px-7.5 xl:px-10 ${
                activeTab === "downloads" ? "block" : "hidden"
            }`}
        >
            <p>You don&apos;t have any download</p>
        </div>
    );
}
