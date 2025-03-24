import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Checkout } from "@/types/checkout";


const initialState: Checkout = {
  address: {
    address:"",
    city: "",
    contact: "",
    country: ""
  },
};

export const checkout = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    updateAddress: (state, action: PayloadAction<Checkout>) => {
      
    },
  },
});

export const {
  
} = checkout.actions;
export default checkout.reducer;
