/* eslint-disable react-hooks/exhaustive-deps */
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";


type Navigate = {
    replace?: boolean;
    toRedirect?: boolean;
}


const redirectParam = "rdr";

export function useNavigate() {

    const router = useRouter();

    // const searchParam = usePathname();

    const navigate = useCallback((to:string, option: Navigate = {} )=>{

        const { replace, toRedirect } = option;

        let path = to;

        
        if (toRedirect) {
            const rdr = getRedirectUrl();

            if (rdr) {
                path = rdr;
            }
        }


        if (replace) {
            return router.replace(path);
        }


        return router.push(path);

    },[]);

    const redirect = useCallback((path:string )=>{

        const currtUrl = new URL(window.location.href);

        let url = path;

        if (currtUrl.pathname !== "/" || currtUrl.pathname !== path ) {
            url += `?${redirectParam}=${currtUrl.pathname}`;
        }


        return navigate(url);

    },[]);

    const getRedirectUrl = ()=>{

        const url = new URL(window.location.href);

        return url.searchParams.get(redirectParam);
    };

    const makeRedirectUrl = (path:string)=>{
        const rdr = getRedirectUrl();

        return path + (rdr ? `?${redirectParam}=${rdr}` : "");
    };


    return {
        navigate,
        redirect,
        makeRedirectUrl,
    };
}