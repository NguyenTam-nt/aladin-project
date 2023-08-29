import PolicyForm from "@components/Form/PolicyForm";
import LoadingScreen from "@components/LoadingScreen";
import useI18n from "@hooks/useI18n";
import { Policy } from "@pages/AdminPage/ManagePolicy";
import PolicyServices from "@services/PolicyServices";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PolicyEdit() {
  const { id } = useParams();
  const [policy, setPolicy] = useState<Policy>();
  const [loading, setLoading] = useState<boolean>(false);
  const { lang } = useI18n();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await PolicyServices.getById(id);
        if (response.status == 200) {
          const data = response.data;
          if (lang === 'ksl') {
            const policy: Policy = {
              id: data.id,
              title: data.titleKr,
              describe: data.describeKr,
              content: data.contentKr,
            };
            setPolicy(policy);
          } else {
            const policy: Policy = {
              id: data.id,
              title: data.titleVn,
              describe: data.describeVn,
              content: data.contentVn,
            };
            setPolicy(policy);
          }
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
      <h2 className="titlePage mb-4 px-10">Chỉnh sửa chính sách</h2>
      <PolicyForm policy={policy}/>
    </div>
  );
}

export default PolicyEdit;
