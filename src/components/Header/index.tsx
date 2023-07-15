import {defaultColors, heightHeader, isTabletDevice, paddingHorizontal} from '@configs';
import {ICCheckBoxTable, ICLogo} from '@icons';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ICArrowLeft} from '../../assets/icons/ICArrowLeft';
import {ICMenubar} from '../../assets/icons/ICMenubar';
import DeviceInfo from 'react-native-device-info';
import { useDrawerStatus } from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import { setShowDrawerFloor } from '../../redux/infoDrawer/slice';

export const Header = ({
  isCheckbox,
  goBack,
}: {
  isCheckbox?: boolean
  goBack?: boolean
}) => {
  const navigation = useNavigation();
  const statusDrawer = useDrawerStatus();
  const dispatch = useDispatch();
  const onDraw = async () => {
    await Keyboard.dismiss();
    navigation.dispatch(DrawerActions.openDrawer());
  };
  useEffect(() => {
    if (navigation.isFocused()) {
      dispatch(setShowDrawerFloor(statusDrawer === 'open' ? true : false));
    }
  }, [statusDrawer]);
  return (
    <SafeAreaView style={styles.bg_primary}>
      <View style={styles.container}>
        {goBack ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('main');
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
              <ICLogo color={defaultColors.c_fff} height={64} width={64} />
            </View>
            <View>
              {!isTabletDevice && (
                <Text style={styles.textTitle}>Giang mỹ Hotpot</Text>
              )}
            </View>
          </>
        )}

        <View style={styles.rightContent}>
          {isCheckbox && isTabletDevice && (
            <>
              <ICCheckBoxTable />
              <Text style={styles.textCheckBox}> Còn trống</Text>
              <ICCheckBoxTable color={defaultColors._01A63E} />
              <Text style={styles.textCheckBox}>Đặt trước</Text>
              <ICCheckBoxTable color={defaultColors._0073E5} />
              <Text style={styles.textCheckBox}> Đang ngồi</Text>
            </>
          )}
          {goBack && DeviceInfo.isTablet() && (
            <>
              <View style={styles.icCircle} />
              <Text style={styles.textCheckBox}>
                Mã hóa đơn: <Text style={styles.textBold}> MHĐ01 </Text>
              </Text>
              <View style={styles.icCircle} />
              <Text style={styles.textCheckBox}>
                Khu vực: <Text style={styles.textBold}> Bàn 1/Tầng 3 </Text>
              </Text>
            </>
          )}

          <TouchableOpacity onPress={onDraw}>
            <ICMenubar color={defaultColors.c_fff} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bg_primary: {
    backgroundColor: defaultColors.bg_header,
  },
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
 });
