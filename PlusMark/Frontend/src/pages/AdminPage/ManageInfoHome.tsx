import {
  UtilHome1Icon,
  UtilHome2Icon,
  UtilHome3Icon,
  UtilHome4Icon,
} from "@assets/icons";
import ManageInfoForm from "@components/Form/ManageInfoForm";
import LoadingScreen from "@components/LoadingScreen";
import HomeServices, { HomeContent } from "@services/HomeServices";
import { useEffect, useState } from "react";

function ManageInfoHome() {
  const policyList = [
    {
      id: "content1",
      title: "",
      content: "",
      icon: <UtilHome1Icon width={50} height={50} />,
    },
    {
      id: "content2",
      title: "",
      content: "",
      icon: <UtilHome2Icon width={50} height={50} />,
    },
    {
      id: "content3",
      title: "",
      content: "",
      icon: <UtilHome3Icon width={50} height={50} />,
    },
    {
      id: "content4",
      title: "",
      content: "",
      icon: <UtilHome4Icon width={50} height={50} />,
    },
  ];
  const [homeContents, setHomeContents] =
    useState<Array<HomeContent>>(policyList);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await HomeServices.getUtil();
        if (response.status == 200) {
          const data = response.data.data;
          policyList.map((item, index) => {
            item.title = data[index].title;
            item.content = data[index].content;
          });
          setHomeContents(policyList);
        }
      } catch (ex) {
        console.log(ex);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="pt-9 pb-10px flex-1 xl:pl-8">
      <h2 className="titlePage mb-4">Thông tin trang Trang chủ</h2>
      <div>
        <p className="text-lg font-normal text-[#F45538] mb-5">
          Chính sách bán hàng
        </p>
        <ManageInfoForm homeContents={homeContents} />
      </div>
    </div>
  );
}

export default ManageInfoHome;
