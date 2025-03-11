import React from "react";
import { Metadata } from "next";
import Logo from "@/components/Common/Logo";
import SignInForm from "@/components/Auth/SigninForm";
import OAuth from "@/components/Auth/OAuth";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Signin Page | NextCommerce Nextjs E-commerce template",
  description: "This is Signin Page for NextCommerce Template",
  // other metadata
};

const SigninPage = () => {
  return (
      <main>
          <section className="overflow-hidden py-20 bg-gray-2">
              <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                  <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
                      <div className="text-center mb-11">
                          <Logo className="mx-auto mb-8" />
                          <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                              Sign In to Your Account
                          </h2>
                          <p>Enter your detail below</p>
                      </div>

                      <div>
                          <SignInForm />
                      </div>

                      {/* <OAuth /> */}

                      <p className="text-center mt-6">
                          Don&apos;t have an account?
                          <Link
                              href="/signup"
                              className="text-dark ease-out duration-200 hover:text-blue pl-2"
                          >
                              Sign Up Now!
                          </Link>
                      </p>
                  </div>
              </div>
          </section>
      </main>
  );
};

export default SigninPage;
