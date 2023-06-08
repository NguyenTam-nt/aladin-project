import React from "react";
import { Banner } from "./components/Banner";
import TitleOfContent from "@components/TitleOfContent";
import ContactForm from "./components/ContactForm";

import bgContact from "@assets/images/contact/bg-contact.jpg";
import AddressContactSession from "./components/AddressContactSession";
import { TopicPlace } from "@features/home/components/TopicPlace";
import { paths } from "@constants/routerPublic";

const ContactPage = () => {
  return (
    <>
      <Banner name="Liên hệ" Link={paths.contact.prefix} />
      <div className="w-full h-full">
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