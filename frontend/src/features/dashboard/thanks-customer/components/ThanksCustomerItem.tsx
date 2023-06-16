import { Avatar } from "@components/Avatar";
import { prefixRootRoute } from "@constants/index";
import { pathsAdmin } from "@constants/routerManager";
import { useModalContext } from "@contexts/hooks/modal";
import { Button } from "@features/dashboard/components/Button";
import { DiglogComfirmDelete } from "@features/dashboard/components/DiglogComfirmDelete";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

export const ThanksCustomerItem = memo(() => {
    const navigation = useNavigate();
    const { setElementModal } = useModalContext();
    const handleNavigation = () => {
        navigation(`${prefixRootRoute.admin}/${pathsAdmin.thankCustomer.prefix}/123`);
      };
    
      const handleDeleteModal = () => {
        setElementModal(
          <DiglogComfirmDelete message="customer.message_delete" />
        );
      };
  return (
    <div className="bg-white h-[434px] flex flex-col">
      <img
        alt=""
        className="w-full object-cover h-[162px]"
        src="https://s3-alpha-sig.figma.com/img/b4d9/67c3/24f9f156f94a39819b1596db70ac6c6f?Expires=1687737600&Signature=Hqb8Tm2FI0xNkntGDKF3BrdINLVfZBBmujSp00YJVMVNHl2MArc5YEU5QukOH3KSCZdifWBWtpex3LU-jjG9di7gFeYUSRJqQ42gp2WMmbSQNmpj~qFbZjD8U5ws5trNFhwAijBunIVt347pFIa7Cg2jC46u5pf9JXCkc0HKVyMch8HhOcKdoN6LpDEidwMMR-LMVrGKGPkdfuWTwNbuUHuBIsZztFwLBYEFGoywc0gi2kodkUWkalG1t~QSWIiyqepjtH8JwUKE9kvVcax1kjzOQGa45Kzvwd~IJm9bXbLeDSGqUdo2d9obLeW9az-qGH6VieM-81vMPx2o45DuWA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
      />
      <div className="p-[16px] flex-1 flex flex-col">
        <p className=" line-clamp-2 text-_16 font-semibold text-text_black">
          Pretium nec senectus ut urna. Eleifend in interdum nisi ...
        </p>
        <div className="mt-[16px] flex items-center gap-x-2">
          <Avatar
            url="https://s3-alpha-sig.figma.com/img/987a/80a0/8a70f3249e1eaa3ed3c80d30c163fb99?Expires=1687737600&Signature=XPIQJvMOJI7xENl~H53slBo5Q6ihitNOgxRZFXBiPSDK8NtHbrJSWPq6T09J6POCHuHhathBTTRCAQ-1fevvoX4NrD~4TLoRo8Nj8xB1T-h-i13DNpL0-zFSpNI9~dY8uUMIUNnca6FsmDdw~BtzFHjJYpJ74cNUqHIiysYqjhTb9VrtmfUcbkBtGkUKuuJVBHWfEqjtpn6Q1ZYeo~qQfuVkZy2YXNbXG~3gF7ppEj2I74KTM2ywpphwvga5RwPUNaskfKoKmKhHLT5bglHN3DZSfj0BqNqMHv44qKjr1B8rKEVHj4tXytvA2JD4BABXBEtSeP4djfzBbKNq6RIl-Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            size={48}
            name="Nguyễn Cường Phong"
          />
          <div>
            <p className="text-_16 font-semibold text-GreyPrimary">
              Nguyễn Cường Phong
            </p>
            <p className="text-_12 mt-1 font-normal text-text_secondary">
              UX/UI Designer
            </p>
          </div>
        </div>
        <div className="mt-auto">
          <Button
            onClick={handleNavigation}
            color="empty"
            className=""
            text="customer.update"
          />
          <Button
            onClick={handleDeleteModal}
            color="empty"
            className="mt-2 border-bg_E73F3F text-bg_E73F3F"
            text="customer.delete"
          />
        </div>
      </div>
    </div>
  );
})
