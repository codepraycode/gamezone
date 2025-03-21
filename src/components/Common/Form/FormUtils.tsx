import { PropsWithChildren } from "react"

type FormWrapperProps = PropsWithChildren;

export function FormWrapper(props: FormWrapperProps) {
    return (
        <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
            {props.children}
        </div>
    )
}