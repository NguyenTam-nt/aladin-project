// import MainSidebar from "./components/MainSidebar";

import FabComponent from "@components/fab";
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeaderAdmin from "./components/HeaderAdmin";

const DefaultLayout = ({ children }: { children: JSX.Element }) => {
  const router = useLocation().pathname.includes("admin");

  return (
    <div className="min-h-screen bg-background max-w-[1920px] mx-auto relative">
      {!router ? <Header /> : <HeaderAdmin />}

      <div className="min-h-[800px]">
        {/* new changes 22/4 2022*/}
        {/* <Outlet /> */}
        {children}
      </div>
      <Footer />
      {!router ? <FabComponent /> : <></>}
    </div>
  );
};

export default DefaultLayout;
