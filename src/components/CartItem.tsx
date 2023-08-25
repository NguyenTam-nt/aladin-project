import { ROLE_LIST, defaultColors, heightHeader, isTabletDevice } from '@configs';
import { DIMENSION } from '@constants';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { IProductInCart, IResponseProductUpdate, getProductInCartApi } from 'src/api/products';
import { useConnectSocketJS } from 'src/hooks/useConnectSockJS';
import { useIdBill, useListItemInCart, useListItemProductInCart } from 'src/redux/cartOrder/hooks';
import { IITemCart, setItemProductInCart } from 'src/redux/cartOrder/slice';
import { ICCart } from '../assets/icons/ICCart';
import { formatNumberDotSlice, formatNumberDotWithVND, getValueForDevice } from '../commons/formatMoney';
import {
  useAreaId,
  useIsShowActionCart,
  useIsShowDrawerFloor,
} from '../redux/infoDrawer/hooks';
import CartList from './CartList/CartList';
import { ProductState } from './CartList/TableCartList';
import ListOfFood from './ListOfFood/ListOfFood';
import { useUserInfo } from 'src/redux/reducers/hook';
import { IAuthorize } from 'src/redux/reducers/AuthSlice';
import { completeBillApi } from 'src/api/table';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { MessageUtils } from 'src/commons/messageUtils';
import { useNavigation } from '@react-navigation/native';

const CartItem = React.memo(() => {
  const insets = useSafeAreaInsets();
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isOpenList, setIsOpenList] = useState(false);
  const isOpenDrawerFloor = useIsShowDrawerFloor();
  const isOpenActionCart = useIsShowActionCart();
  const heightButtonValue = getValueForDevice(64, 128);
  const dataItemCart = useListItemProductInCart();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const billId = useIdBill();
  const IdArea = useAreaId();
  const userInfo = useUserInfo();

  const isOrder = userInfo?.authorities?.findIndex((item: IAuthorize) =>
  item.name === ROLE_LIST.order,
);

  const {dataSocket, setDataSocket} = useConnectSocketJS<IResponseProductUpdate>(IdArea &&  billId ?  `/topic/order/${IdArea}/${billId}` : '');
  const getItemInCart = useCallback(async () => {
    const data = await getProductInCartApi(billId);
    if (data.success) {
      dispatch(setItemProductInCart(data.data.list));
    }
  }, [billId]);

  useEffect(() => {
    if (billId) {
      getItemInCart();
    }
  }, [billId]);
  const dataItem = useListItemInCart();
  const dataList = useMemo<any[]>(() => {
    return [...dataItemCart, ...dataItem];
  }, [dataItemCart, dataItem]);
  const cost = useMemo(() => {
    let newCost = 0;
    dataList.map((item: IITemCart & IProductInCart) => {
      if (item.status !== ProductState.CANCEL)
        {newCost += (item?.quantity || item?.numProduct) * item.pricePromotion;}
    });
    return newCost;
  }, [dataList]);

  const number = useMemo(() => {
    let newNumber = 0;
    dataList.map((item: IITemCart & IProductInCart) => {
      newNumber += item?.quantity || item.numProduct;
    });
    return newNumber;
  }, [dataList]);

  const heightView =
    DIMENSION.height -
    heightButtonValue -
    heightHeader -
    (Platform.OS === 'ios' ? insets.top : DIMENSION.topPadding);
  const height = useSharedValue(0);
  const locationCart = useSharedValue(64);
  const styleView = useAnimatedStyle(() => {
    let inputRange = [0, heightView * 0.6, heightView];
    let outputRange = [0, 0, 1];
    return {
      height: height.value,
      opacity: interpolate(height.value, inputRange, outputRange),
      width: isTabletDevice ? 816 : DIMENSION.width,
      backgroundColor: defaultColors._26272C,
      flex: 1,
    };
  });

  const styleViewButton = useAnimatedStyle(() => {
    let inputRange = [0, heightView, heightView + heightButtonValue];
    let outputRange = [heightButtonValue, heightButtonValue, 0];
    return {
      height: interpolate(height.value, inputRange, outputRange),
    };
  });

  const styleViewCart = useAnimatedStyle(() => {
    let inputRange = [0, 32, 64];
    let outputRange = [1, 1.05, 1];
    return {
      transform: [
        {scale: interpolate(locationCart.value, inputRange, outputRange)},
      ],
      position: 'absolute',
      bottom: isTabletDevice ? 0 : locationCart.value,
      right: isTabletDevice ? 408 : 0,
      height: 64,
      width: isTabletDevice ? 408 : '100%',
    };
  });

  const stylesViewList = useAnimatedStyle(() => {
    let inputRange = [0, 64];
    let outputRange = [64, 0];
    let inputRangeScale = [0, 32, 64];
    let outputRangeScale = [1, 0.95, 1];
    return {
      transform: [
        {
          scale: interpolate(
            locationCart.value,
            inputRangeScale,
            outputRangeScale,
          ),
        },
      ],
      position: 'absolute',
      bottom: isTabletDevice
        ? 0
        : interpolate(locationCart.value, inputRange, outputRange),
      right: 0,
      height: 64,
      width: isTabletDevice ? 408 : '100%',
    };
  });

  const toggleOpen = useCallback(() => {
    setIsOpenList(false);
    setIsOpenCart(value => !value);
    height.value = !isOpenCart
      ? withTiming(heightView, {
          duration: 300,
        })
      : withTiming(0, {
          duration: 300,
        });
    if (!isTabletDevice) {
      locationCart.value = locationCart.value = withTiming(64, {
        duration: 300,
      });
    }
  }, [isOpenCart]);

  const toggleOpenList = useCallback(() => {
    setIsOpenCart(false);
    setIsOpenList(value => !value);
    height.value = !isOpenList
      ? withTiming(heightView, {
          duration: 300,
        })
      : withTiming(0, {
          duration: 0,
        });
    if (!isTabletDevice) {
      locationCart.value = withTiming(0, {
        duration: 300,
      });
    }
  }, [isOpenList]);

  const hiddenViewList = useCallback(() => {
    setIsOpenCart(false);
    setIsOpenList(false);
    locationCart.value = 64;
    height.value = withTiming(0, {
      duration: 300,
    });
  }, []);

  useEffect(() => {
    if (isOpenDrawerFloor) {
      hiddenViewList();
    }
  }, [isOpenDrawerFloor]);

  useEffect(() => {
    if (isOpenCart) {
      if (isOpenActionCart) {
        height.value = withTiming(heightView + heightButtonValue, {
          duration: 200,
        });
      } else {
        height.value = withTiming(heightView, {
          duration: 200,
        });
      }
    }
  }, [isOpenActionCart]);

  const hiddenViewOpen = useMemo<StyleProp<ViewStyle>>(() => {
    return {
      display: isOpenActionCart ? 'none' : 'flex',
      opacity: isOpenActionCart ? 0 : 1,
    };
  }, [isOpenActionCart]);

  useEffect(() => {
    if (dataSocket) {

      if (dataSocket.list.length === 0) {
        //@ts-ignore
        navigation.navigate('mainDrawer');
        MessageUtils.showSuccessMessage('Hoá đơn của bạn đã đưọc thanh toán.');
      }
      dispatch(setItemProductInCart(dataSocket.list));
      setDataSocket(undefined);
    }
  }, [dataSocket]);

  const completeBill = useCallback( async () => {
    if (billId) {
     const complete =  await  completeBillApi(billId);
      console.log('complete' ,complete);

      if (complete.success) {
         MessageUtils.showSuccessMessage('Hoàn thành hoá đơn thành công');
          navigation.navigate('mainDrawer');
      } else {
        MessageUtils.showErrorMessage(complete.message || '');
      }
    }
  }, [billId]);

  return (
    <View style={{flex: 1, display: isOpenDrawerFloor ? 'none' : 'flex'}}>
      <Animated.View style={styleView}>
        {isOpenCart ? (
          <CartList
            hiddenViewList={hiddenViewList}
            dataItemCart={dataItemCart}
          />
        ) : (
          <ListOfFood
            hiddenViewList={hiddenViewList}
            dataItemCart={dataItemCart}
          />
        )}
      </Animated.View>
      {isOpenCart && <View style={[styles.triangle, hiddenViewOpen]} />}
      {isOpenList && <View style={[styles.triangleRight, hiddenViewOpen]} />}
      <Animated.View style={[styles.container, styleViewButton]}>
        {isOpenCart ? (
          <Animated.View style={styleViewCart}>
            {isOrder >= 0 ? (
              <View style={styles.containerConfrim}>
                <View>
                  <Text style={styles.textTitleCart}>Hoá đơn tạm tính (chưa gồm VAT)</Text>
                  <Text style={styles.textTotalCart}>
                    {formatNumberDotWithVND(cost)}
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={completeBill}
                  style={styles.buttonConfirm}>
                  <Text style={styles.textConfirm}>Hoàn thành bữa ăn</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={[
                  styles.cartButton,
                  {
                    backgroundColor:  defaultColors.c_222124,

                  },
                ]}
                onPress={toggleOpen}
                activeOpacity={1}
                delayPressIn={1000}>
                <View style={{marginRight: 32}}>
                  <ICCart />
                  <View style={styles.icNumber}>
                    <Text style={styles.textNumber}>{number}</Text>
                  </View>
                </View>
                <Text style={styles.text}>
                  {' '}
                  Tổng: {formatNumberDotSlice(cost)}
                </Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        ) : (
          <Animated.View style={styleViewCart}>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={toggleOpen}
              activeOpacity={1}
              delayPressIn={1000}>
              <View style={{marginRight: 32}}>
                <ICCart />
                <View style={styles.icNumber}>
                  <Text style={styles.textNumber}>{number}</Text>
                </View>
              </View>
              <Text style={styles.text}>
                {' '}
                Tổng: {formatNumberDotSlice(cost)}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        <Animated.View style={stylesViewList}>
          <TouchableOpacity
            style={[
              styles.listButton,
              {
                backgroundColor: !isOpenList
                  ? defaultColors._F4A118
                  : defaultColors.c_222124,
              },
            ]}
            activeOpacity={1}
            onPress={toggleOpenList}>
            <Text style={styles.text}>Danh sách các món đã gọi</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: isTabletDevice ? 'row' : 'column',
    flex: 1,
    height: isTabletDevice ? 64 : 128,
    backgroundColor: defaultColors.c_222124,
    overflow: 'hidden',
  },
  cart: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 64,
    width: isTabletDevice ? 408 : '100%',
  },

  cartButton: {
    height: 64,
    width: isTabletDevice ? 408 : '100%',
    backgroundColor: defaultColors._EA222A,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 64,
    width: isTabletDevice ? 408 : '100%',
  },
  listButton: {
    height: 64,
    width: isTabletDevice ? 408 : '100%',
    backgroundColor: defaultColors._EA222A,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: defaultColors.c_fff,
    lineHeight: 30,
  },
  textNumber: {
    color: defaultColors._EA222A,
    fontSize: 12,
    fontWeight: 'bold',
  },
  textTitleCart: {
    color: defaultColors.c_fff,
    fontSize: 12,
  },
  textTotalCart: {
    fontSize: 20,
    color: defaultColors._F4A118,
    fontWeight: 'bold',
  },

  icNumber: {
    position: 'absolute',
    top: -16,
    right: -16,
    backgroundColor: defaultColors.c_fff,
    borderRadius: 10,
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewOpenCart: {
    height: 64,
    width: isTabletDevice ? 408 : '100%',
    backgroundColor: defaultColors.c_222124,
    flexDirection: 'row',
    position: 'absolute',
    bottom: isTabletDevice ? 0 : 64,
    right: isTabletDevice ? 408 : 0,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: isTabletDevice ? 64 : 64 * 2,
    left: isTabletDevice ? 174 : DIMENSION.width / 2 - 30,
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 30,
    borderBottomWidth: 12,
    borderLeftWidth: 30,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: defaultColors.c_222124,
    borderLeftColor: 'transparent',
  },
  triangleRight: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: isTabletDevice ? 64 : 64 * 2,
    right: isTabletDevice ? 174 : DIMENSION.width / 2 - 30,
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 30,
    borderBottomWidth: 12,
    borderLeftWidth: 30,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: defaultColors.c_222124,
    borderLeftColor: 'transparent',
  },
  textConfirm: {
    fontSize: 14,
    fontWeight: 'bold',
    color: defaultColors.c_fff,
  },
  buttonConfirm: {
    height: 40,
    width: 170,
    backgroundColor: defaultColors._EA222A,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerConfrim: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: defaultColors.c_222124,
  },
});
export default CartItem;
