import React from "react";
import TitleOfContent from "@components/TitleOfContent";
import ContactForm from "./components/ContactForm";
import { Banner } from '@components/Banner'
import bgContact from "@assets/images/contact/bg-contact.jpg";
import AddressContactSession from "./components/AddressContactSession";
import { TopicPlace } from "@features/home/components/TopicPlace";
import { paths } from "@constants/routerPublic";
import { TitleTopic } from "@features/home/components/TitleTopic";
import { HomeTopicType } from "@typeRules/home";

const ContactPage = () => {
  return (
    <>
      {/* <Banner name="Liên hệ" Link={paths.contact.prefix} /> */}
      <Banner type={HomeTopicType.contact} />
      <div className="w-full h-full">
        <div className=" pt-10 lg:pt-[138px] h-full pb-[112px]">
          <div className="w-rp">
            <TitleTopic title="contact.title" />
            <ContactForm />
          </div>

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