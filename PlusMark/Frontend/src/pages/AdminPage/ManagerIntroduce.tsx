import IntroduceForm from "@components/Form/IntroduceForm";
import LoadingScreen from "@components/LoadingScreen";
import IntroServices from "@services/IntroServices";
import { useEffect, useState } from "react";

interface Props {}

function ManagerIntroduce(props: Props) {
  const defaultContent =
    '{"entityMap": {}, "blocks": [{ "key": "637gr", "text": "", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }]}';
  const [content, setContent] = useState<string>(defaultContent);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await IntroServices.get();
        if (response.status == 200) {
          const data = response.data;
          setContent(data?.content);
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
    <div className="pt-9 pb-10px flex-1">
      <h2 className="titlePage mb-4">Giới thiệu</h2>
      <p className="text-normal font-bold text-main">Nội dung giới thiệu*</p>
      <IntroduceForm content={content} />
    </div>
  );
}

export default ManagerIntroduce;
