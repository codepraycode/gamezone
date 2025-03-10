import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import Footer from "../../components/Footer";

import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ReduxProvider } from "@/redux/provider";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import PreviewSliderModal from "@/components/Common/PreviewSlider";

import ScrollToTop from "@/components/Common/ScrollToTop";
import LayoutLoader from "@/Layout/LayoutLoader";
import { Toaster } from "react-hot-toast";

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
