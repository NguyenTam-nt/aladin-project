import InfoContactForm from "@components/Form/InfoContactForm";
import LoadingScreen from "@components/LoadingScreen";
import ContactServices, { DataContactInfo } from "@services/ContactServices";
import { useEffect, useState } from "react";

function ManageInfoContact() {
  const [infoContact, setInfoContacat] = useState<DataContactInfo>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await ContactServices.getInfo();
        const inforContactData = response.data.stores.map((item) => {
          return {
            address: item.address,
            linkGgMap: item.linkGgMap,
          };
        });
        setInfoContacat({
          ...response.data,
          stores: inforContactData,
        });
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
      <h2 className="titlePage mb-4">Thông tin trang Liên hệ</h2>
      <InfoContactForm infoContact={infoContact} />
    </div>
  );
}

export default ManageInfoContact;
