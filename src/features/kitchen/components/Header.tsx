import {View, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import {defaultColors, headersCategory} from '@configs';
import {TextCustom} from '@components';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {ICMenubar} from '../../../assets/icons/ICMenubar';
import {IDataSelectionCustom} from 'src/components/CartList/CompoundAction/CompoundCartList';
import {RightHeader} from 'src/features/orderTab';

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
};

export const Header = memo(({renderLeft}: Props) => {
  const navigation = useNavigation();
  const onDraw = async () => {
    await Keyboard.dismiss();
    navigation.dispatch(DrawerActions.openDrawer());
  };
  const [location, setLocation] = useState<IDataSelectionCustom>(dataItem[0]);

  return (
    <View style={styles.container}>
      {renderLeft ? renderLeft : null}
      <View style={styles.styleRight}>
        <RightHeader location={location} setLocation={setLocation} />
        <TouchableOpacity onPress={onDraw}>
          <ICMenubar color={defaultColors.c_fff} />
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: 64,
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
});
