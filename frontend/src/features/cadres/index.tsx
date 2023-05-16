import NewsHeader from "@features/news/components/NewsHeader";
import CadresList from "./components/CadresList";
import Pagination from "@features/news/components/Paginnation";


const CadresPage = () => {
  return (
    <div className="w-rp  justify-between items-center  pb-[120px]">
      <NewsHeader></NewsHeader>
      <CadresList></CadresList>

    </div>
  );
};

export default CadresPage;
