import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {hanleChangeLanguage, language} from './slice';
import {RootState} from '..';

export const useHandleChangeLanguage = () => {
  const dispatch = useDispatch();
  return useCallback((data: language) => {
    console.log('data', data);

    dispatch(hanleChangeLanguage(data));
  }, []);
};

export const useGetLanguage = () => {
  const languageItem = useSelector(
    (appState: RootState) => appState.multiLangage,
  );
  return languageItem;
};
