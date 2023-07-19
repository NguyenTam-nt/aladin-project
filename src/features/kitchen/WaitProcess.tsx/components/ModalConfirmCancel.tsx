import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {defaultColors} from '@configs';
import {TextCustom} from '@components';
import {ICCloseModal} from '../../../../assets/icons/ICCloseModal';
import {Button} from '.././../../../components/Button';
import {ICCheck} from '../../../../assets/icons/ICCheck';
import {ICDelete} from '../../../../assets/icons/ICDelete';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type Props = {
  onCancel: () => void
  message?: string
  placeholder?: string
  titleInput?: string
};

export const ModalConfirmCancel = memo(
  ({onCancel, message, placeholder, titleInput}: Props) => {
    return (
      <View style={styles.styleModalView}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.styleModalHeader}>
            <View style={styles.styleViewItem}>
              <TextCustom
                fontSize={24}
                weight="700"
                color={defaultColors.c_222124}
                textAlign="center">
                {message}
              </TextCustom>
            </View>
            <TouchableOpacity onPress={onCancel} style={styles.styleIconClose}>
              <ICCloseModal color={defaultColors.bg_CBCBCB} />
            </TouchableOpacity>
          </View>
          <View>
            <TextCustom
              fontSize={14}
              weight="600"
              color={defaultColors.c_222124}>
              {titleInput}
              <TextCustom color={defaultColors._EA222A}>*</TextCustom>
            </TextCustom>
            <TextInput
              placeholderTextColor={defaultColors.c_222124}
              placeholder={placeholder}
              style={styles.styleTextInput}
              textAlignVertical="top"
              multiline
              autoFocus
            />
          </View>
          <View style={styles.styleGroupBtn}>
            <Button
              style={styles.styleBtnPrimary}
              renderLeff={
                <View>
                  <ICCheck />
                </View>
              }
              text="Thực hiện"
            />
            <Button
              onPress={onCancel}
              style={styles.styleBtnCancel}
              renderLeff={
                <View>
                  <ICDelete />
                </View>
              }
              text="Hủy bỏ"
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  },
);

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
    flex: 1,
  },
  styleModalView: {
    width: 720,
    height: 348,
    backgroundColor: defaultColors.c_fff,
    borderRadius: 16,
    padding: 24,
  },
  styleModalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  styleTextInput: {
    height: 120,
    borderWidth: 1,
    borderColor: defaultColors.bg_EFEFEF,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: defaultColors.c_222124,
  },
  styleGroupBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 16,
    justifyContent: 'center',
    marginTop: 40,
  },
  styleBtnPrimary: {
    width: 130,
  },
  styleBtnCancel: {
    width: 130,
    backgroundColor: defaultColors.c_222124,
  },
  styleIconClose: {
    marginLeft: 'auto',
  },
});
