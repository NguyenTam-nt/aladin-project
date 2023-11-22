import { useSelector } from 'react-redux';
import { RootState } from '..';

export const useEnableAuth = () => {
    const token = useSelector(
      (appState: RootState) => appState.enableAuthSlice.enableAuth,
    );
    return token;
  };
