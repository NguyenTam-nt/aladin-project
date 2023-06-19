import { Button } from "@features/dashboard/components/Button";
import React from "react";

export const PlaceItem = ({data}: any) => {
  return (
    <div className="h-auto flex flex-col p-4 bg-white">
      <p className=" text-_16 font-semibold text-text_black line-clamp-2">
        {data.name}
      </p>
      <p className=" line-clamp-1 mt-1 text-_14 mr-4 text-text_secondary">
        {data.phone}
      </p>
      <div className="mt-4">
        <Button color="empty" className="" text="adminPlace.update_btn" />
        <Button color="empty"
          className="mt-2 border-bg_E73F3F text-bg_E73F3F"
          text="adminPlace.delete_btn"
        />
      </div>
    </div>
  );
};
