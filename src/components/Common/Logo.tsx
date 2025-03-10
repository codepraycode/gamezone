import Image from "next/image";


export default function Logo(props: {className?:string}) {
    return <Image src="/images/logo/logo.svg" alt="Logo" width={219} height={36} className={props.className} />;
}