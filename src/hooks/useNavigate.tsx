/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/navigation";
import { useCallback } from "react";


type Navigate = {
    replace?: boolean;
}

export function useNavigate() {

    const router = useRouter();

    const navigate = useCallback((path:string, option: Navigate = {} )=>{

        const {replace} = option;

        if (replace) {
            return router.replace(path);
        }


        return router.push(path);

    },[]);


    return {
        navigate,
    };
}