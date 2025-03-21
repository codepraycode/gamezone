import React, { useState } from "react";
import { FormWrapper } from "../Common/Form/FormUtils";
import InputField from "../Common/Form/InputField";
import { useAuthForm } from "@/hooks/useForm";
import SelectField from "../Common/Form/SelectField";
import CheckField from "../Common/Form/CheckField";
import { UserAccount, UserAccountForm, ValidationErrors } from "@/types/form";
import { useAccountContext } from "@/context/AccountContext";


type BillingFormProps = {
    errors: ValidationErrors<UserAccountForm>;
    user: UserAccount;
};

const Billing = (props: BillingFormProps) => {
    return (
        <div className="mt-9">
            <h2 className="font-medium text-dark text-xl sm:text-2xl mb-5.5">
                Billing details
            </h2>

            <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5">
                <BillingForm {...props}/>
            </div>
        </div>
    );
};

export default Billing;




function BillingForm({errors, user}:BillingFormProps) {
  const [checked, setChecked] = useState(false);


  function handleChange() {
      setChecked((p) => !p);
  }

  return (
      <>
          <FormWrapper>
              <InputField
                  className="w-full"
                  label="First Name"
                  name="firstname"
                  placeholder="e.g John"
                  type="text"
                  error={errors.firstname}
                  value={user.firstname}
              />

              <InputField
                  className="w-full"
                  label="Last Name"
                  name="lastname"
                  placeholder="e.g Fumise"
                  type="text"
                  error={errors.lastname}
                  value={user.lastname}
              />
          </FormWrapper>

          <FormWrapper>
              <InputField
                  className="w-full"
                  label="Phone Number"
                  name="contact"
                  placeholder=""
                  type="tel"
                  error={errors.contact}
                  value={user.contact}
              />

              <InputField
                  className="w-full"
                  label="email"
                  name="email"
                  placeholder=""
                  type="email"
                  error={errors.email}
                  value={user.email}
              />
          </FormWrapper>

          <InputField
              label="Company Name"
              name="company"
              placeholder=""
              type="text"
              error={errors.company}
              value={user.company}
          />

          <InputField
              label="Street Address"
              name="address"
              placeholder=""
              type="text"
              error={errors.address}
              value={user.address}
          />

          <FormWrapper>
              <InputField
                  className="w-full"
                  label="Town/ City"
                  name="city"
                  placeholder=""
                  type="text"
                  error={errors.city}
                  value={user.city}
              />
              <SelectField
                  className="w-full"
                  label="Country/ Region"
                  name="country"
                  options={[
                      {
                          label: "Australia",
                          value: "0",
                      },
                      {
                          label: "America",
                          value: "1",
                      },
                      {
                          label: "England",
                          value: "2",
                      },
                  ]}
                  error={errors.country}
                  value={user.country}
              />
          </FormWrapper>

          <CheckField
              label="Create Account"
              name="createAcc"
              checked={checked}
              onCheck={handleChange}
          />


          {
            checked && (
            <FormWrapper>
                <InputField
                    className="w-full"
                    label="Password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    error={errors.password}
                    // value={user.password}
                    required
                />

                <InputField
                    className="w-full"
                    label="Re-type Password"
                    type="password"
                    name="re-type-password"
                    id="re-type-password"
                    placeholder="Re-type your password"
                    error={errors.rePassword}
                    required
                />
            </FormWrapper>
            )
          }

      </>
  );
}
