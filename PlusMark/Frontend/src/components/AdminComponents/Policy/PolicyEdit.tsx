import PolicyForm from "@components/Form/PolicyForm";
import LoadingScreen from "@components/LoadingScreen";
import useI18n from "@hooks/useI18n";
import { Policy, PolicyWithLang } from "@pages/AdminPage/ManagePolicy";
import PolicyServices from "@services/PolicyServices";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PolicyEdit() {
  const { id } = useParams();
  const [policy, setPolicy] = useState<PolicyWithLang>();
  const [loading, setLoading] = useState<boolean>(false);
  const { lang, t } = useI18n();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await PolicyServices.getById(id);
        const data: any = response;
        const policy: PolicyWithLang = {
          id: data.id,
          titleKr: data.titleKr,
          describeKr: data.describeKr,
          contentKr: data.contentKr,
          titleVn: data.titleVn,
          describeVn: data.describeVn,
          contentVn: data.contentVn,
        };
        setPolicy(policy);
      }
      catch (ex) {
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
      <h2 className="titlePage mb-4 px-10">{t("text.title.title_edit_policy")}</h2>
      <PolicyForm policy={policy} />
    </div>
  );
}

export default PolicyEdit;
