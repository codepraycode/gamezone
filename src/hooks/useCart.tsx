import { useAppSelector } from "@/redux/store";
import { useMemo } from "react";


export function useCart() {
    const cartItems = useAppSelector((state) => state.cartReducer.items);


    const summaryAmount = useMemo(()=>{
        return cartItems.reduce((acc, each)=>{

            const amount = each.price * each.quantity;

            acc += amount;

            // acc.items.push({
            //     id: each.id,
            //     title: each
            //     amount: each.price,
            //     quantity: each.quantity

            // });


            return acc;
        }, 0)
    }, [cartItems])


    return {
        items: cartItems,
        summary: summaryAmount,
    };
}