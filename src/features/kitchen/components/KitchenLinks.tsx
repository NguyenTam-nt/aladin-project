import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {memo, useCallback, useMemo} from 'react';
import {routerKitchens, routerPath} from '../../../navigations/DrawerKitchen';
import {useNavigation, useRoute} from '@react-navigation/native';
import {defaultColors} from '@configs';
import {TextCustom} from '@components';
import {ICSort} from '../../../assets/icons/ICSort';
import {ICDown} from '../../../assets/icons/ICDown';
import {MultipleScreenView} from 'src/components/MultipleScreenView';

type Props = {
  renderRight?: JSX.Element
};

const KitchenLinks = memo(({renderRight}: Props) => {
  const navigation = useNavigation();
  const router = useRoute();
  const currentRoute = useMemo(() => {
    return router.name;
  }, [router]);

  const handleNavigate = useCallback((slug: string) => {
    //@ts-ignore
    navigation.navigate(slug);
  }, []);
  return (
    <>
      <View style={styles.groupLink}>
        <View style={styles.groupLinkItem}>
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
                    color={
                      isActive ? defaultColors._EA222A : defaultColors.c_0000
                    }>
                    {item.name}
                  </TextCustom>
                </TouchableOpacity>
              );
            })}
        </View>
        <MultipleScreenView
          tableVew={
            <View style={styles.pt_10}>{renderRight ? renderRight : null}</View>
          }
        />
      </View>
      <MultipleScreenView
          phoneView={
            <View style={styles.pt_18}>{renderRight ? renderRight : null}</View>
          }
        />
    </>
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
  groupLinkItem: {
    flexDirection: 'row',
    columnGap: 20,
  },
  groupLink: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.bg_EFEFEF,
    height: 77,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  styleLinkButton: {
    paddingBottom: 10,
    borderBottomWidth: 4,
  },
  styleBtnSort: {
    flexDirection: 'row',
    columnGap: 8,
    width: 'auto',
    height: 40,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: defaultColors.bg_A1A0A3,
    borderRadius: 4,
  },
  pt_10: {
    paddingBottom: 10,
  },
  pt_18: {
    paddingTop: 18,
  },
});

export default KitchenLinks;
