import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
  Text,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {defaultColors} from '@configs';
import {TextCustom} from '@components';
import {ICAddOrder} from '../../../../assets/icons/ICAddOrder';
import {ICDown} from '../../../../assets/icons/ICDown';
import {globalStyles} from 'src/commons/globalStyles';
import {getValueForDevice} from 'src/commons/formatMoney';
import {IHistory, IHistoryCompoumd} from '@typeRules';
import {OrderType} from 'src/typeRules/product';
import DropDownView from 'src/components/DropDownView/DropDownView';
import {IHistoryDay, getHistoriesContent} from 'src/api/history';
import {useIsFocused} from '@react-navigation/native';
import {IResponseApi} from 'src/api/types';
import {useHandleResponsePagination} from 'src/commons/useHandleResponsePagination';
import {ICDoubleArrowDown} from 'src/assets/icons/ICDoubleArrowDown';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
  dataPage: IHistoryDay;
  currentType: string;
};

export const HistoryItem = ({dataPage, currentType}: Props) => {
  const IsFocus = useIsFocused();
  const [totalElemts, setTotalElement] = useState(0);
  const getHistoryMethod = useCallback(
    async (page: number, size: number): Promise<IResponseApi<IHistory>> => {
      return new Promise((re, rj) => {
        getHistoriesContent({
          page,
          size,
          menu: currentType,
          status: true,
          day: dataPage.day,
        })
          .then(data => {
            setTimeout(() => {
              re({data: data.data?.list, success: true});
              setTotalElement(data?.data?.totalElementPage ?? 0);
            }, 300);
          })
          .catch(error => {
            setTimeout(() => {
              rj(error);
            }, 300);
          });
      });
    },
    [currentType, dataPage],
  );

  const {data, refresh, handleLoadMore} =
    useHandleResponsePagination<IHistory>(getHistoryMethod);

  console.log({data});

  useEffect(() => {
    if (IsFocus) {
      refresh();
    }
  }, [currentType, IsFocus]);

  return (
    <>
      <DropDownView
        isOpen={false}
        textHeader={`Ngày ${new Date(dataPage.day).toLocaleDateString()}`}
        itemView={
          <View
            style={[
              {flex: 1},
              // !isOpen ? {height: 0, overflow: 'hidden'} : undefined,
            ]}>
            {data.map((item, index) => {
              return <HistoryItemMenu key={index} data={item} />;
            })}
            {data.length < totalElemts ? (
              <View style={styles.buttonShowMore}>
                <TouchableOpacity
                  style={styles.buttonShowMoreItem}
                  onPress={() => handleLoadMore()}>
                  <Text style={styles.buttonShowMoreText}>Hiển thị thêm</Text>
                  <ICDoubleArrowDown />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        }
        headerButtonStyle={styles.styleGoupItem}
        textStyle={{
          fontSize: 14,
          color: defaultColors.c_222124,
          fontWeight: 'bold',
        }}
      />
    </>
  );
};

type PropsItem = {
  data: IHistory;
};

const dataStatus = {
  [OrderType.complete]: {
    colorBackground: defaultColors._BAE5C8,
    textStatus: 'Hoàn thành',
    circleColor: defaultColors._01A63E,
  },
  [OrderType.cancel]: {
    colorBackground: defaultColors._241_171_171_100,
    textStatus: 'Đã huỷ',
    circleColor: defaultColors._E73F3F,
  },
  [OrderType.process]: {
    colorBackground: defaultColors._99C7F5,
    textStatus: 'Chờ chế biến',
    circleColor: defaultColors._0073E5,
  },
  [OrderType.process_cancel]: {
    colorBackground: defaultColors._FFDB9E,
    textStatus: 'Chờ huỷ',
    circleColor: defaultColors._F4A118,
  },
};

export const HistoryItemMenu = ({data}: PropsItem) => {
  return (
    <View style={styles.styleItemProduct}>
      <View style={[styles.styleViewItem, styles.pl_16]}>
        <TextCustom
          lineHeight={22}
          fontSize={14}
          weight="400"
          color={defaultColors.c_222124}>
          {data.thour}
        </TextCustom>
      </View>
      <View style={styles.styleViewItem2}>
        <TextCustom
          lineHeight={22}
          fontSize={14}
          weight="400"
          color={defaultColors.c_222124}>
          {data?.nameProduct}
        </TextCustom>
        <View>
          <View style={{flexDirection: 'row', columnGap: 4}}>
            <ICAddOrder color={defaultColors.bg_A1A0A3} />
            <TextCustom
              lineHeight={18}
              fontSize={12}
              weight="400"
              color={defaultColors.bg_A1A0A3}>
              Đặt cho tôi đơn hàng này
            </TextCustom>
          </View>
        </View>
      </View>
      <View style={styles.styleViewItem}>
        <TextCustom fontSize={14} weight="400" color={defaultColors.c_222124}>
          {data?.numProduct}
        </TextCustom>
      </View>
      <View style={styles.styleViewItem}>
        <TextCustom fontSize={14} color={defaultColors.c_222124} weight="400">
          {data?.nameTable}
        </TextCustom>
      </View>
      <View style={styles.styleViewItem}>
        <TextCustom fontSize={14} color={defaultColors.c_222124} weight="400">
          {data?.idInvoice}
        </TextCustom>
      </View>
      <View style={styles.styleViewItem}>
        <TextCustom fontSize={14} color={defaultColors.c_222124} weight="400">
          {data?.createdBy}
        </TextCustom>
      </View>

      <View style={[styles.styleViewItem, styles.styleStatus]}>
        <View style={styles.styleStatus}>
          <View
            style={[
              styles.styleCricle,
              {backgroundColor: dataStatus[data.state].circleColor},
            ]}
          />
          <TextCustom fontSize={14} color={defaultColors.c_222124} weight="400">
            {dataStatus[data.state].textStatus}
          </TextCustom>
        </View>
      </View>
      <View style={styles.styleViewItem2}>
        <TextCustom fontSize={14} color={defaultColors.c_222124} weight="400">
          {data?.reason}
        </TextCustom>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultColors.c_fff,
    padding: 32,
  },
  styleTable: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
  },
  styleViewItem: {
    width: `${100 / 10}%`,
  },
  styleViewItem2: {
    width: `${(100 / 10) * 2}%`,
  },
  styleGoupItem: {
    height: getValueForDevice(60, 40),
    borderRadius: getValueForDevice(0, 8),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    backgroundColor: defaultColors.bg_F5F5F5,
    width: getValueForDevice('auto', 'auto'),
  },
  styleItemProduct: {
    height: 'auto',
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    // alignItems: 'center',
    // paddingHorizontal: 16,
    backgroundColor: defaultColors.c_fff,
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.bg_EFEFEF,
    // columnGap: 8,
  },
  styleBtn: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleGroupBtn: {
    columnGap: 12,
    flexDirection: 'row',
  },
  styleBtnGreen: {
    backgroundColor: defaultColors._01A63E,
  },
  styleBtnRed: {
    backgroundColor: defaultColors._EA222A,
  },
  styleBtnCancel: {
    backgroundColor: defaultColors.c_222124,
  },
  styleCricle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  styleStatus: {
    ...globalStyles.row,
    ...globalStyles.alignItemsCenter,
    columnGap: 4,
  },
  pl_16: {
    paddingLeft: 16,
  },
  buttonShowMore: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  buttonShowMoreItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  buttonShowMoreText: {
    color: defaultColors._EA222A,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
