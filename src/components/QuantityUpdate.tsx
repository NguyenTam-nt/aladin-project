import {defaultColors} from '@configs';
import React, {useCallback, useEffect, useRef} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {ICAddQuanity} from '../assets/icons/ICAddQuanity';
import {ICSubtractionQuanity} from '../assets/icons/ICSubtractionQuanity';
import {addItemToCart} from 'src/redux/cartOrder/slice';
import { IMenuItem } from 'src/api/products';

const QuantityUpdate = ({
  value,
  data,
  updateList,
  isUnAddList = false,
  max = 999,
}: {
  value?: number
  data?: IMenuItem
  updateList?: boolean
  isUnAddList?: boolean
  max?: number
}) => {
  const number = useRef<number>(0);
  const textInputRef = useRef<TextInput>(null);
  const viewRef = useRef<View>(null);
  const dispatch = useDispatch();

  const setValueToText = useCallback(
    (value: number) => {
      textInputRef.current?.setNativeProps({text: value.toString()});
      if (data) {
        dispatch(addItemToCart({id: data.id, quantity: value, data: data}));
      }
      if (value === 0) {
        viewRef.current?.setNativeProps({
          style: {
            opacity: 0,
            display: 'none',
          },
        });
      } else {
        viewRef.current?.setNativeProps({
          style: {
            opacity: 1,
            display: 'flex',
          },
        });
      }
    },
    [data, dispatch],
  );

  useEffect(() => {
    if (value) {
      number.current = value;
      setValueToText(number.current);
    }
  }, [value]);
  const AddQuality = useCallback(() => {
    if(isUnAddList) return
    if (max && number.current === max) {
      return;
    }
    number.current += 1;

    setValueToText(number.current);
  }, [number, data, max, isUnAddList]);

  const Subtraction = useCallback(() => {
    if (number.current > 0) {
      number.current -= 1;
      setValueToText(number.current);
    } else {
      number.current = 0;
      setValueToText(number.current);
    }
  }, [number, data]);

  return (
    <View style={styles.container}>
      <View
        ref={viewRef}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          opacity: 0,
          display: 'none',
        }}>
        <TouchableWithoutFeedback
          style={styles.button}
          onPress={Subtraction}
          onLongPress={() => {
            number.current = 0;
            setValueToText(number.current);
          }}>
          <ICSubtractionQuanity />
        </TouchableWithoutFeedback>
        <TextInput
          ref={textInputRef}
          style={styles.textNumber}
          value={number.current.toString()}
          editable={false}
        />
      </View>
      <TouchableWithoutFeedback style={styles.button} onPress={AddQuality}>
        <ICAddQuanity />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textNumber: {
    color: defaultColors.c_fff,
    fontSize: 16,
    fontWeight: '600',
    width: 50,
    textAlign: 'center',
    maxHeight : 30,
    padding : 5,
  },
  button: {
    height: 30,
    padding : 5,
  },
});

export default QuantityUpdate;
