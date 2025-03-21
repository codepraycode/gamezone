"use client";
import React, { useState } from "react";
import { CheveronIcon } from "../Common/Icons";
import { useAuthForm } from "@/hooks/useForm";
import InputField from "../Common/Form/InputField";
import { useAccountContext } from "@/context/AccountContext";
import { isEmpty } from "@/utils/functions";
import { LoginData } from "@/types/form";

const Login = () => {
  const {user} = useAccountContext();
  const [dropdown, setDropdown] = useState(()=>{
    return isEmpty(user);
  });

  return (
    <div className="bg-white shadow-1 rounded-[10px]" hidden={!isEmpty(user)}>
      <div
        onClick={() => setDropdown(!dropdown)}
        className={`cursor-pointer flex items-center gap-0.5 py-5 px-5.5 ${
          dropdown && "border-b border-gray-3"
        }`}
      >
        Returning customer?
        <span className="flex items-center gap-2.5 pl-1 font-medium text-dark">
          Click here to login
          <CheveronIcon down={dropdown}/>
        </span>
      </div>

      {/* <!-- dropdown menu --> */}
      <div
        className={`${
          dropdown ? "block" : "hidden"
        } pt-7.5 pb-8.5 px-4 sm:px-8.5`}
      >
        <p className="text-custom-sm mb-6">
          If you didn&apos;t Logged in, Please Log in first.
        </p>

        <LoginForm/>
      </div>
    </div>
  );
};

export default Login;


function LoginForm() {

  const { handleLogin, errors, loading } = useAuthForm<LoginData>();

  return (
      <form onSubmit={(e)=>handleLogin(e, true)}>
          <InputField
              label="Email"
              type="email"
              name="email"
              placeholder=""
              error={errors.email}
              required
          />

          <InputField
              label="Password"
              type="password"
              name="password"
              placeholder=""
              error={errors.password}
              required
          />

          <button
              type="submit"
              className="inline-flex font-medium text-white bg-blue py-3 px-10.5 rounded-md ease-out duration-200 hover:bg-blue-dark"
              disabled={loading}
          >
              {loading ? "Loading..." : "Login"}
          </button>
      </form>
  );
}
