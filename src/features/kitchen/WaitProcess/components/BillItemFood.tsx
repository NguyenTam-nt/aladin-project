import { TextCustom } from '@components';
import { defaultColors } from '@configs';
import React, { memo, useCallback, useMemo, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FomatDateYY_MM_DD_H_M } from 'src/commons/formatDate';
import { getValueForDevice } from 'src/commons/formatMoney';
import { globalStyles } from 'src/commons/globalStyles';
import { IOrderItem, IOrderKitchen, OrderType } from 'src/typeRules/product';
import { ICAddOrder } from '../../../../assets/icons/ICAddOrder';
import { ICCheck } from '../../../../assets/icons/ICCheck';
import { ICCheckMulti } from '../../../../assets/icons/ICCheckMulti';
import { ICCheckSingle } from '../../../../assets/icons/ICCheckSingle';
import { ICDelete } from '../../../../assets/icons/ICDelete';
import { ICDeleteMulti } from '../../../../assets/icons/ICDeleteMulti';
import { ICDown } from '../../../../assets/icons/ICDown';
import { Button } from '../../../../components/Button';
import { TypeModalWaitProcess } from '../hooks/useWaitProcess';

type Props = {
  onShowModal: (type: TypeModalWaitProcess, data: IOrderItem) => void
  onHideModal: () => void
  data: IOrderKitchen
  onPress: (
    data: IOrderItem,
    reason: string,
    state: OrderType,
    isAll?: boolean,
  ) => void
}

export const BillItemFood = memo(
  ({onShowModal, onHideModal, data, onPress }: Props) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleOpen = useCallback(() => {
      setIsOpen(value => !value);
    }, []);

    const styleRotate = useMemo(() => {
      return {
        transform: [
          {
            rotate: isOpen ? '180deg' : '0deg',
          },
        ],
        ...globalStyles.center,
      };
    }, [isOpen]);


    return (
      <>
        <TouchableOpacity onPress={toggleOpen} style={styles.styleGoupItem}>
          <View
            style={getValueForDevice(
              styles.styleViewItemFlex1,
              styles.styleViewItem,
            )}>
            <TextCustom
              fontSize={14}
              weight="600"
              lineHeight={22}
              numberOfLines={2}
              color={defaultColors.c_222124}>
              {data.nameProduct}
            </TextCustom>
          </View>
          <View
            style={getValueForDevice(
              styles.styleViewItemFlex1,
              styles.styleViewItem,
            )}
          />
          <View
            style={getValueForDevice(
              styles.styleViewItemFlex1,
              styles.styleViewItem,
            )}>
            <TextCustom
              fontSize={14}
              weight="600"
              lineHeight={22}
              textAlign="center"
              color={defaultColors.c_222124}>
              {data?.list.reduce((currentCount, item) => {
                return currentCount + (item.numProduct ?? 0);
              }, 0)}
            </TextCustom>
          </View>
          <View
            style={getValueForDevice(
              styles.styleViewItemFlex1,
              styles.styleViewItem,
            )}
          />
          <View
            style={[
              styles.styleViewItemFlex1,
              styles.styleFlexEnd,
              globalStyles.justifyContentCenter,
            ]}>
            <View style={styleRotate}>
              <ICDown color={defaultColors.c_222124} />
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={[
            globalStyles.fullFill,
            !isOpen ? {display: 'none', overflow: 'hidden'} : undefined,
          ]}>
          {data.list.map((item, index) => {
            return (
              <BillItemMenu
                data={item}
                isCancel={item.state === OrderType.process_cancel}
                key={index}
                onHideModal={onHideModal}
                onShowModal={onShowModal}
                onPress={onPress}
              />
            );
          })}
        </View>
      </>
    );
  },
);

type PropsBillItemMenu = {
  onShowModal: (
    type: TypeModalWaitProcess,
    data: IOrderItem,
    isAll?: boolean,
  ) => void
  onHideModal: () => void
  isCancel?: boolean
  data: IOrderItem
  onPress: (
    data: IOrderItem,
    reason: string,
    state: OrderType,
    isAll?: boolean,
  ) => void
}

export const BillItemMenu = ({
  onShowModal,
  isCancel = false,
  data,
  onPress,
}: PropsBillItemMenu) => {
  const handleShowModalCancel = useCallback(() => {
    onShowModal(TypeModalWaitProcess.cancelbill, data);
  }, [data]);

  const handleShowModalCancelAll = useCallback(() => {
    onShowModal(TypeModalWaitProcess.cancelbill, data, true);
  }, [data]);

  const handleShowModalRefuse = useCallback(() => {
    onShowModal(TypeModalWaitProcess.refusebill, data);
  }, [data]);

  const updateStateCompleteOnly = useCallback(() => {
    onPress(data, '', OrderType.complete);
  }, [data]);

  const updateStateCompleteAll = useCallback(() => {
    onPress(data, '', OrderType.complete, true);
  }, [data]);

  const updateStateCompleteCancel = useCallback(() => {
    onPress(data, '', OrderType.process_cancel, false);
  }, [data]);

  const canPress  = useRef<boolean>(true);

  const handlePress = (callback: any) => {
    if (canPress.current) {
      if (callback) {
        callback();
      }

      canPress.current = false;

      setTimeout(() => {
        canPress.current = true;
      }, 500);
    }
  };

  return (
    <View
      style={[
        styles.styleItemProduct,
        {
          backgroundColor: isCancel ? defaultColors.bg_FCEAEA : 'transparent',
        },
      ]}>
      <View
        style={getValueForDevice(
          styles.styleViewItemFlex1,
          styles.styleViewItem,
        )}>
        <TextCustom
          lineHeight={22}
          fontSize={14}
          weight="400"
          color={defaultColors.c_222124}>
          {FomatDateYY_MM_DD_H_M(data.createdDate)}
        </TextCustom>
        <TextCustom
          lineHeight={18}
          fontSize={12}
          weight="400"
          color={defaultColors.bg_A1A0A3}>
          Bởi {data.createdBy}
        </TextCustom>
      </View>
      <View
        style={getValueForDevice(
          styles.styleViewItemFlex1,
          styles.styleViewItem,
        )}>
        <TextCustom
          lineHeight={22}
          fontSize={14}
          numberOfLines={1}
          weight="400"
          color={defaultColors.c_222124}>
          {data?.name}
        </TextCustom>
        {data?.note && data?.note !== 'null' ? (
          <View>
            <View style={styles.styleGroupNote}>
              <ICAddOrder color={defaultColors.bg_A1A0A3} />
              <TextCustom
                lineHeight={18}
                fontSize={12}
                weight="400"
                color={defaultColors.bg_A1A0A3}>
               {data?.note}
              </TextCustom>
            </View>
          </View>
        ) : null}
      </View>
      <View
        style={getValueForDevice(
          styles.styleViewItemFlex1,
          styles.styleViewItem,
        )}>
        <TextCustom
          fontSize={14}
          textAlign="center"
          weight="400"
          color={defaultColors.c_222124}>
          {data?.numProduct}
        </TextCustom>
      </View>
      <View
        style={getValueForDevice(
          styles.styleViewItemFlex1,
          styles.styleViewItem,
        )}>
        <TextCustom
          fontSize={14}
          textAlign={getValueForDevice('left', 'right')}
          weight="400"
          color={defaultColors.c_222124}>
          {data.nameTable}
        </TextCustom>
      </View>
      <View
        style={[
          styles.styleGroupBtn,
          getValueForDevice(styles.styleViewItemFlex1, undefined),
        ]}>
        {!isCancel ? (
          <>
            <TouchableOpacity
               onPress={() => {
                handlePress(updateStateCompleteOnly);
              }}
              style={[styles.styleBtn, styles.styleBtnGreen]}>
              <ICCheckSingle />
            </TouchableOpacity>
            <TouchableOpacity
               onPress={() => handlePress(updateStateCompleteAll)}
              style={[styles.styleBtn, styles.styleBtnGreen]}>
              <ICCheckMulti />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handlePress(handleShowModalCancel)}
              style={[styles.styleBtn, styles.styleBtnRed]}>
              <ICDelete />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress(handleShowModalCancelAll)}
              style={[styles.styleBtn, styles.styleBtnRed]}>
              <ICDeleteMulti />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Button
              onPress={updateStateCompleteCancel}
              style={styles.styleViewItemFlex1}
              renderLeff={
                <View>
                  <ICCheck />
                </View>
              }
              text="Đồng ý hủy"
            />
            <Button
              onPress={handleShowModalRefuse}
              style={[styles.styleBtnCancel, styles.styleViewItemFlex1]}
              renderLeff={
                <View>
                  <ICDelete />
                </View>
              }
              text="Từ chối hủy"
            />
          </>
        )}
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
    // flex: 1,
    width: `${100 / 4}%`,
  },
  styleViewItemFlex1: {
    flex: 1,
  },
  styleGoupItem: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    backgroundColor: defaultColors.bg_F5F5F5,
  },
  styleItemProduct: {
    height: getValueForDevice(76, 'auto'),
    paddingVertical: getValueForDevice(0, 16),
    flexDirection: 'row',
    flexWrap: getValueForDevice('nowrap', 'wrap'),
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.bg_EFEFEF,
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
    width: getValueForDevice('auto', '100%'),
    marginTop: getValueForDevice(0, 16),
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
  styleGroupNote: {
    flexDirection: 'row',
    columnGap: 4,
  },
  styleFlexEnd: {
    alignItems: 'flex-end',
  },
});
