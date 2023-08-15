import PolicyForm from "@components/Form/PolicyForm";
import LoadingScreen from "@components/LoadingScreen";
import { Policy } from "@pages/AdminPage/ManagePolicy";
import PolicyServices from "@services/PolicyServices";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PolicyEdit() {
  const { id } = useParams();
  const [policy, setPolicy] = useState<Policy>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await PolicyServices.getById(id);
        if (response.status == 200) {
          const data = response.data;
          setPolicy(data);
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
      <h2 className="titlePage mb-4">Chỉnh sửa chính sách hỗ trợ khách hàng</h2>
      <PolicyForm policy={policy} />
    </div>
  );
}

export default PolicyEdit;
