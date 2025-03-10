"use client";

import PreLoader from "@/components/Common/PreLoader";
import { PropsWithChildren, useEffect, useState } from "react";



export default function LayoutLoader(props: PropsWithChildren) {
    const [loading, setLoading] = useState<boolean>(true);

    const loadTime = 1000;

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        (() => {
            timeoutId = setTimeout(() => setLoading(false), loadTime);
        })();

        return () => {
            clearTimeout(timeoutId);
        };
    }, [loadTime]);


    if (loading) return <PreLoader/>

    return props.children;
}