"use client";
import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Login from "./Login";
import Shipping from "./Shipping";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import Coupon from "./Coupon";
import Billing from "./Billing";
import { useAuthForm } from "@/hooks/useForm";
import { UserAccountForm } from "@/types/form";
import { useAccountContext } from "@/context/AccountContext";
import toast from "react-hot-toast";

const Checkout = () => {
  const { updateAccount, errors, loading } = useAuthForm<UserAccountForm>();
  const { user } = useAccountContext();

  return (
    <form onSubmit={(e)=>{e.preventDefault(); toast.error("Not Yet Implemented!")}}>
      <Breadcrumb title={"Checkout"} pages={["checkout"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
            {/* <!-- checkout left --> */}
            <div className="lg:max-w-[670px] w-full">
              {/* <!-- login box --> */}
              <Login />

              {/* <!-- billing details --> */}
              <Billing errors={errors} user={user}/>

              {/* <!-- address box two --> */}
              <Shipping />

              {/* <!-- others note box --> */}
              <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                <div>
                  <label htmlFor="notes" className="block mb-2.5">
                    Other Notes (optional)
                  </label>

                  <textarea
                    name="notes"
                    id="notes"
                    rows={5}
                    placeholder="Notes about your order, e.g. speacial notes for delivery."
                    className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* // <!-- checkout right --> */}
            <div className="max-w-[455px] w-full">
              {/* <!-- order list box --> */}
              <OrderList/>

              {/* <!-- coupon box --> */}
              <Coupon />

              {/* <!-- shipping box --> */}
              <ShippingMethod />

              {/* <!-- payment box --> */}
              <PaymentMethod />

              {/* <!-- checkout button --> */}
              <button
                type="submit"
                className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
              >
                Process to Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
};

export default Checkout;


function OrderList() {
  return (
      <div className="bg-white shadow-1 rounded-[10px]">
          <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
              <h3 className="font-medium text-xl text-dark">Your Order</h3>
          </div>

          <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
              {/* <!-- title --> */}
              <div className="flex items-center justify-between py-5 border-b border-gray-3">
                  <div>
                      <h4 className="font-medium text-dark">Product</h4>
                  </div>
                  <div>
                      <h4 className="font-medium text-dark text-right">
                          Subtotal
                      </h4>
                  </div>
              </div>

              {
                [1,2,3,4,5].map((item, index)=>(
                  <OrderListItem key={index}/>
                ))
              }
          </div>
      </div>
  );
}


function OrderListItem() {
  return (
      <div className="flex items-center justify-between py-5 border-b border-gray-3">
          <div>
              <p className="text-dark">iPhone 14 Plus , 6/128GB</p>
          </div>
          <div>
              <p className="text-dark text-right">$899.00</p>
          </div>
      </div>
  );
}
