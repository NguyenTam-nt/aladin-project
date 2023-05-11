import { Banner } from "./components/Banner";
import { HomeTopicEvent } from "./components/HomeTopicEvent";
import { HomeTopicNews } from "./components/HomeTopicNews";

const HomePage = () => {
  return (
    <>
      <Banner />
      <HomeTopicNews />
      <HomeTopicEvent />
    </>
  );
};

export default HomePage;
