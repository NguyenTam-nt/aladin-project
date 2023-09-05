import { useSelector } from 'react-redux';
import { RootState } from '..';

export const useToken = () => {
  const token = useSelector(
    (appState: RootState) => appState.appInfoReducer.token,
  );
  return token;
};

export const useRefreshToken = () => {
  const refresh_token = useSelector(
    (appState: RootState) => appState.appInfoReducer.refreshToken,
  );
  return refresh_token;
};

export const useUserInfo = () => {
    const user_info = useSelector(
      (appState: RootState) => appState.appInfoReducer.userInfo,
    );
    return user_info;
  };


  export const useIsGetTable = () => {
    const isGetTable = useSelector(
      (appState: RootState) => appState.appInfoReducer.isGetTable,
    );
    return isGetTable;
  };




