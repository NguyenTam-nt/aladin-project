import {
ROLE_LIST,
defaultColors,
hotpotId2,
hotpotId4,
isTabletDevice,
} from '@configs';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { postProductToKitchen } from 'src/api/products';
import { MessageUtils } from 'src/commons/messageUtils';
import { useIdBill, useListItemInCart } from 'src/redux/cartOrder/hooks';
import { removeCartList } from 'src/redux/cartOrder/slice';
import { IAuthorize } from 'src/redux/reducers/AuthSlice';
import { useUserInfo } from 'src/redux/reducers/hook';
import { ICAdd } from '../../assets/icons/ICAdd';
import { ICCompound } from '../../assets/icons/ICCompound';
import { ICDelete } from '../../assets/icons/ICDelete';
import { ICSentToKitchen } from '../../assets/icons/ICSentToKitchen';
import DropDownFilter from '../Filter/DropDownFilter';
import { ActionCartListChoose } from './CartList';

const listIdtoFakeCall = [
  1703058688551, 1703058721987, 1703058792674, 1703058809865, 1703058832111,
  1703058859012,
];
// const listIdtoFakeCall = [
//   1703038465728, 1702801615440, 1703038495533, 1703038511702, 1703038529601,
// 1703038545980,
// ];


// const listFakeApi = [
//   {
//     code: 'AN_009',
//     guide: null,
//     id: 9583,
//     isStar: false,
//     linkMedia: 'https://giangmyhotpot.vn/image/1700640358509.webp',
//     name: 'Gỏi cá hồi',
//     percent: 0,
//     price: 350000,
//     pricePromotion: 350000,
//     priority: false,
//     quantity: 1,
//     show: true,
//   },
//   {
//     code: 'DQ_004',
//     guide: null,
//     id: 2383,
//     isStar: false,
//     linkMedia: 'https://banhtranggiangmy.com/image/1692610707312.webp',
//     name: 'Tôm bỏ lò phomai ',
//     percent: 0,
//     price: 215000,
//     pricePromotion: 215000,
//     priority: false,
//     quantity: 1,
//     show: true,
//   },
//   {
//     code: 'DQ_047',
//     guide: null,
//     id: 2325,
//     isStar: false,
//     linkMedia: 'https://banhtranggiangmy.com/image/1691510625297.webp',
//     name: 'Cá Lăng nướng',
//     percent: 0,
//     price: 250000,
//     pricePromotion: 250000,
//     priority: false,
//     quantity: 1,
//     show: true,
//   },
//   {
//     code: 'DQ_048',
//     guide: null,
//     id: 22419,
//     isStar: false,
//     linkMedia: 'https://giangmyhotpot.vn/image/1701922856411.webp',
//     name: 'Set cá lăng',
//     percent: 0,
//     price: 1500000,
//     pricePromotion: 1500000,
//     priority: false,
//     quantity: 1,
//     show: true,
//   },
//   {
//     code: 'DQ_013',
//     guide: null,
//     id: 1820,
//     isStar: false,
//     linkMedia: 'https://banhtranggiangmy.com/image/1691053624163.webp',
//     name: 'Tôm bao dừa chiên ',
//     percent: 0,
//     price: 165000,
//     pricePromotion: 165000,
//     priority: false,
//     quantity: 1,
//     show: true,
//   },
//   {
//     code: 'AN_011',
//     guide: null,
//     id: 1561,
//     isStar: false,
//     linkMedia: 'https://banhtranggiangmy.com/image/1690363946257.webp',
//     name: 'Nấm hải sản chiên giòn sốt chanh leo',
//     percent: 0,
//     price: 105000,
//     pricePromotion: 105000,
//     priority: false,
//     quantity: 1,
//     show: true,
//   },
//   {
//     code: 'DQ_011',
//     guide: null,
//     id: 1602,
//     isStar: false,
//     linkMedia: 'https://banhtranggiangmy.com/image/1690537618897.webp',
//     name: 'Cá kèo nướng muối ớt chấm mắm me',
//     percent: 0,
//     price: 185000,
//     pricePromotion: 185000,
//     priority: false,
//     quantity: 1,
//     show: true,
//   },
//   {
//     code: 'DQ_018',
//     guide: null,
//     id: 2278,
//     isStar: false,
//     linkMedia: 'https://banhtranggiangmy.com/image/1691507624738.webp',
//     name: 'Mực một nắng Phan Thiết nướng sa tế',
//     percent: 0,
//     price: 295000,
//     pricePromotion: 295000,
//     priority: false,
//     quantity: 1,
//     show: true,
//   },
//   {
//     code: 'DQ_029',
//     guide: null,
//     id: 2161,
//     isStar: false,
//     linkMedia: 'https://banhtranggiangmy.com/image/1691225563358.webp',
//     name: 'Tôm sú nướng muối ớt',
//     percent: 0,
//     price: 245000,
//     pricePromotion: 245000,
//     priority: false,
//     quantity: 1,
//     show: true,
//   },
//   {
//     code: 'DQ_032',
//     guide: null,
//     id: 2314,
//     isStar: false,
//     linkMedia: 'https://banhtranggiangmy.com/image/1691509973150.webp',
//     name: 'Cá hồi sóc muối tôm',
//     percent: 0,
//     price: 265000,
//     pricePromotion: 265000,
//     priority: false,
//     quantity: 1,
//     show: true,
//   },
//   {
//     code: 'Cuốn tai heo ',
//     guide: null,
//     id: 16435,
//     isStar: false,
//     linkMedia: 'https://giangmyhotpot.vn/image/1701500557965.webp',
//     name: 'Cuốn tai heo ',
//     percent: 0,
//     price: 165000,
//     pricePromotion: 165000,
//     priority: false,
//     quantity: 1,
//     show: true,
//   },
//   {
//     code: 'BAR_002',
//     guide: null,
//     id: 10814,
//     isStar: true,
//     linkMedia: 'https://giangmyhotpot.vn/image/1700842698428.webp',
//     name: 'Dasani',
//     percent: 0,
//     price: 15000,
//     pricePromotion: 15000,
//     priority: false,
//     quantity: 1,
//     show: true,
//   },
//   {
//     code: 'BAR_003',
//     guide: null,
//     id: 10796,
//     isStar: true,
//     linkMedia: 'https://giangmyhotpot.vn/image/1700842282255.webp',
//     name: 'Cocacola',
//     percent: 0,
//     price: 20000,
//     pricePromotion: 20000,
//     priority: false,
//     quantity: 1,
//     show: true,
//   },
//   {
//     code: 'BAR_004',
//     guide: null,
//     id: 10802,
//     isStar: true,
//     linkMedia: 'https://giangmyhotpot.vn/image/1700842414325.webp',
//     name: 'Nước cam ép ',
//     percent: 0,
//     price: 20000,
//     pricePromotion: 20000,
//     priority: false,
//     quantity: 1,
//     show: true,
//   },
//   {
//     code: 'Phở bản to xào hải sản ',
//     guide: null,
//     id: 1517,
//     isStar: false,
//     linkMedia: 'https://banhtranggiangmy.com/image/1690350071741.webp',
//     name: 'Phở bản to xào hải sản ',
//     percent: 0,
//     price: 155000,
//     pricePromotion: 155000,
//     priority: false,
//     quantity: 1,
//     show: true,
//   },
//   {
//     code: 'CC_007',
//     guide: null,
//     id: 2133,
//     isStar: false,
//     linkMedia: 'https://banhtranggiangmy.com/image/1692612353336.webp',
//     name: 'Cơm chiên hải sản với trái thơm',
//     percent: 0,
//     price: 125000,
//     pricePromotion: 125000,
//     priority: false,
//     quantity: 1,
//     show: true,
//   },
//   {
//     code: 'CC_008',
//     guide: null,
//     id: 11363,
//     isStar: false,
//     linkMedia: 'https://giangmyhotpot.vn/image/1700883096308.webp',
//     name: 'Cơm chiên cá hồi',
//     percent: 0,
//     price: 125000,
//     pricePromotion: 125000,
//     priority: false,
//     quantity: 1,
//     show: true,
//   },
// ];

const listFakeApi = [
  {
    code: 'Tôm sú nướng muối ớt',
    guide: null,
    id: 2161,
    isStar: false,
    linkMedia: 'https://cdn.cloudata.vn/image/1691225563358.webp',
    name: 'Tôm sú nướng muối ớt',
    percent: 0,
    price: 245000,
    pricePromotion: 245000,
    priority: false,
    quantity: 3,
    show: true,
  },
  {
    code: 'Cơm chiên hải sản với trái thơm',
    guide: null,
    id: 2133,
    isStar: false,
    linkMedia: 'https://cdn.cloudata.vn/image/1691223286868.webp',
    name: 'Cơm chiên hải sản với trái thơm',
    percent: 0,
    price: 125000,
    pricePromotion: 125000,
    priority: false,
    quantity: 4,
    show: true,
  },
  {
    code: 'Chim câu hầm hạt sen ',
    guide: null,
    id: 1443,
    isStar: false,
    linkMedia: 'https://cdn.cloudata.vn/image/1689918631689.webp',
    name: 'Chim câu hầm hạt sen ',
    percent: 0,
    price: 250000,
    pricePromotion: 250000,
    priority: false,
    quantity: 3,
    show: true,
  },
  {
    code: 'Gà ngũ trảo tiềm nấm tứ bảo',
    guide: null,
    id: 2140,
    isStar: false,
    linkMedia: 'https://cdn.cloudata.vn/image/1691223668454.webp',
    name: 'Gà ngũ trảo tiềm nấm tứ bảo',
    percent: 0,
    price: 355000,
    pricePromotion: 355000,
    priority: false,
    quantity: 3,
    show: true,
  },
];

const dataFilter = [
  {
    label: '10',
    value: 600,
  },
  {
    label: '20',
    value: 300,
  },
  {
    label: '30',
    value: 200,
  },
  {
    label: '40',
    value: 150,
  },
  {
    label: '60',
    value: 100,
  },
  {
    label: '100',
    value: 60,
  },
];

const ActionCartList = ({
  setActionChoose,
  hiddenViewList,
}: {
  setActionChoose: React.Dispatch<React.SetStateAction<ActionCartListChoose>>
  hiddenViewList: () => void
}) => {
  const listItemInCart = useListItemInCart();

  console.log('listItemInCart', listItemInCart);

  const billId = useIdBill();
  const dispatch = useDispatch();
  const userInfo = useUserInfo();

  const isOrder = userInfo?.authorities?.findIndex(
    (item: IAuthorize) => item.name === ROLE_LIST.order,
  );
  const postItemToKitChen = async () => {
    if (listItemInCart.length > 0) {
      let checkHotPot = 0;
      let numberHotpot = 0;

      const itemPost = listItemInCart.map(item => {
        if (item.idCategory) {
          switch (item.idCategory) {
            case hotpotId4:
              checkHotPot = 4;
              numberHotpot += item.quantity;
              break;
            case hotpotId2:
              checkHotPot = 2;
              numberHotpot += item.quantity;
              break;
            default:
              break;
          }
        }
        return {
          idProduct: item.id,
          numProduct: item.quantity,
          linkMedia: item.linkMedia,
          state: null,
          note: item?.note,
        };
      });
      if (checkHotPot !== numberHotpot) {
        MessageUtils.showWarningMessage(
          `Vui lòng chọn ${checkHotPot} vị nước lẩu !`,
        );
        return;
      }

      const data = await postProductToKitchen(billId, itemPost);
      if (data.success) {
        dispatch(removeCartList());
        MessageUtils.showSuccessMessage('Thành công!');
      } else {
        MessageUtils.showErrorMessage(data?.message || '');
      }
    }
  };

  const [timeTool, setTimeTool] = useState(dataFilter[0]);

  const [start, setStart] = useState<boolean>(false);

  useEffect(() => {
    const itemPost = listFakeApi.map(item => ({
      idProduct: item.id,
      numProduct: item.quantity,
      linkMedia: item.linkMedia,
      state: null,
      note: '',
    }));

    // Tạo một biến để lưu trữ ID của interval
    let intervalId: NodeJS.Timeout;

    // Effect sẽ chạy mỗi khi timeTool hoặc start thay đổi
    // Clear interval hiện tại và tạo một interval mới nếu start là true
    const intervalHandler = () => {
      clearInterval(intervalId);
      if (start) {
        intervalId = setInterval(() => {
          for (let index = 0; index < listIdtoFakeCall.length; index++) {
            postProductToKitchen(listIdtoFakeCall[index], itemPost);
          }
        }, timeTool.value);
      }
    };

    // Khởi chạy intervalHandler khi timeTool hoặc start thay đổi hoặc khi component mount
    intervalHandler();

    // Cleanup: Clear interval khi component unmount
    return () => clearInterval(intervalId);
  }, [timeTool, start]);



  return (
    <View style={styles.container}>
      <DropDownFilter
        dataItem={dataFilter}
        labelField="label"
        valueField="value"
        value={timeTool}
        setValue={setTimeTool}
        placeholder="Số request"
        isSort={true}
        styleDropdown={{width: 170, marginTop: 15}}
        leftPosition={false}
      />
      <TouchableOpacity style={styles.buttonSent} onPress={() => { setStart(!start);}}>
        <ICSentToKitchen />
        <Text style={styles.textButton}>{!start ? 'Start' : 'Stop'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSent} onPress={postItemToKitChen}>
        <ICSentToKitchen />
        <Text style={styles.textButton}>Chuyển tới bếp</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonAddnew} onPress={hiddenViewList}>
        <ICAdd />
        <Text style={styles.textButton}>Gọi thêm</Text>
      </TouchableOpacity>
      {isOrder >= 0 ? (
        <>
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => {
              setActionChoose(ActionCartListChoose.cancelOrder);
            }}>
            <ICDelete />
            <Text style={styles.textButton}>Hủy món</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonCompound}
            onPress={() => {
              setActionChoose(ActionCartListChoose.compound);
            }}>
            <ICCompound />
            <Text style={styles.textButton}>Tách / Ghép</Text>
          </TouchableOpacity>
        </>
      ) : isTabletDevice ? (
        <>
          <View
            style={[styles.buttonCancel, {backgroundColor: 'tranparents'}]}
          />
          <View
            style={[styles.buttonCancel, {backgroundColor: 'tranparents'}]}
          />
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 16,
    flexWrap: 'wrap',
  },
  buttonSent: {
    height: 40,
    backgroundColor: defaultColors._EA222A,
    width: isTabletDevice ? '24%' : '48%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
  },
  buttonAddnew: {
    height: 40,
    backgroundColor: defaultColors._01A63E,
    width: isTabletDevice ? '24%' : '48%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
  },
  buttonCancel: {
    height: 40,
    backgroundColor: defaultColors._33343B,
    width: isTabletDevice ? '24%' : '48%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
  },
  buttonCompound: {
    height: 40,
    backgroundColor: defaultColors._0073E5,
    width: isTabletDevice ? '24%' : '48%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
  },
  textButton: {
    fontSize: 14,
    fontWeight: '600',
    color: defaultColors.c_fff,
    marginLeft: 10,
  },
});

export default ActionCartList;
