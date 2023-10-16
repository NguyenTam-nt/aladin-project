import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IProviceState, setInfoProvice} from './ProviceSlice';
import {RootState} from '..';

export const useHandleAddProvice = () => {
  const dispatch = useDispatch();
  return useCallback((data: IProviceState) => {
    dispatch(setInfoProvice(data));
  }, []);
};

export const useListItemProvice = () => {
  const listItemProvice = useSelector(
    (appState: RootState) => appState.infoProvice
  );
  return listItemProvice;
};
