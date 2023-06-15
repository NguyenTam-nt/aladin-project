
import React, { useContext } from "react";
import { Button } from "./Button";

type Props = {
    onSubmit?: () => void,
    isAdd?: boolean
}

export const GroupButtonAdmin = ({onSubmit, isAdd = true}:Props) => {
    
  return (
    <div className="flex justify-end items-center mt-[24px]">
      <Button
       type="button"
        // onClick={hideModal}
        text="button._cancel"
        color="empty"
        className="!w-[120px] border border-br_E9ECEF mr-[24px]"
      />
      <Button type="submit" onClick={() => onSubmit?.()}  text={isAdd ? "button._save" : "button._save"} color="primary" className="!w-[120px]" />
    </div>
  );
};
