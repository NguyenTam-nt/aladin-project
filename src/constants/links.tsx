import {useLinkProps, useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';
import {TouchableOpacity} from 'react-native';

export type RouteProps = {
  screen: string;
  params?: {[k: string]: string | null | undefined};
};

export const NavLink = ({
  to,
  action,
  children,
  ...rest
}: PropsWithChildren<any>) => {
  const {onPress, ...props} = useLinkProps({to, action});

  return (
    <TouchableOpacity onPress={onPress} {...props} {...rest}>
      {children}
    </TouchableOpacity>
  );
};
