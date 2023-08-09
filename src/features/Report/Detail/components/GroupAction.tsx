import {
  View,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {memo, useCallback, useMemo, useRef, useState} from 'react';
import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import {ICDownloadFile} from 'src/assets/icons/ICDownloadFile';
import {ICExcel} from 'src/assets/icons/ICExcel';
import {ICPdf} from 'src/assets/icons/ICPdf';
import {globalStyles} from 'src/commons/globalStyles';
import {FileType} from './MainDetail';

import OutsidePressHandler from 'react-native-outside-press';

type Props = {
  onDownload: (type: FileType) => void
};

const fileData = [
  {
    type: FileType.pdf,
    name: 'Xuất file PDF',
    icon: <ICPdf />,
  },
  {
    type: FileType.excel,
    name: 'Xuất file Excel',
    icon: <ICExcel />,
  },
];

export const GroupAction = memo(({onDownload}: Props) => {
  const [isShow, setShow] = useState(false);
  const ref = useRef<View>(null);
  const handleShow = useCallback(() => {
    setShow(true);
  }, []);

  const handleHide = useCallback(() => {
    setShow(false);
  }, []);

  const styleGroupDownload = useMemo((): StyleProp<ViewStyle> => {
    return {
      display: isShow ? 'flex' : 'none',
    };
  }, [isShow]);

  return (
    <>
      <View style={styles.headerAction}>
        <OutsidePressHandler
          disabled={false}
          style={styles.styleRelative}
          onOutsidePress={handleHide}>
          <Pressable ref={ref} onPress={handleShow}>
            <ICDownloadFile />
          </Pressable>
          {
            isShow ? (
            <View style={[styles.styleDownloadAction, styleGroupDownload]}>
              {fileData.map((item, index) => {
                return (
                  <Pressable
                    onPress={() => onDownload(item.type)}
                    key={index}
                    style={styles.styleDownloadItem}>
                    <View>{item.icon}</View>

                    <TextCustom
                      fontSize={14}
                      color={defaultColors.c_222124}
                      weight="400">
                      {item.name}
                    </TextCustom>
                  </Pressable>
                );
              })}
            </View>
            ) : null
          }
        </OutsidePressHandler>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 32,
    flex: 1,
  },
  headerAction: {
    width: '100%',
    height: 48,
    ...globalStyles.row,
    ...globalStyles.alignItemsCenter,
    backgroundColor: defaultColors.c_222124,
    paddingHorizontal: 32,
    position: 'relative',
    // zIndex: 10,
  },
  content: {
    padding: 24,
    borderWidth: 1,
    borderColor: defaultColors.bg_EFEFEF,
    backgroundColor: defaultColors.c_fff,
    flex: 1,
  },
  styleGap25: {
    columnGap: 25,
  },
  styleDownloadAction: {
    backgroundColor: defaultColors.c_fff,
    width: 149,
    position: 'absolute',
    zIndex: 999,
    top: 48 - 12,
    left: 0,
    height: 76,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    shadowColor: 'rgba(22, 34, 51, 0.08)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 7.49,

    elevation: 12,
  },
  styleDownloadItem: {
    ...globalStyles.row,
    ...globalStyles.alignItemsCenter,
    columnGap: 8,
    flex: 1,
  },
  styleRelative: {
    position: 'relative',
    width: 24,
  },
});
