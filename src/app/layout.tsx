import "./css/euclid-circular-a-font.css";
import "./css/style.css";


import { ReduxProvider } from "@/redux/provider";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Cart/CartSidebarModal";
import PreviewSliderModal from "@/components/Shop/ProductPreviewSlider";

import ScrollToTop from "@/components/Common/ScrollToTop";
import LayoutLoader from "@/Layout/LayoutLoader";
import { Toaster } from "react-hot-toast";
import { CartModalProvider } from "./context/CartSidebarModalContext";
import { ModalProvider } from "./context/QuickViewModalContext";
import { PreviewSliderProvider } from "./context/PreviewSliderContext";
import Footer from "@/components/Common/Footer";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body>
                <LayoutLoader>
                    <ReduxProvider>
                        <CartModalProvider>
                            <ModalProvider>
                                <PreviewSliderProvider>
                                    {children}

                                    <QuickViewModal />
                                    <CartSidebarModal />
                                    <PreviewSliderModal />
                                </PreviewSliderProvider>
                            </ModalProvider>
                        </CartModalProvider>
                    </ReduxProvider>
                    <Toaster />
                    <ScrollToTop />
                    <Footer />
                </LayoutLoader>
            </body>
        </html>
    );
}
