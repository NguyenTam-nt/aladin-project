import {useCallback} from 'react';

export const useKeyArray = () => {
  const keyExtractor = useCallback((item: any, index: number) => {
    return `${item?.id ?? index}`;
  }, []);

  return {
    keyExtractor,
  };
};
