import {defaultColors, isTabletDevice} from '@configs';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {IMenuItem, IProductInCart} from 'src/api/products';
import {useQuatityValueRedux} from 'src/redux/cartOrder/hooks';
import {
  addItemToCart,
  updateItemProductInCart,
} from 'src/redux/cartOrder/slice';
import {ICAddQuanity} from '../assets/icons/ICAddQuanity';
import {ICSubtractionQuanity} from '../assets/icons/ICSubtractionQuanity';
import {ICCloseModal} from 'src/assets/icons/ICCloseModal';
import ButtonAction from './ButtonAction/ButtonAction';
import ModalCustom from './ModalCustom';
import {useModal} from 'src/hooks/useModal';
import {DIMENSION, isAndroid} from '@constants';

const QuantityUpdate = ({
  value,
  data,
  updateList,
  isUnAddList = false,
  max = 999,
  updateData,
  hotpotType,
}: {
  value?: number
  data?: IMenuItem | IProductInCart
  updateList?: boolean
  isUnAddList?: boolean
  max?: number
  updateData?: (value: IProductInCart) => void
  hotpotType?: boolean
}) => {
  let number = useRef<number>(0);
  const textInputRef = useRef<TextInput>(null);
  const viewRef = useRef<View>(null);
  const dispatch = useDispatch();
  const updateNumber = useQuatityValueRedux(data?.id);
  const modalEditInventory = useModal();
  const [newInventory, setNewInventory] = useState<string>('');
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
  }, [value, data]);

  const AddQuality = useCallback(() => {
    if (isUnAddList) {
      return;
    }
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
  }, [number, data, updateData]);

  const onSubmitForm = () => {
    if (Number(newInventory) > max) {
      number.current = max;
      setValueToText(max);
    } else {
      number.current = Number(newInventory);
      setValueToText(Number(newInventory));
    }
    modalEditInventory.handleHidden();
  };

  const openModal = () => {
    if (!hotpotType) {
      modalEditInventory.handleShow();
      setNewInventory('');
    }
  };

  return (
    <View style={styles.container}>
      <View
        ref={viewRef}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          opacity: 1,
          display: 'flex',
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
      </View>
      {isAndroid ? (
        <TouchableOpacity  onPress={openModal} activeOpacity={1}>
          <View>
            <TextInput
              ref={textInputRef}
              style={styles.textNumber}
              value={number.current.toString()}
              editable={false}
              placeholder="0"
              placeholderTextColor={defaultColors.c_fff}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableWithoutFeedback onPress={openModal}>
          <View>
            <TextInput
              ref={textInputRef}
              style={styles.textNumber}
              value={number.current.toString()}
              editable={false}
              placeholder="0"
              placeholderTextColor={defaultColors.c_fff}
            />
          </View>
        </TouchableWithoutFeedback>
      )}

      <TouchableWithoutFeedback style={styles.button} onPress={AddQuality}>
        <ICAddQuanity />
      </TouchableWithoutFeedback>
      <ModalCustom
        onBackdropPress={modalEditInventory.handleHidden}
        ref={modalEditInventory.refModal}>
        <View style={styles.modalEdit}>
          <View style={styles.contentHeaderModal}>
            <Text style={styles.textHeaderModal}>Cập nhật số lượng </Text>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={modalEditInventory.handleHidden}>
              <ICCloseModal color={defaultColors.c_0000} />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 32}}>
            <Text style={styles.textNumberModal}>Số lượng</Text>
            <TextInput
              style={styles.textInputEdit}
              placeholder={'Nhập số lượng'}
              value={newInventory.toString()}
              onFocus={() => {
                setNewInventory('');
              }}
              keyboardType="numeric"
              onChangeText={(value: any) => {
                if (value && !isNaN(value)) {
                  setNewInventory(+value);
                } else {
                  setNewInventory('');
                }
              }}
            />
          </View>
          <View style={{marginTop: 20}}>
            <ButtonAction
              onPressCancel={modalEditInventory.handleHidden}
              onPressDone={() => {
                onSubmitForm();
              }}
            />
          </View>
        </View>
      </ModalCustom>
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
    width: 40,
    textAlign: 'center',
    maxHeight: 30,
    padding: 5,
    // borderWidth : 1,
    // borderColor : defaultColors.c_fff,
  },
  button: {
    height: 30,
    padding: 5,
  },
  modalEdit: {
    height: 270,
    width: isTabletDevice ? 500 : DIMENSION.width,
    backgroundColor: defaultColors.c_fff,
    borderRadius: 10,
    padding: 24,
  },
  textHeaderModal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: defaultColors.c_222124,
  },
  textNumberModal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: defaultColors.c_222124,
  },
  contentHeaderModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInputEdit: {
    width: ' 80%',
    height: 40,
    borderWidth: 1,
    marginTop: 12,
    borderRadius: 8,
    borderColor: defaultColors.bg_EFEFEF,
    padding: 10,
  },
});

export default QuantityUpdate;
