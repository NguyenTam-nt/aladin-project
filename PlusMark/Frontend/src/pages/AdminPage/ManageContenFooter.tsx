import ContentFooterForm from "@components/Form/ContentFooterForm";
import LoadingScreen from "@components/LoadingScreen";
import FooterServices, { ContentFooter } from "@services/FooterService";
import { useEffect, useState } from "react";

function ManageContentFooter() {
  const [contentFooter, setContentFooter] = useState<ContentFooter>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await FooterServices.get();
        setContentFooter(response);
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
      <ContentFooterForm contentFooter={contentFooter} />
    </div>
  );
}

export default ManageContentFooter;
