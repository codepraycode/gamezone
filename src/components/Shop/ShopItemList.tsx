"use client";
import { useShopContext } from "@/Layout/ShoptLayout";
import clsx from "clsx";
import shopData from "./shopData";
import SingleGridItem from "./SingleGridItem";
import SingleListItem from "./SingleListItem";


export default function ShopItemList() {
    const {displayGrid, displayList} = useShopContext();
    return (
        <>
            {/* <!-- Products Grid Tab Content Start --> */}
            <div
                className={clsx(
                    {
                        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7.5 gap-y-9":
                            displayGrid,
                    },
                    {
                        "flex flex-col gap-7.5": displayList,
                    }
                )}
            >
                {shopData.map((item, key) => {
                    if (displayGrid) return <SingleGridItem item={item} key={key}/>
                    if (displayList) return <SingleListItem item={item} key={key}/>
                })}
            </div>
            {/* <!-- Products Grid Tab Content End --> */}
        </>
    );
}