import React from "react";

import { Metadata } from "next";
import { ShopDetailLayout } from "@/Layout/ShoptLayout";
import ShopProduct from "@/components/Shop/ShopProduct";

export const metadata: Metadata = {
    title: "Shop Page | NextCommerce Nextjs E-commerce template",
    description: "This is Shop Page for NextCommerce Template",
    // other metadata
};

export default function ShopPage() {
    return (
        <ShopDetailLayout>
            <ShopProduct/>
        </ShopDetailLayout>
    );
};
