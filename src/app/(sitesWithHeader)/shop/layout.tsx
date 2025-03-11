import { ShopContextProvider } from "@/Layout/ShoptLayout";


export default function ShopRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ShopContextProvider>
            {children}
        </ShopContextProvider>
    );
}
