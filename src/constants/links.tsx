import {useLinkProps, useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren, useCallback} from 'react';
import {TouchableOpacity} from 'react-native';

// export type RouteProps = {
//   screen: string;
//   params?: {[k: string]: string | null | undefined};
// };

export const NavLink = ({
  to,
  action,
  children,
  handleOnPress,
  type,
  disabled = false,
  ...rest
}: PropsWithChildren<any>) => {
  const {onPress, ...props} = useLinkProps({to, action});

  const handleAction = async () => {
    if (type === 'SEARCH') {
      await handleOnPress?.();
      const timeout = setTimeout(() => {
        onPress();
      }, 400);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      handleOnPress?.();
      onPress();
    }
  };
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={handleAction}
      {...props}
      {...rest}>
      {children}
    </TouchableOpacity>
  );
};

export const useAlert = (params?: {[k: string]: string | null | undefined}) => {
  const navigation = useNavigation();
  return useCallback(
    (extraParams?: {[k: string]: string | null | undefined}) => {
      //@ts-ignore
      navigation.navigate('popup', {...params, ...extraParams});
    },
    [navigation, params],
  );
};

// export const useNavigationLink = (
//   route: string,
//   params?: { [k: string]: string | null | undefined }
// ) => {
//   const navigation = useNavigation();
//   return useCallback(() => {
//     navigation.navigate(route, params);
//   }, [navigation, route, params]);
// };

// export const NavLink = ({
//   onPress,
//   children,
//   ...props
// }: React.PropsWithChildren<RouteProps & { onPress?: () => void }>) => {
//   const navigate = useNavigationLink(props.route, props.params);
//   return (
//     <TouchableOpacity
//       onPress={() => {
//         if (onPress) {onPress();}
//         navigate();
//       }}>
//       {children}
//     </TouchableOpacity>
//   );
// };
