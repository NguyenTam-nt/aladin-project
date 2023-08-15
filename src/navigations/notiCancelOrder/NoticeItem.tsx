import { TextCustom } from '@components';
import { defaultColors, isTabletDevice } from '@configs';
import React, { useEffect, useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { DIMENSION } from '@constants';
import Animated, {
  runOnJS,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ICCloseModal } from 'src/assets/icons/ICCloseModal';
import { getValueForDevice } from 'src/commons/formatMoney';
import { IDataNoti } from './Notice';

export const NoticeItem = React.memo(
  ({
    data,
    removeItem,
  }: {
    data: IDataNoti[]
    ref: React.MutableRefObject<any>
    removeItem: (item: IDataNoti) => void
  }) => {
    return (
      <View style={{ position : 'absolute' , top : 40 , right : 0 , flexDirection : 'row'}}>
        {data.reverse().map((item) => {
          return (
            <RenderItem item={item} removeItem={removeItem}/>
          );
        })}
      </View>
    );
  },
);

const RenderItem = React.memo(
  ({
    item,
    removeItem,
  }: {
    item: IDataNoti
    removeItem: (value: IDataNoti) => void
  }) => {
    const defaultWidth = getValueForDevice(
      (DIMENSION.width - 216 - 16 * 3) / 3,
      DIMENSION.width * 0.7,
    );
    const translateX = useSharedValue(defaultWidth);
    const widthItem = useSharedValue(defaultWidth);
    const animatedStyle = useMemo<
      StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>
    >(() => {
      return {
        transform: [{translateX: translateX}],
      };
    }, [translateX, widthItem]);

   const animationContainer = useMemo<
     StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>
   >(() => {
     return {
       width: widthItem,
     };
   }, [widthItem]);

   const Check = () => {
     removeItem(item);
   };
   const delteItem = () => {
     Check();
   };

    useEffect(() => {
      translateX.value = withTiming(
        0,
        {
          duration: 300,
        },
        () => {
          translateX.value = 0;
        },
      );
    }, []);

    return (
      <Animated.View
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 8,
            overflow: 'hidden',
          },
          animationContainer,
        ]}>
        <Animated.View style={[styles.noticeItem,animatedStyle]}>
          <View style={{width: defaultWidth * 0.8}}>
            <View style={styles.styleGroupText}>
              <ICCloseModal
                height={32}
                width={32}
                color={defaultColors._EA222A}
              />
              <TextCustom
                fontSize={16}
                color={defaultColors.c_222124}
                weight="600">
                Bếp từ chối huỷ món {item.key}
              </TextCustom>
            </View>
            <View style={{paddingLeft: 5, marginTop: 15 , paddingBottom : 5}}>
              <TextCustom
                fontSize={14}
                numberOfLines={2}
                color={defaultColors.c_222124}
                weight="700">
                Lý do <TextCustom> {item.reason}</TextCustom>
              </TextCustom>
            </View>
          </View>
          <TouchableOpacity onPress={delteItem}>
            <ICCloseModal color={defaultColors.bg_5F5F61} />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  noticeItem: {
    borderLeftWidth: 4,
    borderRadius: 4,
    borderColor: defaultColors._EA222A,
    height: 102,
    backgroundColor: defaultColors.c_fff,
    width: getValueForDevice(
      (DIMENSION.width - 216 - 16 * 3) / 3,
      DIMENSION.width * 0.9,
    ),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal : 16,

  },
  styleGroupText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
   backgroundColor : 'transparent',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 10,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 18,
  },
  removeButton: {
    backgroundColor: '#ff6b6b',
    padding: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
