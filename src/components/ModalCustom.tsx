import React, {forwardRef, ReactNode, useCallback, useState} from 'react';
import Modal, {Direction} from 'react-native-modal';
import type {ModalProps} from 'react-native-modal/dist/modal';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import {isIOS} from '@constants';
import { getValueForDevice } from 'src/commons/formatMoney'

export type ModalCustomProps = {
  children: ReactNode
  noneClose?: boolean
  backdropOpacity?: number
  backdropBg?: string
  bgColor?: string
  onClose?: () => void
  onBackdropPress?: () => void | undefined | boolean
  swipeDirection?: Direction
  isCloseOnBackdrop?: boolean
} & Partial<ModalProps>
export type ModalCustomMethod = {
  show: (isFullScreen: boolean) => void
  hide: () => void
  modalIsVisiable: () => boolean
};
const ModalCustom = forwardRef<ModalCustomMethod, ModalCustomProps>(
  (
    {
      children,
      backdropOpacity = 0.8,
      bgColor = '#141414',
      backdropBg = 'black',
      animationIn = 'slideInUp',
      animationOut = 'slideOutDown',
      onBackdropPress,
      propagateSwipe = false,
      swipeDirection,
      isCloseOnBackdrop = true,
    }: ModalCustomProps,
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isLandscape, setIsLandscape] = useState<boolean>(false);
    const modalIsVisiable = useCallback(() => isVisible, [isVisible]);
    React.useImperativeHandle(
      ref,
      () => ({
        show(isFullScreen: boolean) {
          setIsLandscape(isFullScreen);
          setIsVisible(true);
        },
        hide() {
          setIsVisible(false);
        },
        modalIsVisiable,
      }),
      [modalIsVisiable],
    );
    // if (isLandscape) {
    //   return (
    //     <Modal
    //       useNativeDriver
    //       // hasBackdrop={false}
    //       onBackButtonPress={() => {
    //         if (onBackdropPress) {
    //           const rs = onBackdropPress();

    //           if (!rs && isCloseOnBackdrop) setIsVisible(false);
    //         } else if (isCloseOnBackdrop) {
    //           setIsVisible(false);
    //         }
    //       }}
    //       avoidKeyboard
    //       onSwipeComplete={() => {
    //         if (isCloseOnBackdrop) {
    //           setIsVisible(false);
    //         }
    //         if (onBackdropPress) {
    //           onBackdropPress();
    //         }
    //       }}
    //       // swipeDirection="down"
    //       coverScreen={false}
    //       isVisible={isVisible}
    //       animationIn={animationIn}
    //       animationOut={animationOut}
    //       backdropOpacity={backdropOpacity}
    //       // customBackdrop={<Box flex={1} color={backdropBg} opacity={backdropOpacity} />}
    //       style={{
    //         margin: 0,
    //       }}
    //       propagateSwipe={propagateSwipe}
    //       swipeDirection={swipeDirection}
    //       onBackdropPress={() => {
    //         if (isCloseOnBackdrop) {
    //           setIsVisible(false);
    //         }
    //         if (onBackdropPress) {
    //           onBackdropPress();
    //         }
    //       }}>
    //       {children}
    //     </Modal>
    //   );
    // }
    return (
      <Modal
        // useNativeDriver
        avoidKeyboard
        propagateSwipe
        style={styles.styleBackgroudOpacity}
        swipeThreshold={50}
        onBackButtonPress={() => {
          if (onBackdropPress) {
            const rs = onBackdropPress();

            if (!rs && isCloseOnBackdrop) setIsVisible(false);
          } else if (isCloseOnBackdrop) {
            setIsVisible(false);
          }
        }}
        onSwipeComplete={() => {
          if (isCloseOnBackdrop) {
            setIsVisible(false);
          }
          if (onBackdropPress) {
            onBackdropPress();
          }
        }}
        swipeDirection={swipeDirection}
        // coverScreen={!isIOS || false}
        isVisible={isVisible}
        animationIn={animationIn}
       animationOutTiming={200}
        animationOut={animationOut}
        // hasBackdrop={false}
        backdropOpacity={backdropOpacity}
        backdropColor={backdropBg}
        onBackdropPress={() => {
          if (isCloseOnBackdrop) {
            setIsVisible(false);
          }
          if (onBackdropPress) {
            onBackdropPress();
          }
        }}
        >
        {!isIOS ? (
          children
        ) : (
          <KeyboardAvoidingView behavior="position" enabled>
            {/* <Box flex={1}> */}
            {children}
            {/* </Box> */}
          </KeyboardAvoidingView>
        )}
      </Modal>
    );
  },
);

export default ModalCustom;

const styles = StyleSheet.create({
  styleBackgroudOpacity: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: 0,
    left:0,
    // opacity: 0.99,
    // zIndex: 100,
    justifyContent: getValueForDevice('center','flex-end') ,
    alignItems: 'center' ,
    margin: 0
  },
  styleChildren: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});
