import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import React, {memo, useCallback, useMemo, useRef, useState} from 'react'
import {defaultColors} from '@configs'
import {TextCustom} from '@components'
import {ICCloseModal} from '../../../../assets/icons/ICCloseModal'
import {Button} from '../../../../components/Button'
import {ICCheck} from '../../../../assets/icons/ICCheck'
import {ICDelete} from '../../../../assets/icons/ICDelete'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {getValueForDevice} from 'src/commons/formatMoney'
import {DIMENSION} from '@constants'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {MultipleScreenView} from 'src/components/MultipleScreenView'
import {ICTagFloor} from '@icons'
import {IOrderItem, OrderType} from 'src/typeRules/product'

type Props = {
  onCancel: () => void
  onPress: (
    data: IOrderItem,
    reason: string,
    state: OrderType,
    isAll?: boolean,
  ) => void
  message?: string
  placeholder?: string
  titleInput?: string
  data: IOrderItem | undefined
  state: OrderType
}

export const ModalConfirmCancel = memo(
  ({
    onCancel,
    message,
    placeholder,
    titleInput,
    onPress,
    data,
    state,
  }: Props) => {
    const insets = useSafeAreaInsets()
    const [value, setValue] = useState<string>(placeholder ?? '')

    const styleSizeModal = useMemo((): StyleProp<ViewStyle> => {
      return {
        ...styles.styleModalView,
        width: getValueForDevice(720, DIMENSION.width),
        height: getValueForDevice(348, DIMENSION.height - insets.top - 64),
        maxWidth: getValueForDevice(720, DIMENSION.width),
        maxHeight: getValueForDevice(348, DIMENSION.height - insets.top - 64),
      }
    }, [insets.bottom, insets.top])

    const handlePress = useCallback(() => {
      if (data && value.trim()) {
        onPress(data, value, state)
      }
    }, [data, value, state])

    const handleChangeText = useCallback((value: string) => {
      setValue(value)
    }, [])

    return (
      <KeyboardAwareScrollView
        style={styleSizeModal}
      //   behavior="position"
      //  enabled
        >
        <View>
          <View style={styles.styleModalHeader}>
            <View style={styles.styleViewItem}>
              <MultipleScreenView
                phoneView={
                  <View>
                    <ICTagFloor />
                  </View>
                }
              />
              <TextCustom
                fontSize={24}
                weight="700"
                color={defaultColors.c_222124}
                textAlign={getValueForDevice('center', 'left')}>
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
              value={value}
              onChangeText={handleChangeText}
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
              onPress={handlePress}
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
        </View>
      </KeyboardAwareScrollView>
    )
  },
)

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
    flexDirection: getValueForDevice('column', 'row'),
    columnGap: getValueForDevice(0, 8),
    justifyContent: 'flex-start',
  },
  styleModalView: {
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
})
