import clsx from "clsx";
import { CheveronIcon2 } from "../Icons";

interface InputFieldProps {
    label: string;
    options: {
        value:string;
        label:string;
    }[];
    name: string;
    // placeholder: string;
    error?: string;
    required?: boolean;
    id?: string;
    className?: string;
    value?: string;
    // autoComplete?: "on" | "off";
}

export default function SelectField({
    label,
    options,
    name,
    // placeholder,
    error,
    required,
    id,
    value,
    className="mb-5"
}: InputFieldProps) {
    const Id = id ? id : name;

    return (
        <div className={className}>
            <label
                htmlFor={Id}
                className="block mb-2 text-gray-700 font-medium"
            >
                {label} {required && <span className="text-red">*</span>}
            </label>

            <div className="relative">
                <select
                    name={name}
                    id={Id}
                    // placeholder={placeholder}
                    required={required}
                    defaultValue={value}
                    // autoComplete={type === "password" ? "on" : "off"}
                    className={clsx(
                        "w-full bg-gray-1 rounded-md border border-gray-3 text-dark-4 py-3 pl-5 pr-9 duration-200 appearance-none outline-none focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20",
                        {
                            "border-red-light focus:ring-red-light":
                                Boolean(error),
                        },
                        {
                            "border-gray-3 bg-gray-1": !Boolean(error),
                        }
                    )}
                >
                    {options.map((item, i) => (
                        <option value={item.value} key={i}>
                            {item.label}
                        </option>
                    ))}
                </select>

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-4">
                    <CheveronIcon2 />
                </span>
            </div>
            {error && <p className="mt-2 text-sm text-red-dark">{error}</p>}
        </div>
    );
};
