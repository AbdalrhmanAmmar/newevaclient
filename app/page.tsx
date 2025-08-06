"use client";
import React, { FC, useState } from "react";
import Image from "next/image"
import AboutUs from "@/components/Home/AboutUs";
import HeroSection from "@/components/Home/HeroSection";
import WhyChooseUs from "@/components/Home/chooseUs";
import { OurClients } from "@/components/Home/OurClient";
import CustomerReviews from "@/components/Home/CustomerReviews";
import ServicesSection from "@/components/Home/ServicesSection";


interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  return (
    <div>

  <HeroSection />
  <AboutUs/>
  <WhyChooseUs/>
  <ServicesSection/>
  <OurClients/>
  <CustomerReviews/>

    </div>
  );
};

export default Page;
