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
  useAnimatedStyle,
  useSharedValue,
  useWorkletCallback,
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
    removeItem: (item: IDataNoti) => void
  }) => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 40,
          right: 0,
          flexDirection: isTabletDevice ? 'row' : 'column',
          maxWidth: isTabletDevice ? DIMENSION.width - 216 : DIMENSION.width,
          gap : 12,
        }}>
        {data.map(item => {
          return (
            <RenderItem key={item.key} item={item} removeItem={removeItem} />
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
      DIMENSION.width * 0.9,
    );

    const widthItem = useSharedValue(0);
    const heightItem = useSharedValue(0);
    const containerAnimated = useAnimatedStyle(() => {
      return isTabletDevice
        ? {
            width: widthItem.value,
          }
        : {height: heightItem.value};
    }, []);

    const Check = () => {
      removeItem(item);
    };
    const delteItem = () => {
      if (isTabletDevice) {
        widthItem.value = withTiming(0, {duration: 400}, isFinished => {
          if (isFinished) {
            runOnJS(Check)();
          }
        });
      } else {
        heightItem.value = withTiming(0, {duration: 400}, isFinished => {
          if (isFinished) {
            runOnJS(Check)();
          }
        });
      }
    };
    useEffect(() => {
       if (isTabletDevice) {
        widthItem.value = withTiming(defaultWidth, {duration: 400});
       } else {
        heightItem.value = withTiming(102 ,  {duration: 400});
       }
      const timeout = setTimeout(() => {
        delteItem();
      }, 9000);
      return () => {
        clearTimeout(timeout);
      };
    }, [item.key]);

    return (
      <Animated.View
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          },
          containerAnimated,
        ]}>
        <Animated.View style={[styles.noticeItem]}>
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
            <View style={{paddingLeft: 5, marginTop: 15, paddingBottom: 5}}>
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
    marginHorizontal: getValueForDevice(16 , '2.5%') ,
  },
  styleGroupText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'transparent',
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
