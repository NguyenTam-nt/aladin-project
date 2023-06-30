import React, { Suspense, lazy } from "react";

const Banner = lazy(() =>
  import("./components/TopicBanner/Banner").then((module) => ({
    default: module.Banner,
  }))
);
const HomeTopicDevice = lazy(() =>
  import("./components/TopicDevice/HomeTopicDevice").then((module) => ({
    default: module.HomeTopicDevice,
  }))
);
const HomeTopicSales = lazy(() =>
  import("./components/TopicSales/HomeTopicSales").then((module) => ({
    default: module.HomeTopicSales,
  }))
);
const TopicMenu = lazy(() =>
  import("./components/TopicMenu").then((module) => ({
    default: module.TopicMenu,
  }))
);
const TopicVideo = lazy(() =>
  import("./components/TopicVideo").then((module) => ({
    default: module.TopicVideo,
  }))
);
const TopicPost = lazy(() =>
  import("./components/TopicPost").then((module) => ({
    default: module.TopicPost,
  }))
);
const TopicCustomer = lazy(() =>
  import("./components/TopicCustomer").then((module) => ({
    default: module.TopicCustomer,
  }))
);
const TopicNews = lazy(() =>
  import("./components/TopicNews").then((module) => ({
    default: module.TopicNews,
  }))
);
const TopicForm = lazy(() =>
  import("./components/TopicForm").then((module) => ({
    default: module.TopicForm,
  }))
);
const TopicPlace = lazy(() =>
  import("./components/TopicPlace").then((module) => ({
    default: module.TopicPlace,
  }))
);

export const HomePage = () => {
  return (
    <>
      <Suspense>
        <Banner />
      </Suspense>
      <div className="home-body">
        <Suspense>
          <HomeTopicDevice />
        </Suspense>
        <Suspense>
          <HomeTopicSales />
        </Suspense>
        <Suspense>
          <TopicMenu />
        </Suspense>
        <Suspense>
          <TopicVideo />
        </Suspense>
        <div className="pt-[80px] pb-[24px] lg:pb-[100px]">
          <Suspense>
            <TopicPost />
          </Suspense>
          <Suspense>
            <TopicCustomer />
          </Suspense>
          <Suspense>
            <TopicNews />
          </Suspense>
          <Suspense>
            <TopicForm />
          </Suspense>
          <Suspense>
            <TopicPlace />
          </Suspense>
        </div>
      </div>
    </>
  );
};
