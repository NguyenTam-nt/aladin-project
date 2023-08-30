import { defaultColors, heightHeader, isTabletDevice, paddingHorizontal } from '@configs';
import { DIMENSION } from '@constants';
import { ICCheckBoxTable, ICLogo } from '@icons';
import { useDrawerStatus } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { ICCheckBox } from 'src/assets/icons/ICCheckBox';
import { DinnerTableState } from 'src/features/home/components/TableOrder';
import { useIdBill, useListItemProductInCart } from 'src/redux/cartOrder/hooks';
import { ICArrowLeft } from '../../assets/icons/ICArrowLeft';
import { ICMenubar } from '../../assets/icons/ICMenubar';
import { setShowDrawerFloor } from '../../redux/infoDrawer/slice';
import { deleteBillApi } from 'src/api/products';
import { setIdBill, setItemProductInCart } from 'src/redux/cartOrder/slice';

export const Header = ({
  isCheckbox,
  goBack,
  renderRight,
  updateCheckbox,
  valueCheckBox = [],
  isOrder,
  table,
  tableId,
}: {
  isCheckbox?: boolean
  goBack?: boolean
  renderRight?:  JSX.Element
  updateCheckbox?: React.Dispatch<React.SetStateAction<string[]>>
  valueCheckBox? : string[]
  isOrder ? : boolean
  table? : string
  tableId? : number
}) => {
  const navigation = useNavigation();
  const statusDrawer = useDrawerStatus();
  const itemProduce = useListItemProductInCart();
  const dispatch = useDispatch();
  const idBill = useIdBill();

  const onDraw = async () => {
    await Keyboard.dismiss();
    navigation.dispatch(DrawerActions.openDrawer());
  };
  useEffect(() => {
    if (navigation.isFocused()) {
      dispatch(setShowDrawerFloor(statusDrawer === 'open' ? true : false));
    }
  }, [statusDrawer]);

  const onPressCheckbox = useCallback(
    async (value: string) => {
      try {
        if (updateCheckbox && valueCheckBox) {
          const newValueCheckBox = [...valueCheckBox];
          const indexValue = newValueCheckBox.indexOf(value);
          if (indexValue >= 0) {
            updateCheckbox(newValueCheckBox.filter(check => check !== value));
          } else {
            newValueCheckBox.push(value);
            updateCheckbox(newValueCheckBox);
          }
        }
      } catch (error) {
        console.log('error', error);
      }
    },
    [valueCheckBox, updateCheckbox],
  );

  const deleteBillAction = async () => {
    const dataDelete = await deleteBillApi(idBill);
    dispatch(setIdBill(undefined));
    dispatch(setItemProductInCart([]));
    if (dataDelete.success) {
      //@ts-ignore
      navigation.navigate('mainDrawer', {
        screen: 'all',
        params: {tableId: tableId},
      });
    } else {
      //@ts-ignore
      navigation.navigate('mainDrawer');
    }
  };

  const deleteBill = useCallback(async () => {
    if (idBill && itemProduce.length === 0 && tableId) {
      deleteBillAction();
    } else {
      //@ts-ignore
      navigation.navigate('mainDrawer');
      dispatch(setIdBill(undefined));
      dispatch(setItemProductInCart([]));
    }
  }, [idBill, itemProduce, tableId]);

  return (
    <SafeAreaView style={styles.bg_primary}>
      <View style={styles.container}>
        {goBack ? (
          <TouchableOpacity
            onPress={() => {
              deleteBill();

            }}
            style={styles.buttonBack}>
            <View style={styles.icBack}>
              <ICArrowLeft />
            </View>
            <Text style={styles.textButtonBack}>Quay lại Tầng/Bàn</Text>
          </TouchableOpacity>
        ) : (
          <>
            <View>
              {!isTabletDevice && (
                <ICLogo color={defaultColors.c_fff} height={64} width={64} />
              )}
            </View>
            <View>
              {!isTabletDevice && (
                <Text style={styles.textTitle}>Giang mỹ Hotpot</Text>
              )}
            </View>
          </>
        )}

        <View style={styles.rightContent}>
          {renderRight ? (
            renderRight
          ) : (
            <>
              {isCheckbox && isTabletDevice && (
                <>
                  <TouchableOpacity
                    style={styles.buttonRow}
                    activeOpacity={0.8}
                    onPress={() => {
                      onPressCheckbox(DinnerTableState.EMPTY);
                    }}>
                    {valueCheckBox.some(
                      checked => checked === DinnerTableState.EMPTY,
                    ) ? (
                      <ICCheckBox />
                    ) : (
                      <ICCheckBoxTable />
                    )}
                    <Text style={styles.textCheckBox}> Còn trống</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonRow}
                    activeOpacity={0.8}
                    onPress={() => {
                      onPressCheckbox(DinnerTableState.BOOK);
                    }}>
                    {valueCheckBox.some(
                      checked => checked === DinnerTableState.BOOK,
                    ) ? (
                      <ICCheckBox color={defaultColors._01A63E} />
                    ) : (
                      <ICCheckBoxTable color={defaultColors._01A63E} />
                    )}

                    <Text style={styles.textCheckBox}>Đặt trước</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonRow}
                    activeOpacity={0.8}
                    onPress={() => {
                      onPressCheckbox(DinnerTableState.EATING);
                    }}>
                    {valueCheckBox.some(
                      checked => checked === DinnerTableState.EATING,
                    ) ? (
                      <ICCheckBox color={defaultColors._0073E5} />
                    ) : (
                      <ICCheckBoxTable color={defaultColors._0073E5} />
                    )}
                    <Text style={styles.textCheckBox}> Đang ngồi</Text>
                  </TouchableOpacity>
                </>
              )}
              {goBack && isTabletDevice && (
                <>
                  <View style={styles.icCircle} />
                  <Text style={styles.textCheckBox}>
                    Mã hóa đơn:{' '}
                    <Text style={styles.textBold}>{idBill || ''}</Text>
                  </Text>
                  <View style={styles.icCircle} />
                  <Text style={styles.textCheckBox}>
                    Khu vực: <Text style={styles.textBold}>{table}</Text>
                  </Text>
                </>
              )}
            </>
          )}
          {!isOrder && (
            <TouchableOpacity onPress={onDraw}>
              <ICMenubar color={defaultColors.c_fff} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {goBack && !isTabletDevice && (
        <View style={styles.notiContainer}>
          <View style={{flex: 1, flexDirection: 'row' }}>
            <View style={styles.icCircle} />
            <Text style={styles.textCheckBox2} numberOfLines={1}>
              Mã hóa đơn: <Text style={styles.textBold}>{idBill || ''}</Text>
            </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={styles.icCircle} />
            <Text style={styles.textCheckBox} numberOfLines={1}>
              Khu vực: <Text style={styles.textBold}>{table}</Text>
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bg_primary: {
    backgroundColor: defaultColors.bg_header,
  },
  notiContainer : {   flexDirection: 'row',
  width: DIMENSION.width,
  paddingHorizontal: 12,
  justifyContent: 'space-between',
  backgroundColor : defaultColors.bg_primary,
  paddingVertical : 16},

  container: {
    height: heightHeader,
    backgroundColor: defaultColors.bg_header,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: paddingHorizontal,
  },
  rightContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCheckBox: {
    color: defaultColors.c_fff,
    marginRight: 32,
    marginLeft: 8,
    marginBottom : 2,
  },
  textCheckBox2: {
    color: defaultColors.c_fff,
    marginRight: 32,
    marginLeft: 8,
    marginBottom : 2,

  },
  textButtonBack: {
    color: defaultColors.c_fff,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonBack: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '2%',
  },
  icBack: {
    height: 40,
    width: 40,
    backgroundColor: defaultColors._F8D5D5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
   icCircle : {
    height: 12,
    width: 12,
    backgroundColor : defaultColors._F1BA42,
    borderRadius : 6,
    marginTop : 2,
   },
   textBold : {
    fontWeight :'bold',
   },
   textTitle : {
    textTransform: 'uppercase',
    color: defaultColors.c_fff,
    fontWeight: 'bold',
    fontSize : 18,
   },
   buttonRow : {
     flexDirection: 'row',
     alignItems : 'center' ,
     justifyContent : 'center',
   },
 });
