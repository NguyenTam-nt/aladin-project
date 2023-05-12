import NewsHeader from "@features/news/components/NewsHeader";
import CadresList from "./components/CadresList";


const CadresPage = () => {
  return (
    <div className="w-rp  justify-between items-center  pb-[120px]">
      <NewsHeader></NewsHeader>
      <CadresList></CadresList>
    </div>
  );
};

export default CadresPage;
