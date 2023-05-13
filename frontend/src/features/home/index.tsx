import { Banner } from "./components/Banner";
import { HomeTopicEvent } from "./components/HomeTopicEvent";
import { HomeTopicMonthlyEvents } from "./components/HomeTopicMonthlyEvents";
import { HomeTopicNews } from "./components/HomeTopicNews";
import { HomeTopicNotice } from "./components/HomeTopicNotice";
import { HomeTopicPartner } from "./components/HomeTopicPartner";
import { HomeTopicScientificResearch } from "./components/HomeTopicScientificResearch";
import { HomeTopicVideo } from "./components/HomeTopicVideo";

const HomePage = () => {
  return (
    <>
      <Banner />
      <HomeTopicNews />
      <HomeTopicEvent />
      <HomeTopicNotice />
      <HomeTopicMonthlyEvents />
      <HomeTopicVideo />
      <HomeTopicScientificResearch />
      <HomeTopicPartner />
    </>
  );
};

export default HomePage;
