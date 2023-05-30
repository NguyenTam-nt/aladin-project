import { TranslateContext } from '@contexts/Translation';
import React, { useContext } from 'react';

const NotFound = () => {
    const {t} = useContext(TranslateContext)
  return (
    <div className="not-found w-full flex flex-col justify-center h-[500px]">
      <h1 className='text-center font-bold text-_32 text-text_C53434'>{t("common._404._title")}</h1>
      <p  className='text-center text-_24'>{t("common._404.sub_title")}</p>
    </div>
  );
};

export default NotFound;