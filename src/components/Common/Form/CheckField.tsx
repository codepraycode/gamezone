import { useState } from "react";
import { CheckIcon } from "../Icons";

interface InputFieldProps {
    label: string;
    // type: string;
    name: string;
    // placeholder: string;
    // error?: string;
    required?: boolean;
    id?: string;
    className?: string;
    onCheck:()=>void;
    checked?:boolean;
    // autoComplete?: "on" | "off";
}

export default function CheckField({
    label,
    // type,
    name,
    // placeholder,
    // error,
    required,
    id,
    onCheck,
    checked,
    className="mb-5"
}: InputFieldProps) {
    const Id = id ? id : name;

    return (
        <div className={className}>
            <label
                htmlFor={Id}
                className="text-dark flex cursor-pointer select-none items-center"
                onClick={onCheck}
            >
                <div className="relative">
                    <input
                        type="checkbox"
                        id={Id}
                        className="sr-only"
                        onClick={onCheck}
                        onChange={()=>{}}
                        checked={checked}
                        aria-checked={checked}
                    />
                    <div className="mr-2 flex h-4 w-4 items-center justify-center rounded border border-gray-4">
                        <CheckIcon checked={checked} />
                    </div>
                </div>
                {label} {required && <span className="text-red">*</span>}
            </label>
        </div>
    );
};
