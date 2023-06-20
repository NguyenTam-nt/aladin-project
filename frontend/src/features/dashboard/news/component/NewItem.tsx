import { Avatar } from "@components/Avatar";
import { prefixRootRoute } from "@constants/index";
import { pathsAdmin } from "@constants/routerManager";
import { useModalContext } from "@contexts/hooks/modal";
import { Button } from "@features/dashboard/components/Button";
import { DiglogComfirmDelete } from "@features/dashboard/components/DiglogComfirmDelete";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  id: number | string;
}
const NewItem = memo((props: Props) => {
  const navigation = useNavigate();
  const { setElementModal } = useModalContext();
  const handleNavigation = () => {
    navigation(
      `${prefixRootRoute.admin}/${pathsAdmin.news.prefix}/${props.id}`
    );
  };

  const handleDeleteModal = () => {
    setElementModal(<DiglogComfirmDelete message="news.message_delete" />);
  };
  return (
    <div className="bg-white h-[434px] flex flex-col">
      <img
        alt=""
        className="w-full object-cover h-[288px]"
        src="https://s3-alpha-sig.figma.com/img/b4d9/67c3/24f9f156f94a39819b1596db70ac6c6f?Expires=1687737600&Signature=Hqb8Tm2FI0xNkntGDKF3BrdINLVfZBBmujSp00YJVMVNHl2MArc5YEU5QukOH3KSCZdifWBWtpex3LU-jjG9di7gFeYUSRJqQ42gp2WMmbSQNmpj~qFbZjD8U5ws5trNFhwAijBunIVt347pFIa7Cg2jC46u5pf9JXCkc0HKVyMch8HhOcKdoN6LpDEidwMMR-LMVrGKGPkdfuWTwNbuUHuBIsZztFwLBYEFGoywc0gi2kodkUWkalG1t~QSWIiyqepjtH8JwUKE9kvVcax1kjzOQGa45Kzvwd~IJm9bXbLeDSGqUdo2d9obLeW9az-qGH6VieM-81vMPx2o45DuWA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
      />
      <div className="p-4 flex-1 flex flex-col">
        <p className=" line-clamp-2 text-_16 font-semibold text-text_black">
          Pretium nec senectus ut urna. Eleifend in interdum nisi vivamus.
        </p>
        <p className="mb-6 text-sm leading-22 font-normal text-text_secondary">
          25/12/2023
        </p>
        <div className="mt-auto">
          <Button
            onClick={handleNavigation}
            color="empty"
            className=""
            text="news.update"
          />
          <Button
            onClick={handleDeleteModal}
            color="empty"
            className="mt-2 border-bg_E73F3F text-bg_E73F3F"
            text="news.delete"
          />
        </div>
      </div>
    </div>
  );
});

export default NewItem;
