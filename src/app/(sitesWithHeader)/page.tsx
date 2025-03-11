import Newsletter from "@/components/Common/Newsletter";
import BestSeller from "@/components/Home/BestSeller";
import Categories from "@/components/Home/Categories";
import CounDown from "@/components/Home/Countdown";
import Hero from "@/components/Home/Hero";
import NewArrival from "@/components/Home/NewArrivals";
import PromoBanner from "@/components/Home/PromoBanner";
import Testimonials from "@/components/Home/Testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home | GameZone",
    description:
        "E-commerce web application that allows users to browse, purchase, and manage their orders for games, books, and gift cards.",
    // other metadata
};

export default function HomePage() {
  return (
      <main>
          <Hero />
          <Categories />
          <NewArrival />
          <PromoBanner />
          <BestSeller />
          <CounDown />
          <Testimonials />
          <Newsletter />
      </main>
  );
}
