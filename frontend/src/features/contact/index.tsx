import React from "react";
import { Banner } from "./components/Banner";
import TitleOfContent from "@components/TitleOfContent";
import ContactForm from "./components/ContactForm";

import bgContact from "@assets/images/contact/bg-contact.jpg";
import AddressContactSession from "./components/AddressContactSession";
import { TopicPlace } from "@features/home/components/TopicPlace";

const ContactPage = () => {
  return (
    <>
      <Banner />
      <div className="w-full h-full"
         style={{
          backgroundImage: `url(${bgContact})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="w-rp pt-[138px] h-full pb-[112px]">
          <TitleOfContent name="contact.title" />
          <ContactForm />

          <div className="mt-20"></div>
          {/* <TitleOfContent name="contact.address_title" className="mt-20" /> */}

          <TopicPlace />
          {/* <AddressContactSession /> */}
        </div>
      </div>
    </>
  );
};


export default ContactPage