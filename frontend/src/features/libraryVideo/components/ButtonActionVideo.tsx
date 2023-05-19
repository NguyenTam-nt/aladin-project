import { Button } from '@components/Button';
import React from 'react';


export const ButtonActionVideo = () => {
  return (
    <>
      <Button
        color="primary"
        text="button.watch_now"
        className="!w-[150px] flex justify-center  bg-secondary !h-[40px] !py-[2px] !text-_16"
      />
      <Button
        className="!w-[150px] flex justify-center  bg-transparent border-secondary border-[1px] !h-[40px] !py-[2px] !text-_16 ml-[24px]"
        text="button.share"
        color="empty"
      />
    </>
  );
};