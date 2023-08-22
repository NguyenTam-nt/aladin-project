import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '..';
import {setShowDrawerFloor} from './slice';

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
export const useIsShowActionCart = () => {
  const isShowActionCart = useSelector(
    (appState: RootState) => appState.infoDrawerSlice.showAction,
  );
  return isShowActionCart;
};

export const useFloorActive = () => {
  const floorDrawerActive = useSelector(
    (appState: RootState) => appState.infoDrawerSlice.floorDrawerActive,
  );
  return floorDrawerActive;
};

export const useAreaId = () => {
  const areaId = useSelector(
    (appState: RootState) => appState.infoDrawerSlice.areaId,
  );
  return areaId;
};


export const useAreaName = () => {
  const name = useSelector(
    (appState: RootState) => appState.infoDrawerSlice.nameArea,
  );
  return name;
};



