"use client";
import React, { FC, useState } from "react";
import Image from "next/image"
import AboutUs from "@/components/Home/AboutUs";


interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  return (
    <div>
      hello
      <Image width={30} height={30} alt="test"  src="/Images/evaa.jpg"/>
      <AboutUs/>

    </div>
  );
};

export default Page;
