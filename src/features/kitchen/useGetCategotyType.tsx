import {useContext} from 'react';
import {KitchenContext} from '.';

export const useGetCategotyType = () => {
  const {currentType} = useContext(KitchenContext);
  return {
    currentType,
  };
};
