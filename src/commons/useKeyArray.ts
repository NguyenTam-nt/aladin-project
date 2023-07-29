import {useCallback} from 'react';

export const useKeyArray = () => {
  const keyExtractor = useCallback((_: any, index: number) => {
    return index.toString();
  }, []);

  return {
    keyExtractor,
  };
};
