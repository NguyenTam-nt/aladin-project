import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {memo, useCallback, useMemo} from 'react';
import {routerKitchens, routerPath} from '../../../navigations/DrawerKitchen';
import {useNavigation, useRoute} from '@react-navigation/native';
import {defaultColors} from '@configs';
import {TextCustom} from '@components';

const KitchenLinks = memo(() => {
  const navigation = useNavigation();
  const router = useRoute()
  const currentRoute = useMemo(() => {
    return router.name;
  }, [router]);

  const handleNavigate = useCallback((slug: string) => {
    //@ts-ignore
    navigation.navigate(slug);
  }, []);
  return (
    <View style={styles.groupLink}>
      {routerKitchens
        .find(item => item.name === routerPath.kitchen)
        ?.childs.map(item => {
          const isActive = currentRoute === item.slug;
          return (
            <TouchableOpacity
              onPress={() => handleNavigate(item.slug)}
              key={item.slug}
              style={[
                styles.styleLinkButton,
                {
                  borderBottomColor: isActive
                    ? defaultColors._EA222A
                    : 'transparent',
                },
              ]}>
              <TextCustom
                fontSize={16}
                weight="600"
                color={isActive ? defaultColors._EA222A : defaultColors.c_0000}>
                {item.name}
              </TextCustom>
            </TouchableOpacity>
          );
        })}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultColors.c_fff,
    padding: 32,
  },
  groupNotice: {
    flexDirection: 'row',
    columnGap: 16,
  },
  noticeItem: {
    borderLeftWidth: 4,
    borderLeftColor: defaultColors._EA222A,
    borderRadius: 4,
    height: 60,
    flex: 1,
    backgroundColor: defaultColors.bg_FCEAEA,
    maxWidth: 376,
    columnGap: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  groupLink: {
    flexDirection: 'row',
    columnGap: 20,
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.bg_EFEFEF,
    marginTop: 37,
  },
  styleLinkButton: {
    paddingBottom: 10,
    borderBottomWidth: 4,
  },
});

export default KitchenLinks;
