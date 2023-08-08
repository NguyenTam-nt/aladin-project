import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {DIMENSION} from '@constants';
import Animated, {
  interpolate,
  runOnJS,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ICCloseModal} from 'src/assets/icons/ICCloseModal';
import {getValueForDevice} from 'src/commons/formatMoney';

export const NoticeItem = React.memo(() => {
  const [data, setData] = useState<string[]>([]);
  const ref = useRef<any>(null);
  const numberCheck = useRef<number>(0);
  const pushItem = () => {
    const newItem = `Item ${numberCheck.current + 1}`;
    numberCheck.current += 1;
    const newData = [...data, newItem].slice(-3);
    setData(newData);
    setTimeout(() => {
      ref?.current?.scrollToEnd({animated: true});
    }, 300);
  };
  const removeItem = useCallback(
    (item: string) => {
      const newData = [...data];
      const findIndex = newData.indexOf(item);
      newData.splice(findIndex, 1);
      setData(newData);
    },
    [data],
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={pushItem}>
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>
      <Animated.FlatList
        ref={ref}
        data={data}
        inverted
        renderItem={({item, index}) => (
          <RenderItem item={item} removeItem={removeItem} />
        )}
        // scrollEnabled={false}
        keyExtractor={item => item.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
});

const RenderItem = React.memo(
  ({item, removeItem}: {item: string; removeItem: (value: string) => void}) => {
    const defaultWidth = getValueForDevice(
      (DIMENSION.width - 216 - 16 * 3) / 3,
      DIMENSION.width * 0.7,
    );
    const translateX = useSharedValue(defaultWidth);
    const widthItem = useSharedValue(defaultWidth);

    const animatedStyle = useMemo<
      StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>
    >(() => {
      let inputRange = [defaultWidth + 1, defaultWidth, 0];
      let outputRange = [0, 1, 0];
      return {
        transform: [{translateX: translateX}],
        width: widthItem,
        opacity: interpolate(widthItem.value, inputRange, outputRange),
      };
    }, [translateX, widthItem, defaultWidth]);

    const Check = () => {
      removeItem(item);
      widthItem.value = defaultWidth + 1;
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

    const delteItem = () => {
      widthItem.value = withTiming(
        0,
        {
          duration: 300,
        },
        finished => {
          if (finished) {
            runOnJS(Check)();
          }
        },
      );
    };

    return (
      <Animated.View style={[styles.noticeItem, animatedStyle]}>
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
              Bếp từ chối huỷ món {item}
            </TextCustom>
          </View>
          <View style={{paddingLeft: 5, marginTop: 15}}>
            <TextCustom
              fontSize={14}
              color={defaultColors.c_222124}
              weight="700">
              Lý do <TextCustom> Bếp từ chối huỷ</TextCustom>
            </TextCustom>
          </View>
        </View>
        <TouchableOpacity onPress={delteItem}>
          <ICCloseModal color={defaultColors.bg_5F5F61} />
        </TouchableOpacity>
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
      DIMENSION.width * 0.7,
    ),
    columnGap: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 8,
    overflow: 'hidden',
  },
  styleGroupText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'blue',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: 180,
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
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
