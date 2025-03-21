import React from "react";
import Cart from "@/components/Cart";

import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Cart | GameZone",
    description: "Checkout your cart on GameZone",
    // other metadata
};

const CartPage = () => {
  return <Cart />;
};

export default CartPage;
