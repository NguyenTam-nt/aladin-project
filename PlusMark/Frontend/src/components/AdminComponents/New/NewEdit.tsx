import NewForm from "@components/Form/NewForm";
import LoadingScreen from "@components/LoadingScreen";
import { New } from "@pages/Newspage/ManageNews";
import NewsServices from "@services/NewsServices";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function NewEdit() {
  const { id } = useParams();
  const [post, setPost] = useState<New>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await NewsServices.getById(id);
        if (response.status == 200) {
          const data = response.data;
          setPost(data);
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
    <div>
      <h3 className="text-title font-semibold text-main mt-9 mb-11">
        Sửa bài viết
      </h3>
      <NewForm post={post} />
    </div>
  );
}
