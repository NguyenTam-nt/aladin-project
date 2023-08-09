import {ROLE_LIST, defaultColors, isTabletDevice} from '@configs';
import {DIMENSION} from '@constants';
import {ICArrowRight, ICTagFloor} from '@icons';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useDispatch} from 'react-redux';
import { OTPCodeValue } from 'src/api/config';
import {IFloorInfo, ITable, getTableID} from 'src/api/table';
import {ICCloseModal} from 'src/assets/icons/ICCloseModal';
import { ICDelete } from 'src/assets/icons/ICDelete';
import ButtonAction from 'src/components/ButtonAction/ButtonAction';
import ModalCustom from 'src/components/ModalCustom';
import OTPInput from 'src/components/OTPInput/OTPInput';
import {useModal} from 'src/hooks/useModal';
import {setIdBill} from 'src/redux/cartOrder/slice';
import {IAuthorize, setGetTable} from 'src/redux/reducers/AuthSlice';
import {useIsGetTable, useUserInfo} from 'src/redux/reducers/hook';

export enum DinnerTableState {
  EMPTY = 'EMPTY',
  BOOK = 'BOOK',
  EATING = 'EATING',
}

const TableItem = React.memo(
  ({item, pressTable}: {item: ITable; pressTable: (item: ITable) => void}) => {
    const isTablet = DeviceInfo.isTablet();

    const {bgColor, textColor}: {bgColor: string; textColor: string} = (() => {
      switch (item.state) {
        case DinnerTableState.EMPTY:
          return {
            bgColor: defaultColors.c_fff,
            textColor: defaultColors.c_0000,
          };
        case DinnerTableState.BOOK:
          return {
            bgColor: defaultColors._01A63E,
            textColor: defaultColors.c_fff,
          };
        case DinnerTableState.EATING:
          return {
            bgColor: defaultColors._0073E5,
            textColor: defaultColors.c_fff,
          };
        default:
          return {
            bgColor: defaultColors.c_fff,
            textColor: defaultColors.c_0000,
          };
      }
    })();

    const stylesTablet: StyleProp<ViewStyle> = [
      styles.tableItem,
      {
        width: isTablet ? 180 : '45%',
        margin: isTablet ? 16 : 8,
        backgroundColor: bgColor,
      },
    ];

    return (
      <TouchableOpacity
        style={stylesTablet}
        onPress={() => {
          pressTable(item);
        }}>
        <View style={styles.contentTableItem}>
          <ICArrowRight color={textColor} />
          <Text style={[styles.textTable, {color: textColor}]}>
            {item.name}
          </Text>
          <Text style={[styles.textMax, {color: textColor}]}>
            Tối đa {item.nseat} người
          </Text>
        </View>
      </TouchableOpacity>
    );
  },
);

const TableOrder = ({item}: {item: IFloorInfo}) => {
  const modalEditInventory = useModal();
  const userInfo = useUserInfo();
  const idTable = useIsGetTable();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [otpCode, setOTPCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const currentTable = useRef<ITable | null>();
  const maximumCodeLength = 6;
  const isOrderUser =  userInfo?.authorities?.some((role: IAuthorize) => {
    if (role.name === ROLE_LIST.order) {
      return true;
    }});
  const pressTable = useCallback(
    async (item: ITable, isPin?: boolean) => {
      currentTable.current = item;
      if (
        (idTable === undefined && item.state == DinnerTableState.EMPTY) ||
        idTable === currentTable.current.id ||
        isPin ||
        isOrderUser
      ) {

        navigation.navigate('orderTab', {screen: 'hotpot'});
        const getId = await getTableID(currentTable.current.id);

        if (getId.success) {
          if (isPin) {
            setOTPCode('');
          }
          //@ts-ignore
          dispatch(setIdBill(getId.data));
          if ((idTable === undefined || isPin) && isOrderUser) {
            dispatch(setGetTable(item.id));
          }
          //@ts-ignore
        }
      } else {
        modalEditInventory.handleShow();
      }
    },
    [idTable, userInfo],
  );

  const confirmPinAction = useCallback(() => {
    if (otpCode === OTPCodeValue && currentTable.current) {
      pressTable(currentTable.current, true);
    }
  }, [otpCode]);



  return (
    <View>
      <View style={styles.contentTextFloor}>
        <ICTagFloor />
        <Text style={styles.textFloor}> Phòng/bàn - {item.nameArea}</Text>
      </View>
      <View style={styles.contentTextFloor}>
        {item?.tables?.map((item: ITable, index: number) => {
          if (idTable === item.id && item.state === DinnerTableState.EMPTY) {
            dispatch(setGetTable(undefined));
          }
          return <TableItem key={index} item={item} pressTable={pressTable} />;
        })}
      </View>
      <ModalCustom
        onBackdropPress={modalEditInventory.handleHidden}
        ref={modalEditInventory.refModal}>
        <View style={styles.modalEdit}>
          <TouchableOpacity
            style={{padding: 10, position: 'absolute', top: 15, right: 10}}
            onPress={modalEditInventory.handleHidden}>
            <ICCloseModal color={defaultColors.c_fff} />
          </TouchableOpacity>
          <View style={styles.contentHeaderModal}>
            <Text style={styles.textHeaderModal}>Nhập mã xác thực</Text>
          </View>
          <View style={{marginTop: 24}}>
            <Text style={styles.textNumber}>
              Vì tính chất quản lý nên mã xác thực chỉ cung cấp cho nhân viên.
              Quý khách vui lòng nhờ nhân viên giúp đỡ để quay trở về bàn (nếu
              cần thiết).
            </Text>
          </View>
          <OTPInput
            code={otpCode}
            setCode={setOTPCode}
            maximumLength={maximumCodeLength}
            setIsPinReady={setIsPinReady}
          />
          <View style={{marginTop: 40}}>
            <ButtonAction
              textCancel="Huỷ bỏ"
              styleButtonDone={{
                opacity: isPinReady ? 1 : 0.5,
              }}
              ICCancel={<ICDelete />}
              onPressCancel={modalEditInventory.handleHidden}
              onPressDone={confirmPinAction}
            />
          </View>
        </View>
      </ModalCustom>
    </View>
  );
};

const styles = StyleSheet.create({
  contentTextFloor: {
    flexDirection: 'row',
    marginTop: 32,
    flexWrap: 'wrap',
  },
  textFloor: {
    fontSize: 18,
    color: defaultColors.c_fff,
    fontWeight: 'bold',
    marginLeft: 8,
    lineHeight: 28,
  },
  tableItem: {
    height: 108,
    width: 180,
    margin: 16,
    backgroundColor: defaultColors._01A63E,
    borderRadius: 16,
  },
  contentTableItem: {
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    padding: 16,
  },
  textTable: {
    fontSize: 14,
    fontWeight: '600',
    color: defaultColors.c_fff,
  },
  textMax: {
    fontSize: 12,
    color: defaultColors.c_fff,
  },
  modalEdit: {
    height: 296,
    width: isTabletDevice ? 558 : DIMENSION.width,
    backgroundColor: defaultColors._26272C,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  textHeaderModal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: defaultColors.c_fff,
    textAlign: 'center',
  },
  textNumber: {
    fontSize: 14,
    color: defaultColors.c_fff,
  },
  contentHeaderModal: {
    flexDirection: 'row',
    justifyContent: 'center',
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

export default TableOrder;
