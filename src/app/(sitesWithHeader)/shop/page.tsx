import React from "react";

import { Metadata } from "next";
import ShopDiplayHeader from "@/components/Shop/ShopHeader";
import ShopPagination from "@/components/Shop/ShopPagination";
import ShopItemList from "@/components/Shop/ShopItemList";
import { ShopLayout } from "@/Layout/ShoptLayout";

export const metadata: Metadata = {
    title: "Shop | GameZone",
    description: "View products and items on GameZone",
    // other metadata
};

export default function ShopPage() {
    return (
        <ShopLayout>
            <div className="w-full">
                {/* <!-- Products Grid Tab Content Start --> */}
                <ShopDiplayHeader />
                {/* <!-- Products Grid Tab Content End --> */}

                <ShopItemList />

                {/* <!-- Products Pagination Start --> */}
                <ShopPagination />
                {/* <!-- Products Pagination End --> */}
            </div>
        </ShopLayout>
    );
};
