import React from "react";

import { Metadata } from "next";
import SignUpForm from "@/components/Auth/SignupForm";
import Logo from "@/components/Common/Logo";


export const metadata: Metadata = {
    title: "Sign Up | GameZone",
    description: "Easily create an account with GameZone",
    // other metadata
};

const SignupPage = () => {
  return (
      <main>
          <section className="overflow-hidden py-20 bg-gray-2">
              <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                  <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
                      <div className="text-center mb-11">
                          <Logo className="mx-auto mb-8" />
                          <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                              Create an Account
                          </h2>
                          <p>Enter your detail below</p>
                      </div>

                      {/* <OAuth reverse /> */}

                      <div className="mt-5.5">
                          <SignUpForm />
                      </div>
                  </div>
              </div>
          </section>
      </main>
  );
};

export default SignupPage;
