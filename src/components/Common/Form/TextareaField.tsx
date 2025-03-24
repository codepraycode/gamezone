interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    placeholder: string;
    error?: string;
    required?: boolean;
    id?: string;
    className?: string;
    value?:string;
    onChange?:(e:any)=>void
    // autoComplete?: "on" | "off";
}

export default function TextareaField({
    label,
    name,
    placeholder,
    error,
    required,
    id,
    value,
    onChange
}: Omit<InputFieldProps, "type">) {
    const Id = id ? id : name;

    return (
        <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
            <label htmlFor={Id} className="block mb-2.5">
                {label} {required && <span className="text-red">*</span>}
            </label>
            <textarea
                name={name}
                id={Id}
                defaultValue={value}
                placeholder={placeholder}
                required={required}
                className={`rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20 ${
                    error
                        ? "border-red-light focus:ring-red-light"
                        : "border-gray-3 bg-gray-1"
                }`}
                onChange={onChange}
            />
            {error && <p className="mt-2 text-sm text-red-dark">{error}</p>}
        </div>
    );
};
