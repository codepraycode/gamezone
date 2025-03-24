import React, { useState } from "react";
import { CheveronIcon } from "../Common/Icons";
import SelectField from "../Common/Form/SelectField";
import InputField from "../Common/Form/InputField";
import { BillingFormProps } from "@/types/form";
import { FormWrapper } from "../Common/Form/FormUtils";

const Shipping = ({errors}: BillingFormProps) => {
    const [dropdown, setDropdown] = useState(false);

    const required = dropdown === true;

    return (
        <div className="bg-white shadow-1 rounded-[10px] mt-7.5">
            <div
                onClick={() => setDropdown(!dropdown)}
                className="cursor-pointer flex items-center gap-2.5 font-medium text-lg text-dark py-5 px-5.5"
            >
                Ship to a different address?
                <CheveronIcon down={dropdown} />
            </div>

            {/* <!-- dropdown menu --> */}
            <div className={`p-4 sm:p-8.5 ${dropdown ? "block" : "hidden"}`}>
                <InputField
                    label="Street Address"
                    name="shipping:address"
                    placeholder=""
                    type="text"
                    error={errors.address}
                    required={required}
                    // value={user.address}
                />

                <FormWrapper>
                    <InputField
                        className="w-full"
                        label="Town/ City"
                        name="shipping:city"
                        placeholder=""
                        type="text"
                        error={errors.city}
                        required={required}
                        // value={user.city}
                    />
                    <SelectField
                        className="w-full"
                        label="Country/ Region"
                        name="shipping:country"
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
                        required={required}
                        // value={user.country}
                    />
                </FormWrapper>

                <InputField
                    className="w-full"
                    label="Phone Number"
                    name="shipping:contact"
                    placeholder=""
                    type="tel"
                    error={errors.contact}
                    required={required}
                    // value={user.contact}
                />
            </div>
        </div>
    );
};

export default Shipping;
