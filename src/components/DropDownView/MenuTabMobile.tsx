import {defaultColors, heightHeader, isTabletDevice} from '@configs';
import {DIMENSION} from '@constants';
import React from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import Modal from 'react-native-modal/dist/modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IMenuTabMobile {
  content: JSX.Element
  isOpenTab: boolean
  setIsOpenTab: React.Dispatch<React.SetStateAction<boolean>>
  contentModal?: StyleProp<ViewStyle>
}
const MenuTabMobile = (props: IMenuTabMobile) => {
  const {content, isOpenTab, setIsOpenTab, contentModal} = props;
  const insets = useSafeAreaInsets();
  const heightView =
    DIMENSION.height -
    heightHeader -
    (Platform.OS === 'ios' ? insets.top : DIMENSION.topPadding);

  return isTabletDevice ? (
    content
  ) : (
    <View>
      <Modal
        isVisible={isOpenTab}
        animationIn={'slideInLeft'}
        animationOut={'slideOutLeft'}
        backdropColor="tranparent"
        style={styles.containerModal}>
        <TouchableWithoutFeedback onPress={() => setIsOpenTab(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View
          style={[
            styles.contentModal,
            {
              height: heightView,
            },
            contentModal,
          ]}>
          {content}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  containerModal: {
    margin: 0,
    flex: 1,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'tranparent',
  },
  contentModal: {
    width: 226,
    backgroundColor: defaultColors.bg_FAFAFA,
    bottom: 0,
    position: 'absolute',
  },
});

export default MenuTabMobile;
