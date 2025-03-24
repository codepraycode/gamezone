import { configureStore } from "@reduxjs/toolkit";

import quickViewReducer from "./commerce/quickView-slice";
import cartReducer from "./commerce/cart-slice";
import wishlistReducer from "./commerce/wishlist-slice";
import productDetailsReducer from "./commerce/product-details";

import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    quickViewReducer,
    cartReducer,
    wishlistReducer,
    productDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
