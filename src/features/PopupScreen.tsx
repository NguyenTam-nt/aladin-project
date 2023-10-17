import {defaultColors} from '@configs';
import {useRoute} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {ICSuccess} from 'src/assets/icons/ICSuccess';
import ModalBox from 'src/components/ModalBox';
import TextTranslate from 'src/components/TextTranslate';
interface IProps {
  types?: 'ORDER-CART' | 'FREE-COUSLUTION';
}
const PopupScreenBase = (props: IProps) => {
  const {types} = props;
  return (
    <ModalBox>
      <View style={{marginTop: 2, alignItems: 'center'}}>
        <ICSuccess />
        <View style={{marginTop: 10}}>
          <TextTranslate
            fontSize={17}
            color={defaultColors.text_111213}
            weight="bold"
            text={
              types === 'FREE-COUSLUTION'
                ? 'messages.success.free-couslution'
                : 'messages.success.order-cart'
            }
          />
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          marginBottom: 10,
          paddingBottom: 15,
          borderBottomWidth: 1,
          borderBottomColor: defaultColors.bg_939393,
        }}>
        <View
          style={{
            flexDirection: 'row',

            columnGap: 2,
            marginTop: 17,
          }}>
          <TextTranslate
            fontSize={14}
            color={defaultColors.text_313131}
            weight="400"
            text={
              types === 'FREE-COUSLUTION'
                ? 'messages.success.content-free-cousl'
                : 'messages.success.content-order-cart'
            }
          />
          <TextTranslate
            fontSize={14}
            color={defaultColors.primary}
            weight="bold"
            text="company.name"
          />
        </View>
        {types === 'ORDER-CART' && (
          <View>
            <TextTranslate
              fontSize={14}
              color={defaultColors.text_313131}
              weight="400"
              text="messages.success.desc-order-cart"
            />
          </View>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 2,
        }}>
        <TextTranslate
          fontSize={14}
          color={defaultColors.text_313131}
          weight="400"
          text="company.support"
        />
        <TextTranslate
          fontSize={14}
          color={defaultColors.primary}
          weight="bold"
          text="1900 55 55 55"
        />
      </View>
    </ModalBox>
  );
};
export const PopupScreen = () => {
  const route: {
    params?: {
      types?: 'ORDER-CART' | 'FREE-COUSLUTION';
    };
  } = useRoute();
  return <PopupScreenBase {...route.params} />;
};
export default PopupScreen;
