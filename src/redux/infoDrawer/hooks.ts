import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '..';
import { setShowDrawerFloor } from './slice';



export const useShowDrawerFloor = () => {
  const dispatch = useDispatch();
  return useCallback((isShow: boolean) => {
    dispatch(setShowDrawerFloor(isShow));
  }, []);
};

export const useIsShowDrawerFloor = () => {
  const isShowDrawerFloor = useSelector(
    (appState: RootState) => appState.infoDrawerSlice.showDrawerFloor,
  );
  return isShowDrawerFloor;
};
