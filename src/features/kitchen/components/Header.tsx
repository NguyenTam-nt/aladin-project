import { defaultColors, heightHeader, isTabletDevice } from '@configs';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { memo, useState } from 'react';
import { Keyboard, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IDataSelectionCustom } from 'src/components/CartList/CompoundAction/CompoundCartList';
import { RightHeader } from 'src/features/orderTab';
import { ICMenubar } from '../../../assets/icons/ICMenubar';

const dataItem = [
  {
    label: 'Cơ sở 1 - 102 Trường Trinh, Phương Mai, Hà Nội',
    value: '1',
  },
  {
    label: 'Cơ sở 2 - 102 Trường Trinh, Phương Mai, Hà Nội',
    value: '2',
  },
  {
    label: 'Cơ sở 3 - 102 Trường Trinh, Phương Mai, Hà Nội',
    value: '3',
  },
  {
    label: 'Cơ sở 4 - 102 Trường Trinh, Phương Mai, Hà Nội',
    value: '4',
  },
];

type Props = {
  renderLeft?: JSX.Element
  showLocattion? : boolean
};

export const HeaderTab = memo(({renderLeft, showLocattion = true}: Props) => {
  const navigation = useNavigation();
  const onDraw = async () => {
    await Keyboard.dismiss();
    navigation.dispatch(DrawerActions.openDrawer());
  };
  const [location, setLocation] = useState<IDataSelectionCustom>(dataItem[0]);

  return (
    <SafeAreaView style={styles.bg_primary}>
    <View style={styles.container}>
      {renderLeft ? renderLeft : null}
      <View style={styles.styleRight}>
        {showLocattion && (
          <RightHeader location={location} setLocation={setLocation} />
        )}
        {isTabletDevice && (
          <TouchableOpacity onPress={onDraw}>
            <ICMenubar color={defaultColors.c_fff} />
          </TouchableOpacity>
        )}
      </View>
    </View>
     </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    height: heightHeader,
    width: '100%',
    backgroundColor: defaultColors.bg_2D2D2D,
    flexDirection: 'row',
    paddingHorizontal: 32,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  styleRight: {
    flexDirection: 'row',
    columnGap: 12,
    alignItems: 'center',
  },
  bg_primary: {
    backgroundColor: defaultColors.bg_header,
  },
});
