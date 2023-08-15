import { defaultColors } from '@configs';
import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { IMenuItem, IProductInCart } from 'src/api/products';
import { useQuatityValueRedux } from 'src/redux/cartOrder/hooks';
import { addItemToCart, updateItemProductInCart } from 'src/redux/cartOrder/slice';
import { ICAddQuanity } from '../assets/icons/ICAddQuanity';
import { ICSubtractionQuanity } from '../assets/icons/ICSubtractionQuanity';

const QuantityUpdate = ({
  value,
  data,
  updateList,
  isUnAddList = false,
  max = 999,
  updateData,
}: {
  value?: number
  data?: IMenuItem | IProductInCart
  updateList?: boolean
  isUnAddList?: boolean
  max?: number
  updateData? : (value: IProductInCart) => void
}) => {
  let number = useRef<number>(0);
  const textInputRef = useRef<TextInput>(null);
  const viewRef = useRef<View>(null);
  const dispatch = useDispatch();
  const updateNumber = useQuatityValueRedux(data?.id);
  const setValueToText = useCallback(
    (value: number) => {
      textInputRef.current?.setNativeProps({text: value.toString()});
      if (data) {
        if (updateData) {
          updateData({
            ...(data as IProductInCart),
            numProduct: value,
          });
        } else {
          dispatch(addItemToCart({quantity: value, ...(data as IMenuItem)}));
        }
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
    [data, dispatch, updateData],
  );


  useEffect(() => {
    if (updateNumber !== undefined) {
      number.current = updateNumber;
      textInputRef.current?.setNativeProps({text: updateNumber.toString()});
    } else {
      number.current = 0;
      textInputRef.current?.setNativeProps({text: ''});
      viewRef.current?.setNativeProps({
        style: {
          opacity: 0,
          display: 'none',
        },
      });
    }
  }, [updateNumber]);


  useEffect(() => {
    if (value) {
      number.current = value;
      setValueToText(value);
    }
  }, [value ,data]);

  const AddQuality = useCallback(() => {
    if (isUnAddList) {return;}
    if (max && number.current >= max) {
      number.current = max;
      setValueToText(number.current);
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
  }, [number, data ,updateData]);

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
